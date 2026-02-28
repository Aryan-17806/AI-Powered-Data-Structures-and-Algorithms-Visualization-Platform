# Deployment Guide

## Production Checklist

Before deploying to production:

- [ ] Update `JWT_SECRET` in `.env` (use strong random string)
- [ ] Set `NODE_ENV=production`
- [ ] Configure `CORS_ORIGIN` for your domain
- [ ] Set `OPENAI_API_KEY` if using AI features
- [ ] Use production MongoDB URI
- [ ] Enable HTTPS on frontend and backend
- [ ] Set up environment variables securely
- [ ] Run all tests: `npm test`
- [ ] Build frontend: `npm run build`
- [ ] Set up monitoring and logging

## Docker Compose (Recommended)

### 1. Prepare Production `.env`
```bash
cd backend
cp .env.example .env
# Edit .env with production values
```

### 2. Update docker-compose.yml
Change `NODE_ENV: production` in services section.

### 3. Build and Deploy
```bash
docker-compose build
docker-compose up -d
```

## Heroku Deployment

### Backend
```bash
# Create Heroku app
heroku create dsa-visualizer-backend

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set OPENAI_API_KEY=your_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL = https://your-backend.herokuapp.com/api
```

## AWS Deployment

### Backend (EC2/ECS)
```bash
# Create EC2 instance (Ubuntu 22.04)
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone your-repo
cd DSAProject/backend

# Install and run
npm install
npm start

# Use PM2 for process management
sudo npm i -g pm2
pm2 start src/app.js --name dsa-backend
pm2 startup
pm2 save
```

### Frontend (S3 + CloudFront)
```bash
# Build
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Digital Ocean / Linode

### Using Docker
```bash
# SSH into Droplet
ssh root@your_droplet_ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone repo
git clone your-repo
cd DSAProject

# Start services
docker-compose up -d
```

### With App Platform
1. Connect GitHub repo
2. Create app from docker-compose.yml
3. Set environment variables
4. Deploy

## Environment Variables in Production

**Secure handling:**

```bash
# Never commit secrets
# Use server environment variables

# For Docker
docker-compose.yml uses env_file: .env

# For Heroku
heroku config:set KEY=value

# For AWS Lambda
AWS Secrets Manager or Lambda environment

# For Digital Ocean
UI dashboard or via doctl CLI
```

## MongoDB Atlas (Cloud)

```bash
# 1. Create account at mongodb.com
# 2. Create cluster
# 3. Get connection string
# 4. Set in backend:
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dsa-visualizer?retryWrites=true&w=majority
```

## SSL/HTTPS

### Using Let's Encrypt + Nginx
```bash
# Install Nginx
sudo apt-get install nginx

# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Update Nginx config
# Proxy to backend on port 5000
```

### Using Caddy (Easier)
```bash
# Install Caddy
wget https://github.com/caddyserver/caddy/releases/download/v2.6.0/caddy_2.6.0_linux_amd64.tar.gz
tar xzf caddy_2.6.0_linux_amd64.tar.gz

# Caddyfile example:
yourdomain.com {
  reverse_proxy http://localhost:5000
}

# Run
./caddy run
```

## Monitoring & Logging

### Backend Logging
```javascript
// Use structured logging
import pino from 'pino';
const logger = pino();

logger.info({ msg: 'request', method: req.method });
```

### APM (Application Performance Monitoring)
```bash
# New Relic
npm install newrelic
node -r newrelic src/app.js

# Datadog
npm install dd-trace
```

### Database Monitoring
- MongoDB Atlas has built-in monitoring
- Check connection metrics
- Monitor query performance

## Scaling

### Horizontal Scaling
```bash
# Multiple server instances behind load balancer (Nginx/HAProxy)
```

### Vertical Scaling
```bash
# Increase server resources (CPU, RAM, disk)
```

### Database Optimization
```javascript
// Add indexes to frequently queried fields
userSchema.index({ email: 1 });
sessionSchema.index({ userId: 1, createdAt: -1 });
```

## Backup & Recovery

### MongoDB Backup
```bash
# Automated backups in MongoDB Atlas

# Manual backup
mongodump --uri "mongodb+srv://..."
```

### Daily Backups
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y-%m-%d)
mongodump --out=/backups/backup-$DATE
```

## Performance Optimization

### Frontend
```bash
# Build with minification
npm run build

# Analyze bundle
npm install -g webpack-bundle-analyzer
```

### Backend
```javascript
// Enable compression
import compression from 'compression';
app.use(compression());

// Use CDN for static assets
// Implement caching headers
app.use(express.static('public', {
  maxAge: '1h'
}));
```

## Maintenance

### Updates
```bash
# Check for outdated packages
npm outdated

# Update carefully
npm audit
npm update
```

### Monitoring Health
```bash
# Check logs regularly
docker-compose logs -f backend

# Monitor database
mongostat --uri "mongodb+srv://..."
```

### Emergency Procedures
```bash
# If backend crashes
docker-compose restart backend

# If database is down
docker-compose restart mongodb

# Full restart
docker-compose down
docker-compose up
```

## Cost Estimation

**Monthly costs (rough):**

| Service | Tier | Cost |
|---------|------|------|
| Heroku | Hobby | $7 |
| MongoDB Atlas | Free/Paid | $0-57 |
| Vercel | Hobby | Free |
| Digital Ocean | Droplet | $5-12 |
| OpenAI API | Pay-as-you-go | $0-30+ |

**Total:** $12-100+/month depending on usage

## Security Best Practices

1. **Use environment variables** for all secrets
2. **Enable HTTPS everywhere**
3. **Implement rate limiting**
4. **Add input validation** on all endpoints
5. **Use strong JWT secrets**
6. **Regular security audits**
7. **Keep dependencies updated**
8. **Monitor for unusual activity**
9. **Use Web Application Firewall** (WAF)
10. **Regular backups** of database

## Support & Troubleshooting

### Common Production Issues

1. **High memory usage**
   - Check for memory leaks
   - Restart services periodically
   - Increase server resources

2. **Database connection timeout**
   - Check database status
   - Verify IP whitelisting
   - Check connection string

3. **Slow API responses**
   - Add database indexes
   - Enable caching
   - Optimize queries
   - Scale horizontally

4. **High CPU usage**
   - Profile code for bottlenecks
   - Optimize algorithms
   - Add more server instances

---

**Deployment successful? Celebrate! 🎉**

Monitor logs regularly and stay on top of updates.
