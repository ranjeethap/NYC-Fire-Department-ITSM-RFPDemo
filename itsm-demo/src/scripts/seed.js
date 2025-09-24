import Database from 'better-sqlite3';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const dbPath = process.env.DB_PATH || 'database/itsm.db';
fs.mkdirSync('database', { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

const schema = fs.readFileSync('database/schema.sql', 'utf-8');
db.exec(schema);

const priorities = ['Critical','High','Moderate','Low'];
const states = ['New','In Progress','On Hold','Resolved','Closed'];
const categories = ['Network','Email','Workstation','Server','Security'];

// Asset types and manufacturers
const assetTypes = ['Server','Workstation','Printer','Switch','Router','Firewall','Laptop','Tablet'];
const manufacturers = ['Dell','HP','Cisco','Apple','Lenovo','IBM','Microsoft','Canon'];
const locations = ['One Battery Park Plaza, NY, NY - Floor 1','One Battery Park Plaza, NY, NY - Floor 2','One Battery Park Plaza, NY, NY - Floor 3','One Battery Park Plaza, NY, NY - Floor 4','One Battery Park Plaza, NY, NY - Floor 5','Command Center','Records Department','IT Department'];

// Change request types
const changeTypes = ['Hardware','Software','Network','Security','Process','Emergency'];
const riskLevels = ['Low','Medium','High','Critical'];

// Configuration item types
const ciTypes = ['Server','Network Device','Application','Database','Service','User Account'];

const stmt = db.prepare(`INSERT INTO incidents (
  id, number, state, priority, category, subcategory, opened_by, assigned_to,
  opened_at, resolved_at, closed_at, short_description, description,
  resolution_notes, last_updated, last_sync
) VALUES (@id, @number, @state, @priority, @category, @subcategory, @opened_by, @assigned_to,
  @opened_at, @resolved_at, @closed_at, @short_description, @description, @resolution_notes,
  @last_updated, @last_sync)`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) stmt.run(row);
});

