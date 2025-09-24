# NYC Fire Department ITSM Demo - Step-by-Step Guide

## 🎯 Demo Overview

This guide provides detailed step-by-step instructions for running the NYC Fire Department ITSM Demo system. The demo showcases a complete IT Service Management data integration system with automated DMZ database sync and RESTful API methods.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Git**: For version control
- **Web Browser**: Chrome, Firefox, Safari, or Edge
- **Terminal/Command Line**: Access to run commands

### Optional (for Docker deployment)
- **Docker**: Version 20 or higher
- **Docker Compose**: Version 2 or higher

## 🚀 Quick Start (5 minutes)

### Step 1: Navigate to Project Directory
```bash
cd /Users/ranjeeth/Documents/Projects/NYFD-RFP/itsm-demo
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Seed the Database
```bash
npm run seed
```
**Expected Output:**
```
Seeded incidents: 550
Seeded requests: 300
Seeded assets: 200
Seeded changes: 100
Seeded configuration items: 5000
Seeded work logs: 1000
```

### Step 4: Start the Server
```bash
API_KEY=demo_api_key_12345 npm run dev
```

**Expected Output:**
```
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/app.js`
[SYNC] 2025-09-24T03:07:40.535Z synced - Incidents: 550, Requests: 300, Assets: 200, Changes: 100, CIs: 5000, Worklogs: 1000
ITSM demo server listening on port 3000
```

### Step 5: Verify System is Running
Open your browser and visit:
- **Health Check**: http://localhost:3000/health
- **API Documentation**: http://localhost:3000/api-docs

## 📖 Detailed Demo Scenarios

### Scenario 1: System Health Check (2 minutes)

**Objective**: Verify the system is running and accessible

**Steps**:
1. **Check Health Endpoint**
   ```bash
   curl http://localhost:3000/health
   ```
   **Expected Response:**
   ```json
   {
     "status": "ok",
     "timestamp": "2025-09-24T03:07:40.535Z",
     "requestId": "uuid-here"
   }
   ```

2. **Access Swagger UI**
   - Open browser: http://localhost:3000/api-docs
   - Verify all endpoints are listed
   - Check authentication requirements

### Scenario 2: Incident Management Demo (5 minutes)

**Objective**: Demonstrate incident filtering, search, and management capabilities

**Steps**:

1. **Get All Incidents**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?limit=5"
   ```

2. **Filter High Priority Incidents**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?priority=High&limit=10"
   ```

3. **Search for Server Issues**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?q=server&limit=5"
   ```

4. **Filter by State**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?state=In Progress&limit=10"
   ```

5. **Combined Filters**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?priority=Critical&state=New&limit=5"
   ```

**Demo Points**:
- Show realistic NYC Fire Department incident data
- Demonstrate filtering capabilities
- Highlight response times (<200ms)
- Show pagination and metadata

### Scenario 3: Asset Management Demo (4 minutes)

**Objective**: Showcase IT asset tracking and management

**Steps**:

1. **Get All Assets**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/assets?limit=5"
   ```

2. **Filter Active Servers**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/assets?asset_type=Server&status=Active&limit=10"
   ```

3. **Assets by Location**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/assets?location=Command%20Center&limit=5"
   ```

4. **Search by Model**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/assets?q=Dell&limit=5"
   ```

**Demo Points**:
- Show asset details (serial numbers, costs, warranties)
- Demonstrate location-based filtering
- Highlight NYC Fire Department locations

### Scenario 4: Change Management Demo (4 minutes)

**Objective**: Demonstrate change request tracking and approval workflows

**Steps**:

1. **Get All Changes**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/changes?limit=5"
   ```

2. **In-Progress Changes**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/changes?state=In Progress&limit=5"
   ```

3. **High Risk Changes**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/changes?risk_level=High&limit=5"
   ```

4. **Security-Related Changes**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/changes?q=security&limit=5"
   ```

**Demo Points**:
- Show change approval workflows
- Demonstrate risk assessment
- Highlight planned vs actual timelines

### Scenario 5: System Monitoring Demo (3 minutes)

**Objective**: Show system statistics and DMZ sync status

**Steps**:

1. **Get System Statistics**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/dashboard/stats"
   ```

