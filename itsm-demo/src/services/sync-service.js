import Database from 'better-sqlite3';

const db = new Database(process.env.DB_PATH || 'database/itsm.db');
db.pragma('journal_mode = WAL');

export function startSyncService() {
  function sync() {
    const now = new Date().toISOString();
    
    // Get counts before transaction
    const incidentCount = db.prepare('SELECT COUNT(1) as c FROM incidents').get().c;
    const requestCount = db.prepare('SELECT COUNT(1) as c FROM requests').get().c;
    const assetCount = db.prepare('SELECT COUNT(1) as c FROM assets').get().c;
    const changeCount = db.prepare('SELECT COUNT(1) as c FROM changes').get().c;
    const ciCount = db.prepare('SELECT COUNT(1) as c FROM configuration_items').get().c;
    const worklogCount = db.prepare('SELECT COUNT(1) as c FROM worklogs').get().c;
    
    const tx = db.transaction(() => {
      // Sync incidents
      db.prepare('DELETE FROM dmz_incidents').run();
      db.prepare('INSERT INTO dmz_incidents SELECT id, number, state, priority, category, subcategory, opened_by, assigned_to, opened_at, resolved_at, closed_at, short_description, description, resolution_notes, last_updated, @now as last_sync FROM incidents').run({ now });
      db.prepare('UPDATE incidents SET last_sync = @now').run({ now });

      // Sync requests
      db.prepare('DELETE FROM dmz_requests').run();
      db.prepare('INSERT INTO dmz_requests SELECT id, number, state, priority, category, subcategory, requested_by, assigned_to, opened_at, resolved_at, closed_at, short_description, description, resolution_notes, approval_status, last_updated, @now as last_sync FROM requests').run({ now });
      db.prepare('UPDATE requests SET last_sync = @now').run({ now });

      // Sync assets
      db.prepare('DELETE FROM dmz_assets').run();
      db.prepare('INSERT INTO dmz_assets SELECT id, number, name, asset_type, status, location, assigned_to, manufacturer, model, serial_number, purchase_date, warranty_expiry, cost, last_updated, @now as last_sync FROM assets').run({ now });
      db.prepare('UPDATE assets SET last_sync = @now').run({ now });

      // Sync changes
      db.prepare('DELETE FROM dmz_changes').run();
      db.prepare('INSERT INTO dmz_changes SELECT id, number, state, priority, category, subcategory, requested_by, assigned_to, opened_at, planned_start, planned_end, actual_start, actual_end, short_description, description, implementation_notes, approval_status, risk_level, last_updated, @now as last_sync FROM changes').run({ now });
      db.prepare('UPDATE changes SET last_sync = @now').run({ now });

      // Sync configuration items
      db.prepare('DELETE FROM dmz_configuration_items').run();
      db.prepare('INSERT INTO dmz_configuration_items SELECT id, number, name, ci_type, status, location, assigned_to, manufacturer, model, serial_number, version, ip_address, mac_address, last_updated, @now as last_sync FROM configuration_items').run({ now });
      db.prepare('UPDATE configuration_items SET last_sync = @now').run({ now });

      // Sync work logs
      db.prepare('DELETE FROM dmz_worklogs').run();
      db.prepare('INSERT INTO dmz_worklogs SELECT id, parent_id, parent_type, work_type, worked_by, worked_at, time_spent, description, last_updated, @now as last_sync FROM worklogs').run({ now });
      db.prepare('UPDATE worklogs SET last_sync = @now').run({ now });
    });
    tx();
    // eslint-disable-next-line no-console
    console.log(`[SYNC] ${now} synced - Incidents: ${incidentCount}, Requests: ${requestCount}, Assets: ${assetCount}, Changes: ${changeCount}, CIs: ${ciCount}, Worklogs: ${worklogCount}`);
  }

  sync();
  setInterval(sync, 10 * 60 * 1000);
}


