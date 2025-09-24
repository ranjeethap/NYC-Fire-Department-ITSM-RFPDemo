# NYC Fire Department ITSM Demo

A complete ITSM (IT Service Management) data integration demo system showcasing automated data delivery through both DMZ database sync and RESTful API methods for the NYC Fire Department RFP.

## 🚀 Features

- **Complete ITSM Data Model**: Incidents, Service Requests, Assets, Change Requests, Configuration Items, Work Logs
- **RESTful API**: Full CRUD operations with filtering, pagination, search, and sorting
- **DMZ Database Sync**: Automated 10-minute sync simulation from production to DMZ tables
- **API Documentation**: Interactive Swagger UI at `/api-docs`
- **Postman Collection**: Complete collection with examples and automated tests
- **Monitoring Dashboard**: Real-time statistics and sync status
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Authentication**: API key-based security
- **Rate Limiting**: 120 requests per minute
- **Demo Data**: 7,150+ realistic sample records generated using Faker.js for demonstration purposes

## 📊 Demo Data Overview

**⚠️ IMPORTANT: All data in this demo is generated using Faker.js for demonstration purposes only. This is NOT real NYC Fire Department data.**

| Resource | Records | Description | Data Source |
|----------|---------|-------------|-------------|
| Incidents | 550 | IT incidents and service disruptions | Faker.js generated |
| Service Requests | 300 | User requests for IT services | Faker.js generated |
| Assets | 200 | IT equipment and hardware | Faker.js generated |
| Change Requests | 100 | IT change management | Faker.js generated |
| Configuration Items | 5,000 | IT infrastructure components | Faker.js generated |
| Work Logs | 1,000 | Time tracking and work notes | Faker.js generated |

### 🎭 Demo Data Characteristics

- **Realistic Context**: Data uses NYC Fire Department locations and terminology
- **Authentic Format**: Proper numbering schemes (INC100000, REQ200000, etc.)
- **Business Logic**: Realistic state progressions and relationships
- **Varied Content**: Diverse descriptions, names, and technical details
- **Time-based**: Recent dates and realistic timestamps
- **Interconnected**: Work logs reference actual incidents/requests/changes

## 🛠 Quick Start

### Option 1: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Seed the database**
   ```bash
   npm run seed
   ```

3. **Start the server**
   ```bash
   API_KEY=demo_api_key_12345 npm run dev
   ```

4. **Access the API**
   - Base URL: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs
   - Health Check: http://localhost:3000/health

### Option 2: Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build and run manually**
   ```bash
   docker build -t itsm-demo .
   docker run -p 3000:3000 -e API_KEY=demo_api_key_12345 itsm-demo
   ```

## 🔑 Authentication

All API endpoints require authentication using the API key:

```bash
Authorization: Bearer demo_api_key_12345
```

## 📡 API Endpoints

### Core Resources

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /api/v1/incidents` | Get incidents with filtering | `?priority=High&state=In Progress` |
| `GET /api/v1/requests` | Get service requests | `?category=Access Request` |
| `GET /api/v1/assets` | Get IT assets | `?asset_type=Server&status=Active` |
| `GET /api/v1/changes` | Get change requests | `?state=In Progress&risk_level=High` |
| `GET /api/v1/configuration-items` | Get configuration items | `?ci_type=Server&location=Command Center` |
| `GET /api/v1/worklogs` | Get work logs | `?parent_type=incident&worked_by=J.Smith` |

### Monitoring

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/dashboard/stats` | System statistics and sync status |
| `GET /health` | Health check endpoint |

### Query Parameters

All endpoints support:

- **Filtering**: `state`, `priority`, `assigned_to`, etc.
- **Search**: `q` for full-text search
- **Pagination**: `limit` (default: 50), `offset` (default: 0)
- **Sorting**: `sort` and `order` (asc/desc)

### Example Requests

```bash
# Get high priority incidents
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/incidents?priority=High&limit=10"

# Search for server-related issues
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/incidents?q=server&limit=5"

# Get active servers in Command Center
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/assets?asset_type=Server&status=Active&location=Command Center"

# Get system statistics
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/dashboard/stats"
```

## 📋 Postman Collection

Import the complete Postman collection from `postman/ITSM-Demo-Collection.json`:

1. Open Postman
2. Click "Import"
3. Select the collection file
4. Set environment variables:
   - `base_url`: http://localhost:3000
   - `api_key`: demo_api_key_12345

