# Prism Multimedia Hub — Production Full-Stack Application

A production-ready full-stack multimedia training institute application for **Prism Multimedia** built with React, TypeScript, Tailwind CSS, Node.js, Express.js, PostgreSQL/SQLite, Prisma ORM, and JWT RBAC authentication.

---

## 🚀 Tech Stack Overview

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v6
- **Backend**: Node.js, Express.js, TypeScript, JWT Authentication, bcryptjs, Multer
- **Database**: PostgreSQL / SQLite (`dev.db`), Prisma ORM (27 Schema Tables)
- **Security**: JWT tokens, Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `EDITOR`, `ADMISSIONS_STAFF`), input sanitization, password hashing

---

## 📌 Public Routes

- `/` — Homepage (Hero, About, Dynamic Programs, Placements, Testimonials)
- `/about` — About Institute, History (Est. 1999), Leadership
- `/courses` — Course Catalog with category filters and search
- `/courses/:slug` — Dynamic course detail page (Curriculum, Tools, Careers, FAQs, Registration)
- `/student-works` — Student Portfolio Showcase
- `/placements` — Industry Placement Records
- `/alumni` — Graduate Success Stories
- `/corporate-training` — Corporate Training Request Form
- `/franchise` — Franchise Enquiry Form
- `/blog` — Articles & Top 100 Keyboard Shortcuts Guides
- `/blog/:slug` — Single blog post reader
- `/contact` — Campus Location & Contact Form
- `/register` — Student Registration Form storing directly into Database
- `/search?q=` — Global Search across Courses, Blogs, and Portfolios
- `/privacy-policy` & `/terms` — Legal Policy Pages

---

## 🔒 Admin CMS Routes & Credentials

- **Admin Login Route**: `/admin/login`
- **Default Super Admin Credentials**:
  - **Email**: `admin@prismmultimedia.com`
  - **Password**: `Admin@123456`
- **Admin Dashboard**: `/admin/dashboard`
- **Course Management**: `/admin/courses`
- **Registrations & CSV Export**: `/admin/registrations`
- **Leads & Contact Messages**: `/admin/leads`
- **Blog CMS**: `/admin/blogs`
- **Site Settings**: `/admin/settings`

---

## 🛠️ Database Setup & Development Commands

```bash
# Install dependencies
npm install

# Push Prisma Schema to Database
npx prisma db push --force-reset

# Seed Initial Data (Courses, Alumni, Blogs, Admin User, Settings)
npx tsx prisma/seed.ts

# Start Express Backend API Server (Port 5000)
npm run server

# Start Frontend Vite Dev Server (Port 5174)
npm run dev -- --port 5174
```
