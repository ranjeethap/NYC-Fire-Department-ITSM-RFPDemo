import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NYC Fire Department ITSM Demo API',
      version: '1.0.0',
      description: 'ITSM Data Integration Demo for NYC Fire Department RFP - Automated data delivery through DMZ database sync and RESTful API methods',
      contact: {
        name: 'ITSM Demo Team',
        email: 'demo@nyfd.gov'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'API Key',
          description: 'API Key authentication. Use format: Bearer demo_api_key_12345'
        }
      },
      schemas: {
        Incident: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '19c92842-5a7d-40a5-ad8c-2a34d78a2ad2' },
            number: { type: 'string', example: 'INC100325' },
            state: { type: 'string', enum: ['New', 'In Progress', 'On Hold', 'Resolved', 'Closed'], example: 'In Progress' },
            priority: { type: 'string', enum: ['Critical', 'High', 'Moderate', 'Low'], example: 'High' },
            category: { type: 'string', example: 'Network' },
            subcategory: { type: 'string', example: 'Connectivity' },
            opened_by: { type: 'string', example: 'J.Smith' },
            assigned_to: { type: 'string', example: 'M.Johnson' },
            opened_at: { type: 'string', format: 'date-time', example: '2025-09-23T20:17:05.480Z' },
            resolved_at: { type: 'string', format: 'date-time', nullable: true },
            closed_at: { type: 'string', format: 'date-time', nullable: true },
            short_description: { type: 'string', example: 'Email server down at One Battery Park Plaza' },
            description: { type: 'string', example: 'Users unable to access email services...' },
            resolution_notes: { type: 'string', nullable: true },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        Asset: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            number: { type: 'string', example: 'AST300001' },
            name: { type: 'string', example: 'Dell PowerEdge Server' },
            asset_type: { type: 'string', enum: ['Server', 'Workstation', 'Printer', 'Switch', 'Router', 'Firewall', 'Laptop', 'Tablet'] },
            status: { type: 'string', enum: ['Active', 'Inactive', 'Maintenance', 'Retired', 'Lost'] },
            location: { type: 'string', example: 'One Battery Park Plaza, NY, NY - Floor 1' },
            assigned_to: { type: 'string', example: 'J.Smith' },
            manufacturer: { type: 'string', example: 'Dell' },
            model: { type: 'string', example: 'PowerEdge R740' },
            serial_number: { type: 'string', example: 'ABC1234567' },
            purchase_date: { type: 'string', format: 'date', example: '2023-01-15' },
            warranty_expiry: { type: 'string', format: 'date', example: '2025-01-15' },
            cost: { type: 'number', format: 'float', example: 15000.00 },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        Request: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            number: { type: 'string', example: 'REQ200001' },
            state: { type: 'string', enum: ['New', 'In Progress', 'On Hold', 'Resolved', 'Closed'] },
            priority: { type: 'string', enum: ['Critical', 'High', 'Moderate', 'Low'] },
            category: { type: 'string', example: 'Access Request' },
            subcategory: { type: 'string' },
            requested_by: { type: 'string', example: 'J.Smith' },
            assigned_to: { type: 'string', example: 'M.Johnson' },
            opened_at: { type: 'string', format: 'date-time' },
            resolved_at: { type: 'string', format: 'date-time', nullable: true },
            closed_at: { type: 'string', format: 'date-time', nullable: true },
            short_description: { type: 'string', example: 'New user account request' },
            description: { type: 'string' },
            resolution_notes: { type: 'string', nullable: true },
            approval_status: { type: 'string', enum: ['Pending', 'Approved', 'Rejected', 'Not Required'] },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        Change: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            number: { type: 'string', example: 'CHG400001' },
            state: { type: 'string', enum: ['New', 'Approved', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'] },
            priority: { type: 'string', enum: ['Critical', 'High', 'Moderate', 'Low'] },
            category: { type: 'string', enum: ['Hardware', 'Software', 'Network', 'Security', 'Process', 'Emergency'] },
            subcategory: { type: 'string' },
            requested_by: { type: 'string', example: 'J.Smith' },
            assigned_to: { type: 'string', example: 'M.Johnson' },
            opened_at: { type: 'string', format: 'date-time' },
            planned_start: { type: 'string', format: 'date-time' },
            planned_end: { type: 'string', format: 'date-time' },
            actual_start: { type: 'string', format: 'date-time', nullable: true },
            actual_end: { type: 'string', format: 'date-time', nullable: true },
            short_description: { type: 'string', example: 'Server upgrade to Windows Server 2022' },
            description: { type: 'string' },
            implementation_notes: { type: 'string', nullable: true },
            approval_status: { type: 'string', enum: ['Pending', 'Approved', 'Rejected'] },
            risk_level: { type: 'string', enum: ['Low', 'Medium', 'High', 'Critical'] },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        ConfigurationItem: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            number: { type: 'string', example: 'CI500001' },
            name: { type: 'string', example: 'Web Server 01' },
            ci_type: { type: 'string', enum: ['Server', 'Network Device', 'Application', 'Database', 'Service', 'User Account'] },
            status: { type: 'string', enum: ['Active', 'Inactive', 'Maintenance', 'Retired'] },
            location: { type: 'string', example: 'One Battery Park Plaza, NY, NY - Floor 1' },
            assigned_to: { type: 'string', example: 'J.Smith' },
            manufacturer: { type: 'string', example: 'Dell' },
            model: { type: 'string', example: 'PowerEdge R740' },
            serial_number: { type: 'string', example: 'ABC1234567' },
            version: { type: 'string', example: '1.2.3' },
            ip_address: { type: 'string', format: 'ipv4', example: '192.168.1.100' },
            mac_address: { type: 'string', example: '00:1B:44:11:3A:B7' },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        WorkLog: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            parent_id: { type: 'string', example: '19c92842-5a7d-40a5-ad8c-2a34d78a2ad2' },
            parent_type: { type: 'string', enum: ['incident', 'request', 'change'] },
            work_type: { type: 'string', enum: ['Analysis', 'Implementation', 'Testing', 'Documentation', 'Communication'] },
            worked_by: { type: 'string', example: 'J.Smith' },
            worked_at: { type: 'string', format: 'date-time' },
            time_spent: { type: 'integer', description: 'Time spent in minutes', example: 120 },
            description: { type: 'string', example: 'Analyzed network connectivity issues' },
            last_updated: { type: 'string', format: 'date-time' },
            last_sync: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Incident' }
            },
            meta: {
              type: 'object',
              properties: {
                total: { type: 'integer', example: 550 },
                limit: { type: 'integer', example: 50 },
                offset: { type: 'integer', example: 0 }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Unauthorized' }
              }
            }
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // paths to files containing OpenAPI definitions
};

export const specs = swaggerJsdoc(options);