const now = new Date();
const incidents = [];
for (let i = 0; i < 550; i++) {
  const openedAt = faker.date.recent({ days: 60 });
  const resolvedAt = Math.random() > 0.5 ? faker.date.soon({ days: 10, refDate: openedAt }) : null;
  const closedAt = resolvedAt && Math.random() > 0.5 ? faker.date.soon({ days: 5, refDate: resolvedAt }) : null;
  incidents.push({
    id: uuidv4(),
    number: `INC${String(100000 + i)}`,
    state: closedAt ? 'Closed' : resolvedAt ? 'Resolved' : faker.helpers.arrayElement(states),
    priority: faker.helpers.arrayElement(priorities),
    category: faker.helpers.arrayElement(categories),
    subcategory: faker.word.noun(),
    opened_by: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    assigned_to: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    opened_at: openedAt.toISOString(),
    resolved_at: resolvedAt ? resolvedAt.toISOString() : null,
    closed_at: closedAt ? closedAt.toISOString() : null,
    short_description: faker.helpers.arrayElement([
      'Email server down at One Battery Park Plaza',
      'Workstation issues on Floor 12',
      'Network connectivity problems in Command Center',
      'Printer offline in Records Department',
      'VPN access issues for on-call'
    ]),
    description: faker.lorem.sentences({ min: 2, max: 5 }),
    resolution_notes: resolvedAt ? faker.lorem.sentence() : null,
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertMany(incidents);

// Seed Service Requests
const requestStmt = db.prepare(`INSERT INTO requests (
  id, number, state, priority, category, subcategory, requested_by, assigned_to,
  opened_at, resolved_at, closed_at, short_description, description,
  resolution_notes, approval_status, last_updated, last_sync
) VALUES (@id, @number, @state, @priority, @category, @subcategory, @requested_by, @assigned_to,
  @opened_at, @resolved_at, @closed_at, @short_description, @description, @resolution_notes,
  @approval_status, @last_updated, @last_sync)`);

const insertRequests = db.transaction((rows) => {
  for (const row of rows) requestStmt.run(row);
});

const requests = [];
for (let i = 0; i < 300; i++) {
  const openedAt = faker.date.recent({ days: 45 });
  const resolvedAt = Math.random() > 0.4 ? faker.date.soon({ days: 15, refDate: openedAt }) : null;
  const closedAt = resolvedAt && Math.random() > 0.3 ? faker.date.soon({ days: 3, refDate: resolvedAt }) : null;
  requests.push({
    id: uuidv4(),
    number: `REQ${String(200000 + i)}`,
    state: closedAt ? 'Closed' : resolvedAt ? 'Resolved' : faker.helpers.arrayElement(states),
    priority: faker.helpers.arrayElement(priorities),
    category: faker.helpers.arrayElement(['Access Request','Software Installation','Hardware Request','Account Creation','Password Reset']),
    subcategory: faker.word.noun(),
    requested_by: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    assigned_to: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    opened_at: openedAt.toISOString(),
    resolved_at: resolvedAt ? resolvedAt.toISOString() : null,
    closed_at: closedAt ? closedAt.toISOString() : null,
    short_description: faker.helpers.arrayElement([
      'New user account request',
      'Software installation request',
      'Hardware replacement needed',
      'Access to shared drive',
      'VPN access request'
    ]),
    description: faker.lorem.sentences({ min: 2, max: 4 }),
    resolution_notes: resolvedAt ? faker.lorem.sentence() : null,
    approval_status: faker.helpers.arrayElement(['Pending','Approved','Rejected','Not Required']),
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertRequests(requests);

// Seed Assets
const assetStmt = db.prepare(`INSERT INTO assets (
  id, number, name, asset_type, status, location, assigned_to, manufacturer, model,
  serial_number, purchase_date, warranty_expiry, cost, last_updated, last_sync
) VALUES (@id, @number, @name, @asset_type, @status, @location, @assigned_to, @manufacturer, @model,
  @serial_number, @purchase_date, @warranty_expiry, @cost, @last_updated, @last_sync)`);

const insertAssets = db.transaction((rows) => {
  for (const row of rows) assetStmt.run(row);
});

const assets = [];
for (let i = 0; i < 200; i++) {
  const purchaseDate = faker.date.past({ years: 3 });
  const warrantyExpiry = faker.date.future({ years: 2, refDate: purchaseDate });
  assets.push({
    id: uuidv4(),
    number: `AST${String(300000 + i)}`,
    name: faker.helpers.arrayElement(['Dell PowerEdge Server','HP ProBook Laptop','Cisco Catalyst Switch','Canon ImageRunner Printer','Apple MacBook Pro']),
    asset_type: faker.helpers.arrayElement(assetTypes),
    status: faker.helpers.arrayElement(['Active','Inactive','Maintenance','Retired','Lost']),
    location: faker.helpers.arrayElement(locations),
    assigned_to: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    manufacturer: faker.helpers.arrayElement(manufacturers),
    model: faker.helpers.arrayElement(['PowerEdge R740','ProBook 450','Catalyst 2960','ImageRunner 2525','MacBook Pro 16"']),
    serial_number: faker.string.alphanumeric(10).toUpperCase(),
    purchase_date: purchaseDate.toISOString().split('T')[0],
    warranty_expiry: warrantyExpiry.toISOString().split('T')[0],
    cost: faker.number.float({ min: 500, max: 50000, fractionDigits: 2 }),
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertAssets(assets);

// Seed Change Requests
const changeStmt = db.prepare(`INSERT INTO changes (
  id, number, state, priority, category, subcategory, requested_by, assigned_to,
  opened_at, planned_start, planned_end, actual_start, actual_end, short_description,
  description, implementation_notes, approval_status, risk_level, last_updated, last_sync
) VALUES (@id, @number, @state, @priority, @category, @subcategory, @requested_by, @assigned_to,
  @opened_at, @planned_start, @planned_end, @actual_start, @actual_end, @short_description,
  @description, @implementation_notes, @approval_status, @risk_level, @last_updated, @last_sync)`);

const insertChanges = db.transaction((rows) => {
  for (const row of rows) changeStmt.run(row);
});

const changes = [];
for (let i = 0; i < 100; i++) {
  const openedAt = faker.date.recent({ days: 30 });
  const plannedStart = faker.date.soon({ days: 10, refDate: openedAt });
  const plannedEnd = faker.date.soon({ days: 5, refDate: plannedStart });
  const actualStart = Math.random() > 0.3 ? faker.date.soon({ days: 2, refDate: plannedStart }) : null;
  const actualEnd = actualStart && Math.random() > 0.4 ? faker.date.soon({ days: 3, refDate: actualStart }) : null;
  changes.push({
    id: uuidv4(),
    number: `CHG${String(400000 + i)}`,
    state: actualEnd ? 'Completed' : actualStart ? 'In Progress' : faker.helpers.arrayElement(['New','Approved','Scheduled','In Progress','Completed','Cancelled']),
    priority: faker.helpers.arrayElement(priorities),
    category: faker.helpers.arrayElement(changeTypes),
    subcategory: faker.word.noun(),
    requested_by: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    assigned_to: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    opened_at: openedAt.toISOString(),
    planned_start: plannedStart.toISOString(),
    planned_end: plannedEnd.toISOString(),
    actual_start: actualStart ? actualStart.toISOString() : null,
    actual_end: actualEnd ? actualEnd.toISOString() : null,
    short_description: faker.helpers.arrayElement([
      'Server upgrade to Windows Server 2022',
      'Network switch firmware update',
      'Security patch deployment',
      'Database migration to new server',
      'Firewall rule modification'
    ]),
    description: faker.lorem.sentences({ min: 3, max: 6 }),
    implementation_notes: actualEnd ? faker.lorem.sentences({ min: 2, max: 4 }) : null,
    approval_status: faker.helpers.arrayElement(['Pending','Approved','Rejected']),
    risk_level: faker.helpers.arrayElement(riskLevels),
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertChanges(changes);

// Seed Configuration Items
const ciStmt = db.prepare(`INSERT INTO configuration_items (
  id, number, name, ci_type, status, location, assigned_to, manufacturer, model,
  serial_number, version, ip_address, mac_address, last_updated, last_sync
) VALUES (@id, @number, @name, @ci_type, @status, @location, @assigned_to, @manufacturer, @model,
  @serial_number, @version, @ip_address, @mac_address, @last_updated, @last_sync)`);

const insertCIs = db.transaction((rows) => {
  for (const row of rows) ciStmt.run(row);
});

const configItems = [];
for (let i = 0; i < 5000; i++) {
  configItems.push({
    id: uuidv4(),
    number: `CI${String(500000 + i)}`,
    name: faker.helpers.arrayElement(['Web Server 01','Database Server 02','Email Server 03','File Server 04','Backup Server 05']),
    ci_type: faker.helpers.arrayElement(ciTypes),
    status: faker.helpers.arrayElement(['Active','Inactive','Maintenance','Retired']),
    location: faker.helpers.arrayElement(locations),
    assigned_to: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    manufacturer: faker.helpers.arrayElement(manufacturers),
    model: faker.helpers.arrayElement(['PowerEdge R740','ProLiant DL380','Catalyst 2960','ASA 5520']),
    serial_number: faker.string.alphanumeric(10).toUpperCase(),
    version: faker.system.semver(),
    ip_address: faker.internet.ipv4(),
    mac_address: faker.internet.mac(),
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertCIs(configItems);

// Seed Work Logs
const worklogStmt = db.prepare(`INSERT INTO worklogs (
  id, parent_id, parent_type, work_type, worked_by, worked_at, time_spent,
  description, last_updated, last_sync
) VALUES (@id, @parent_id, @parent_type, @work_type, @worked_by, @worked_at, @time_spent,
  @description, @last_updated, @last_sync)`);

const insertWorklogs = db.transaction((rows) => {
  for (const row of rows) worklogStmt.run(row);
});

const worklogs = [];
for (let i = 0; i < 1000; i++) {
  const parentType = faker.helpers.arrayElement(['incident','request','change']);
  const parentId = parentType === 'incident' ? incidents[faker.number.int({ min: 0, max: incidents.length - 1 })].id :
                   parentType === 'request' ? requests[faker.number.int({ min: 0, max: requests.length - 1 })].id :
                   changes[faker.number.int({ min: 0, max: changes.length - 1 })].id;
  
  worklogs.push({
    id: uuidv4(),
    parent_id: parentId,
    parent_type: parentType,
    work_type: faker.helpers.arrayElement(['Analysis','Implementation','Testing','Documentation','Communication']),
    worked_by: faker.person.lastName().slice(0,1) + '.' + faker.person.lastName(),
    worked_at: faker.date.recent({ days: 30 }).toISOString(),
    time_spent: faker.number.int({ min: 15, max: 480 }), // minutes
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    last_updated: now.toISOString(),
    last_sync: null,
  });
}

insertWorklogs(worklogs);

console.log(`Seeded incidents: ${incidents.length}`);
console.log(`Seeded requests: ${requests.length}`);
console.log(`Seeded assets: ${assets.length}`);
console.log(`Seeded changes: ${changes.length}`);
console.log(`Seeded configuration items: ${configItems.length}`);
console.log(`Seeded work logs: ${worklogs.length}`);


