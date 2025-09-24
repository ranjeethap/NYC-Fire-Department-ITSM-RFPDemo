Here's a comprehensive **Cursor.ai prompt** to build your ITSM demo solution:

```
# ITSM Data Integration Demo for NYC Fire Department RFP

Build a complete demo system that showcases automated ITSM data delivery through both DMZ database sync and RESTful API methods. This is for a government RFP demo presentation.

## Project Requirements

### Core Functionality:
1. **Mock ITSM Database** with realistic NYC Fire Department data
2. **RESTful API Server** with comprehensive endpoints 
3. **DMZ Database Sync** simulation (10-minute intervals)
4. **Postman Collection** for live API demonstration
5. **Database Query Interface** for DMZ database demo

### Data Categories (with realistic sample data):
- **Incidents** (500+ records): ticket numbers, priorities, statuses, descriptions, timestamps
- **Service Requests** (300+ records): request types, approvals, fulfillment status
- **Assets** (200+ records): IT equipment at "One Battery Park Plaza, NY"
- **Change Requests** (100+ records): change types, approval workflows, implementation dates
- **Configuration Items** (5000+ records): servers, network devices, software
- **Work Logs** (1000+ records): linked to parent tickets with timestamps, work descriptions

## Technical Stack:
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (or SQLite for simplicity)
- **Authentication**: API key based (simple but functional)
- **Documentation**: OpenAPI/Swagger UI
- **Environment**: Docker-ready for easy deployment

## API Endpoints Required:

```
// Core endpoints to implement
GET /api/v1/incidents
GET /api/v1/requests  
GET /api/v1/assets
GET /api/v1/changes
GET /api/v1/configuration-items
GET /api/v1/worklogs

// Each endpoint should support:
// - Filtering (state, priority, date ranges, assignment)
// - Pagination (limit, offset)
// - Search (full-text across relevant fields)
// - Sorting (by date, priority, status)
```

## Database Schema:

```
-- Create tables for all ITSM data types
-- Include proper relationships (foreign keys)
-- Add indexes for demo query performance
-- Include audit fields (created_at, updated_at, last_sync)

CREATE TABLE incidents (
    id VARCHAR(50) PRIMARY KEY,
    number VARCHAR(20) UNIQUE,
    state VARCHAR(20),
    priority VARCHAR(10), 
    category VARCHAR(50),
    subcategory VARCHAR(50),
    opened_by VARCHAR(100),
    assigned_to VARCHAR(100),
    opened_at TIMESTAMP,
    resolved_at TIMESTAMP,
    closed_at TIMESTAMP,
    short_description TEXT,
    description TEXT,
    resolution_notes TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_sync TIMESTAMP
);

-- Similar tables for: requests, assets, changes, configuration_items, worklogs
```

## Sample Data Requirements:
- Use realistic NYC Fire Department context
- Include various incident types: "Email server down", "Workstation issues", "Network connectivity problems"
- Asset data should include: Dell servers, Cisco switches, HP printers, etc.
- Locations: "One Battery Park Plaza, NY, NY" + various floors/rooms
- Personnel names: Use generic names like "J.Smith", "M.Johnson"
- Make data look authentic for government IT environment

## Key Features:

### 1. DMZ Database Sync Simulation:
```
// Create a sync service that:
// - Runs every 10 minutes (setInterval)
// - Copies data from "production" tables to "dmz" tables
// - Updates last_sync timestamps
// - Logs sync operations with statistics
// - Simulates realistic sync behavior
```

### 2. API Features:
```
// Implement comprehensive filtering:
app.get('/api/v1/incidents', (req, res) => {
    const { state, priority, assigned_to, created_since, limit = 50, offset = 0 } = req.query;
    // Build dynamic SQL queries
    // Return JSON with metadata (total_count, page_info)
});

// Include error handling, rate limiting, and logging
```

### 3. Authentication:
```
// Simple API key authentication
// Header: Authorization: Bearer demo_api_key_12345
// Log all API requests with timestamps
```

### 4. Monitoring Dashboard:
- Simple web interface showing sync status
- Recent API calls log
- Database statistics (record counts, last sync times)

## File Structure:
```
itsm-demo/
├── src/
│   ├── routes/
│   │   ├── incidents.js
│   │   ├── assets.js
│   │   ├── changes.js
│   │   └── ...
│   ├── models/
│   ├── middleware/
│   ├── services/
│   │   └── sync-service.js
│   └── app.js
├── database/
│   ├── schema.sql
│   ├── sample-data.sql
│   └── migrations/
├── postman/
│   └── ITSM-Demo-Collection.json
├── docs/
│   └── api-documentation.md
├── docker-compose.yml
├── package.json
└── README.md
```

## Postman Collection:
Create a complete collection with:
- Environment variables for base URL and API key
- Pre-request scripts for authentication
- Examples for all endpoints with various filters
- Tests to validate responses
- Documentation for each request

## Demo Preparation Features:
1. **Data Reset Script**: Quickly restore demo data to initial state
2. **Live Data Modification**: Endpoint to create/modify records during demo
3. **Sync Trigger**: Manual sync trigger for demo purposes
4. **Performance Metrics**: Show response times and record counts
5. **Error Simulation**: Ability to simulate various error conditions

## Development Priorities:
1. Start with database schema and sample data generation
2. Build core API endpoints with filtering
3. Implement sync simulation service
4. Create Postman collection
5. Add simple monitoring dashboard
6. Generate comprehensive documentation

## Success Criteria:
- API responds in <200ms for typical queries
- Database supports 10,000+ total records
- Postman collection demonstrates all capabilities
- Sync service shows realistic timing and logging
- System can run continuously for 30+ minute demo
- All endpoints return properly formatted JSON
- Error handling works smoothly during demo

## Deployment Target:
- Should work on Oracle Cloud free tier
- Include Docker setup for easy deployment
- Environment variables for configuration
- Simple start/stop scripts

Build this as a production-quality demo that can impress government stakeholders while being simple enough to deploy and maintain for the RFP presentation.
```

