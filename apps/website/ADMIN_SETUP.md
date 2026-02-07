# Admin Panel Setup Instructions

## Initial Setup

### 1. Database Setup
The database is already initialized with:
- Admin user: `admin@example.com` / `admin123`
- Sample services and cities

### 2. Access Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`

### 3. Create Additional Users (Optional)
You can create more users by running:
```bash
npx tsx scripts/create-user.ts
```

Or manually via Prisma Studio:
```bash
npx prisma studio
```

## Quick Start Guide

### Adding Your First Service
1. Login to `/admin`
2. Go to "Services" ? "Add New Service"
3. Fill in:
   - Name: "Hardwood Flooring Installation"
   - Slug: "hardwood-flooring" (auto-generated)
   - Description, benefits, process, FAQs
   - SEO fields
4. Click "Create Service"
5. Visit `/services/hardwood-flooring` to see it live!

### Adding Your First City
1. Go to "Cities" ? "Add New City"
2. Fill in:
   - Name: "Denver"
   - State: "CO"
   - Slug: "denver"
   - Neighborhoods: Add local areas
3. Click "Create City"
4. System automatically generates:
   - `/flooring-installer-denver`
   - `/hardwood-flooring-denver` (for each service)
   - `/epoxy-flooring-denver` (for each service)

### Creating Your First Blog Post
1. Go to "Blog" ? "New Post"
2. Write your content
3. Add SEO metadata
4. Publish when ready
5. Post appears at `/blog/[slug]`

## Production Deployment

### Environment Variables
Create `.env.local`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### Database Migration
For production, consider PostgreSQL:
1. Update `prisma/schema.prisma` datasource
2. Run migrations: `npx prisma migrate deploy`
3. Seed initial data if needed

## Security Notes

- Change default admin password immediately
- Use strong `NEXTAUTH_SECRET` in production
- Enable HTTPS in production
- Consider rate limiting for admin routes
- Regular database backups
