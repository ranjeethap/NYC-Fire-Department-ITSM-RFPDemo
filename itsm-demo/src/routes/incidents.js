import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

/**
 * @swagger
 * /api/v1/incidents:
 *   get:
 *     summary: Get incidents with filtering, pagination, and search
 *     description: Retrieve incidents with optional filtering by state, priority, assigned_to, and full-text search
 *     tags: [Incidents]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           enum: [New, In Progress, On Hold, Resolved, Closed]
 *         description: Filter by incident state
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Critical, High, Moderate, Low]
 *         description: Filter by incident priority
 *       - in: query
 *         name: assigned_to
 *         schema:
 *           type: string
 *         description: Filter by assigned person
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Full-text search in short_description and description
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [opened_at, priority, state, last_updated]
 *           default: opened_at
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of incidents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/incidents', (req, res) => {
  const { state, priority, assigned_to, q, limit = 50, offset = 0, sort = 'opened_at', order = 'desc' } = req.query;

  const where = [];
  const params = {};

  if (state) { where.push('state = @state'); params.state = state; }
  if (priority) { where.push('priority = @priority'); params.priority = priority; }
  if (assigned_to) { where.push('assigned_to = @assigned_to'); params.assigned_to = assigned_to; }
  if (q) { where.push('(short_description LIKE @q OR description LIKE @q)'); params.q = `%${q}%`; }

  const allowedSort = new Set(['opened_at','priority','state','last_updated']);
  const sortCol = allowedSort.has(sort) ? sort : 'opened_at';
  const sortOrder = order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(1) as c FROM incidents ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM incidents ${whereSql} ORDER BY ${sortCol} ${sortOrder} LIMIT @limit OFFSET @offset`).all({ ...params, limit: Number(limit), offset: Number(offset) });

  res.json({ data: rows, meta: { total, limit: Number(limit), offset: Number(offset) } });
});

export default router;


