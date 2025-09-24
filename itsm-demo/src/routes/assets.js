import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

router.get('/assets', (req, res) => {
  const { status, asset_type, location, assigned_to, q, limit = 50, offset = 0, sort = 'name', order = 'asc' } = req.query;

  const where = [];
  const params = {};

  if (status) { where.push('status = @status'); params.status = status; }
  if (asset_type) { where.push('asset_type = @asset_type'); params.asset_type = asset_type; }
  if (location) { where.push('location LIKE @location'); params.location = `%${location}%`; }
  if (assigned_to) { where.push('assigned_to = @assigned_to'); params.assigned_to = assigned_to; }
  if (q) { where.push('(name LIKE @q OR model LIKE @q OR serial_number LIKE @q)'); params.q = `%${q}%`; }

  const allowedSort = new Set(['name','asset_type','status','location','purchase_date','last_updated']);
  const sortCol = allowedSort.has(sort) ? sort : 'name';
  const sortOrder = order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(1) as c FROM assets ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM assets ${whereSql} ORDER BY ${sortCol} ${sortOrder} LIMIT @limit OFFSET @offset`).all({ ...params, limit: Number(limit), offset: Number(offset) });

  res.json({ data: rows, meta: { total, limit: Number(limit), offset: Number(offset) } });
});

export default router;
