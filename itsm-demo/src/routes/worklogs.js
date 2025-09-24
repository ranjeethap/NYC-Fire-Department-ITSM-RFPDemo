import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

router.get('/worklogs', (req, res) => {
  const { parent_id, parent_type, worked_by, q, limit = 50, offset = 0, sort = 'worked_at', order = 'desc' } = req.query;

  const where = [];
  const params = {};

  if (parent_id) { where.push('parent_id = @parent_id'); params.parent_id = parent_id; }
  if (parent_type) { where.push('parent_type = @parent_type'); params.parent_type = parent_type; }
  if (worked_by) { where.push('worked_by = @worked_by'); params.worked_by = worked_by; }
  if (q) { where.push('description LIKE @q'); params.q = `%${q}%`; }

  const allowedSort = new Set(['worked_at','time_spent','last_updated']);
  const sortCol = allowedSort.has(sort) ? sort : 'worked_at';
  const sortOrder = order?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(1) as c FROM worklogs ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM worklogs ${whereSql} ORDER BY ${sortCol} ${sortOrder} LIMIT @limit OFFSET @offset`).all({ ...params, limit: Number(limit), offset: Number(offset) });

  res.json({ data: rows, meta: { total, limit: Number(limit), offset: Number(offset) } });
});

export default router;
