import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

router.get('/requests', (req, res) => {
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
  const total = db.prepare(`SELECT COUNT(1) as c FROM requests ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM requests ${whereSql} ORDER BY ${sortCol} ${sortOrder} LIMIT @limit OFFSET @offset`).all({ ...params, limit: Number(limit), offset: Number(offset) });

  res.json({ data: rows, meta: { total, limit: Number(limit), offset: Number(offset) } });
});

export default router;
