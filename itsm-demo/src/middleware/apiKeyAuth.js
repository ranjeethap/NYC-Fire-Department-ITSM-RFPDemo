export function apiKeyAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const expected = process.env.API_KEY || 'demo_api_key_12345';

  if (!token || token !== expected) {
    return res.status(401).json({ error: { message: 'Unauthorized' } });
  }

  next();
}


