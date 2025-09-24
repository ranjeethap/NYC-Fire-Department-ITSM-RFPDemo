# 🚀 NYC Fire Department ITSM Demo - Quick Reference

## ⚡ 30-Second Setup
```bash
cd /Users/ranjeeth/Documents/Projects/NYFD-RFP/itsm-demo
npm install && npm run seed
API_KEY=demo_api_key_12345 npm run dev
```

## 🔗 Key URLs
- **Health**: http://localhost:3000/health
- **API Docs**: http://localhost:3000/api-docs
- **System Stats**: http://localhost:3000/api/v1/dashboard/stats

## 🔑 Authentication
```bash
Authorization: Bearer demo_api_key_12345
```

## 📊 Demo Data Summary
- **Incidents**: 550 records
- **Service Requests**: 300 records  
- **Assets**: 200 records
- **Changes**: 100 records
- **Configuration Items**: 5,000 records
- **Work Logs**: 1,000 records
- **Total**: 7,150+ records

## 🎯 Top Demo Commands

### Critical Incidents
```bash
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/incidents?priority=Critical&limit=5"
```

### Command Center Servers
```bash
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/assets?asset_type=Server&location=Command Center&limit=5"
```

### High-Risk Changes
```bash
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/changes?risk_level=High&limit=5"
```

### System Statistics
```bash
curl -H "Authorization: Bearer demo_api_key_12345" \
  "http://localhost:3000/api/v1/dashboard/stats"
```

## 🔄 DMZ Sync Status
Look for this in server logs:
```
[SYNC] 2025-09-24T03:07:40.535Z synced - Incidents: 550, Requests: 300, Assets: 200, Changes: 100, CIs: 5000, Worklogs: 1000
```

## 🚨 Troubleshooting
- **Port in use**: `lsof -ti:3000 | xargs kill -9`
- **Reset DB**: `npm run reset && npm run seed`
- **Auth issues**: Check API key `demo_api_key_12345`

## 📈 Performance Targets
- ✅ Response time: <200ms
- ✅ Data volume: 7,150+ records
- ✅ Sync frequency: 10 minutes
- ✅ Uptime: 30+ minutes continuous

---
**Ready for NYC Fire Department RFP Demo!** 🔥