2. **Monitor Sync Status**
   - Check server logs for sync messages
   - Verify DMZ table counts match production
   - Show last sync timestamps

**Demo Points**:
- Real-time system statistics
- DMZ sync verification
- Record counts across all tables
- Sync timing (every 10 minutes)

### Scenario 6: Configuration Management Demo (3 minutes)

**Objective**: Demonstrate configuration item tracking

**Steps**:

1. **Get All Configuration Items**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/configuration-items?limit=5"
   ```

2. **Filter by Type**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/configuration-items?ci_type=Server&limit=5"
   ```

3. **Search by IP Address**
   ```bash
   curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/configuration-items?q=192.168&limit=5"
   ```

**Demo Points**:
- Show 5,000+ configuration items
- Demonstrate IP address tracking
- Highlight infrastructure mapping

## 🔧 Advanced Demo Features

### Using Postman Collection

1. **Import Collection**
   - Open Postman
   - Click "Import"
   - Select `postman/ITSM-Demo-Collection.json`

2. **Set Environment Variables**
   - `base_url`: http://localhost:3000
   - `api_key`: demo_api_key_12345

3. **Run Automated Tests**
   - Execute collection
   - Verify all tests pass
   - Check response times

### Docker Deployment Demo

1. **Build and Run with Docker**
   ```bash
   docker-compose up --build
   ```

2. **Verify Container Status**
   ```bash
   docker-compose ps
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

## 🎯 Demo Script for Presentation

### Opening (2 minutes)
- "Today I'll demonstrate our ITSM data integration solution for the NYC Fire Department"
- "This system provides automated data delivery through both DMZ database sync and RESTful API methods"
- "We have 7,150+ realistic records across 6 ITSM resource types"

### Core Demo (15 minutes)
1. **System Overview** (2 min)
   - Show Swagger UI documentation
   - Explain API structure and authentication

2. **Incident Management** (4 min)
   - Filter high-priority incidents
   - Search for specific issues
   - Show response times

3. **Asset Management** (3 min)
   - Display active servers
   - Filter by location (Command%20Center)
   - Show asset details

4. **Change Management** (3 min)
   - Show in-progress changes
   - Demonstrate risk assessment
   - Highlight approval workflows

5. **System Monitoring** (3 min)
   - Display system statistics
   - Show DMZ sync status
   - Verify data integrity

### Closing (3 minutes)
- "The system is production-ready and can run continuously for 30+ minute demos"
- "All endpoints respond in under 200ms with proper error handling"
- "The DMZ sync service runs every 10 minutes, simulating realistic government IT operations"

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Database Issues**
   ```bash
   # Reset and reseed database
   npm run reset
   npm run seed
   ```

3. **Authentication Errors**
   - Verify API key: `demo_api_key_12345`
   - Check Authorization header format: `Bearer demo_api_key_12345`

4. **Dependencies Issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

### Performance Verification

1. **Response Time Check**
   ```bash
   time curl -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?limit=50"
   ```

2. **Load Testing**
   ```bash
   # Simple load test (requires ab tool)
   ab -n 100 -c 10 -H "Authorization: Bearer demo_api_key_12345" \
     "http://localhost:3000/api/v1/incidents?limit=10"
   ```

## 📊 Demo Success Metrics

- ✅ All endpoints respond in <200ms
- ✅ Database contains 7,150+ records
- ✅ DMZ sync runs every 10 minutes
- ✅ Swagger UI loads and functions
- ✅ Postman collection tests pass
- ✅ System runs continuously for 30+ minutes
- ✅ All error handling works properly

## 🎬 Demo Recording Tips

1. **Screen Recording Setup**
   - Use 1920x1080 resolution
   - Record at 30fps minimum
   - Include terminal and browser windows

2. **Key Points to Highlight**
   - Response times in terminal
   - Realistic NYC Fire Department data
   - DMZ sync messages in logs
   - Swagger UI documentation

3. **Demo Flow**
   - Start with health check
   - Show Swagger UI
   - Demonstrate each endpoint
   - End with system statistics

---

**Ready for NYC Fire Department RFP Presentation!** 🔥

This demo system showcases enterprise-grade ITSM capabilities with realistic government IT scenarios, automated data synchronization, and comprehensive API documentation - perfect for impressing stakeholders and demonstrating technical capabilities.
