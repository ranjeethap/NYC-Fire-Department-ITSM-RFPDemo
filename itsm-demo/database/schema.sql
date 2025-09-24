PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    state TEXT,
    priority TEXT,
    category TEXT,
    subcategory TEXT,
    opened_by TEXT,
    assigned_to TEXT,
    opened_at TEXT,
    resolved_at TEXT,
    closed_at TEXT,
    short_description TEXT,
    description TEXT,
    resolution_notes TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- DMZ mirror tables
CREATE TABLE IF NOT EXISTS dmz_incidents (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    state TEXT,
    priority TEXT,
    category TEXT,
    subcategory TEXT,
    opened_by TEXT,
    assigned_to TEXT,
    opened_at TEXT,
    resolved_at TEXT,
    closed_at TEXT,
    short_description TEXT,
    description TEXT,
    resolution_notes TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- Service Requests
CREATE TABLE IF NOT EXISTS requests (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    state TEXT,
    priority TEXT,
    category TEXT,
    subcategory TEXT,
    requested_by TEXT,
    assigned_to TEXT,
    opened_at TEXT,
    resolved_at TEXT,
    closed_at TEXT,
    short_description TEXT,
    description TEXT,
    resolution_notes TEXT,
    approval_status TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- Assets
CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    name TEXT,
    asset_type TEXT,
    status TEXT,
    location TEXT,
    assigned_to TEXT,
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    purchase_date TEXT,
    warranty_expiry TEXT,
    cost REAL,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- Change Requests
CREATE TABLE IF NOT EXISTS changes (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    state TEXT,
    priority TEXT,
    category TEXT,
    subcategory TEXT,
    requested_by TEXT,
    assigned_to TEXT,
    opened_at TEXT,
    planned_start TEXT,
    planned_end TEXT,
    actual_start TEXT,
    actual_end TEXT,
    short_description TEXT,
    description TEXT,
    implementation_notes TEXT,
    approval_status TEXT,
    risk_level TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- Configuration Items
CREATE TABLE IF NOT EXISTS configuration_items (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE,
    name TEXT,
    ci_type TEXT,
    status TEXT,
    location TEXT,
    assigned_to TEXT,
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    version TEXT,
    ip_address TEXT,
    mac_address TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- Work Logs
CREATE TABLE IF NOT EXISTS worklogs (
    id TEXT PRIMARY KEY,
    parent_id TEXT,
    parent_type TEXT,
    work_type TEXT,
    worked_by TEXT,
    worked_at TEXT,
    time_spent INTEGER,
    description TEXT,
    last_updated TEXT DEFAULT (datetime('now')),
    last_sync TEXT
);

-- DMZ mirror tables
CREATE TABLE IF NOT EXISTS dmz_requests AS SELECT * FROM requests WHERE 0;
CREATE TABLE IF NOT EXISTS dmz_assets AS SELECT * FROM assets WHERE 0;
CREATE TABLE IF NOT EXISTS dmz_changes AS SELECT * FROM changes WHERE 0;
CREATE TABLE IF NOT EXISTS dmz_configuration_items AS SELECT * FROM configuration_items WHERE 0;
CREATE TABLE IF NOT EXISTS dmz_worklogs AS SELECT * FROM worklogs WHERE 0;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_incidents_state ON incidents(state);
CREATE INDEX IF NOT EXISTS idx_incidents_priority ON incidents(priority);
CREATE INDEX IF NOT EXISTS idx_incidents_opened_at ON incidents(opened_at);
CREATE INDEX IF NOT EXISTS idx_requests_state ON requests(state);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_changes_state ON changes(state);
CREATE INDEX IF NOT EXISTS idx_worklogs_parent ON worklogs(parent_id);


