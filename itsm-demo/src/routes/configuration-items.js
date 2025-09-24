import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

router.get('/configuration-items', (req, res) => {
  const { status, ci_type, location, assigned_to, q, limit = 50, offset = 0, sort = 'name', order = 'asc' } = req.query;

  const where = [];
  const params = {};

  if (status) { where.push('status = @status'); params.status = status; }
  if (ci_type) { where.push('ci_type = @ci_type'); params.ci_type = ci_type; }
  if (location) { where.push('location LIKE @location'); params.location = `%${location}%`; }
  if (assigned_to) { where.push('assigned_to = @assigned_to'); params.assigned_to = assigned_to; }
  if (q) { where.push('(name LIKE @q OR model LIKE @q OR serial_number LIKE @q OR ip_address LIKE @q)'); params.q = `%${q}%`; }

  const allowedSort = new Set(['name','ci_type','status','location','last_updated']);
  const sortCol = allowedSort.has(sort) ? sort : 'name';
  const sortOrder = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(1) as c FROM configuration_items ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM configuration_items ${whereSql} ORDER BY ${sortCol} ${sortOrder} LIMIT @limit OFFSET @offset`).all({ ...params, limit: Number(limit), offset: Number(offset) });

  res.json({ data: rows, meta: { total, limit: Number(limit), offset: Number(offset) } });
});

export default router;
