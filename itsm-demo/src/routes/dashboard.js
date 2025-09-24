import { Router } from 'express';
import Database from 'better-sqlite3';

const router = Router();

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get system statistics and sync status
 *     description: Retrieve database statistics, record counts, and last sync times
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: System statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     incidents:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     requests:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     assets:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     changes:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     configuration_items:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     worklogs:
 *                       type: object
 *                       properties:
 *                         total: { type: 'integer' }
 *                         last_sync: { type: 'string', format: 'date-time' }
 *                     dmz_sync_status:
 *                       type: object
 *                       properties:
 *                         incidents: { type: 'integer' }
 *                         requests: { type: 'integer' }
 *                         assets: { type: 'integer' }
 *                         changes: { type: 'integer' }
 *                         configuration_items: { type: 'integer' }
 *                         worklogs: { type: 'integer' }
 *       401:
 *         description: Unauthorized
 */
router.get('/dashboard/stats', (req, res) => {
  try {
    // Get counts for all tables
    const stats = {
      incidents: {
        total: db.prepare('SELECT COUNT(1) as c FROM incidents').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM incidents').get().last_sync
      },
      requests: {
        total: db.prepare('SELECT COUNT(1) as c FROM requests').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM requests').get().last_sync
      },
      assets: {
        total: db.prepare('SELECT COUNT(1) as c FROM assets').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM assets').get().last_sync
      },
      changes: {
        total: db.prepare('SELECT COUNT(1) as c FROM changes').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM changes').get().last_sync
      },
      configuration_items: {
        total: db.prepare('SELECT COUNT(1) as c FROM configuration_items').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM configuration_items').get().last_sync
      },
      worklogs: {
        total: db.prepare('SELECT COUNT(1) as c FROM worklogs').get().c,
        last_sync: db.prepare('SELECT MAX(last_sync) as last_sync FROM worklogs').get().last_sync
      },
      dmz_sync_status: {
        incidents: db.prepare('SELECT COUNT(1) as c FROM dmz_incidents').get().c,
        requests: db.prepare('SELECT COUNT(1) as c FROM dmz_requests').get().c,
        assets: db.prepare('SELECT COUNT(1) as c FROM dmz_assets').get().c,
        changes: db.prepare('SELECT COUNT(1) as c FROM dmz_changes').get().c,
        configuration_items: db.prepare('SELECT COUNT(1) as c FROM dmz_configuration_items').get().c,
        worklogs: db.prepare('SELECT COUNT(1) as c FROM dmz_worklogs').get().c
      }
    };

    res.json({ data: stats });
  } catch (error) {
    res.status(500).json({ error: { message: 'Failed to retrieve statistics' } });
  }
});

export default router;