The collection includes:
- Pre-configured authentication
- Example requests for all endpoints
- Automated tests for response validation
- Performance tests (<200ms response time)

## 🎭 Demo Data Generation

This demo uses **Faker.js** to generate realistic sample data for demonstration purposes:

### Data Generation Process
- **Library**: [@faker-js/faker](https://fakerjs.dev/) - Industry standard for generating fake data
- **Script**: `src/scripts/seed.js` - Generates all sample data
- **Command**: `npm run seed` - Populates the database
- **Reset**: `npm run reset` - Clears all data

### Generated Data Types
- **Names**: Realistic employee names (J.Smith, A.Johnson, etc.)
- **Dates**: Recent timestamps with realistic business logic
- **Descriptions**: Contextual IT service descriptions
- **Technical Data**: IP addresses, MAC addresses, serial numbers
- **Business Data**: Costs, warranty dates, approval statuses
- **Relationships**: Work logs linked to actual incidents/requests

### Data Quality Features
- **NYC Fire Department Context**: Uses actual locations and terminology
- **Realistic Numbering**: Proper ITSM numbering schemes
- **State Progression**: Logical incident/request lifecycle flows
- **Time Relationships**: Consistent date sequences
- **Data Variety**: Diverse content to showcase filtering/search

## 🔄 DMZ Sync Service

The system includes a simulated DMZ sync service that:

- Runs every 10 minutes
- Copies data from production tables to DMZ tables
- Updates `last_sync` timestamps
- Logs sync operations with statistics
- Simulates realistic government IT environment behavior

Monitor sync status via the dashboard endpoint.

## 🏗 Project Structure

```
itsm-demo/
├── src/
│   ├── routes/           # API route handlers
│   ├── middleware/       # Authentication, logging
│   ├── services/         # DMZ sync service
│   ├── config/          # Swagger configuration
│   └── scripts/         # Database seeding/reset
├── database/
│   ├── schema.sql       # Database schema
│   └── itsm.db         # SQLite database (created on first run)
├── postman/
│   └── ITSM-Demo-Collection.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🧪 Testing

### Manual Testing
- Use the Swagger UI at http://localhost:3000/api-docs
- Import and run the Postman collection
- Test all endpoints with various filters and parameters

### Performance Testing
- All endpoints respond in <200ms for typical queries
- Database supports 10,000+ total records
- System can run continuously for 30+ minute demos

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run seed        # Seed database with sample data
npm run reset       # Reset database (removes all data)
```

### Environment Variables

```bash
API_KEY=demo_api_key_12345    # API authentication key
PORT=3000                     # Server port
DB_PATH=database/itsm.db      # SQLite database path
```

## 🚀 Deployment

### Oracle Cloud Free Tier

1. **Upload the project** to your Oracle Cloud instance
2. **Install Node.js 18+**
3. **Run the setup**:
   ```bash
   npm install
   npm run seed
   API_KEY=demo_api_key_12345 npm start
   ```

### Docker Deployment

```bash
# Build and deploy
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📈 Demo Scenarios

### Scenario 1: Incident Management
1. Show high-priority incidents: `/api/v1/incidents?priority=Critical`
2. Filter by state: `/api/v1/incidents?state=In Progress`
3. Search for specific issues: `/api/v1/incidents?q=email`

### Scenario 2: Asset Management
1. Show all servers: `/api/v1/assets?asset_type=Server`
2. Filter by location: `/api/v1/assets?location=Command Center`
3. Show maintenance items: `/api/v1/assets?status=Maintenance`

### Scenario 3: Change Management
1. Show in-progress changes: `/api/v1/changes?state=In Progress`
2. Filter by risk level: `/api/v1/changes?risk_level=High`
3. Show security changes: `/api/v1/changes?q=security`

### Scenario 4: System Monitoring
1. Check system stats: `/api/v1/dashboard/stats`
2. Monitor sync status and record counts
3. Verify DMZ sync is working

## 🎯 Success Criteria

✅ API responds in <200ms for typical queries  
✅ Database supports 10,000+ total records  
✅ Postman collection demonstrates all capabilities  
✅ Sync service shows realistic timing and logging  
✅ System can run continuously for 30+ minute demo  
✅ All endpoints return properly formatted JSON  
✅ Error handling works smoothly during demo  

## 📞 Support

For questions or issues with the demo:
- Check the Swagger UI documentation
- Review the Postman collection examples
- Monitor the dashboard for system status
- Check server logs for detailed error information

---

**Built for NYC Fire Department RFP Demo** 🔥


