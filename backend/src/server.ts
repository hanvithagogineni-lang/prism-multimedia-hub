import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRouter from './routes/api';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Sitemap.xml Endpoint
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://beta.prismmultimedia.com/</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/about</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/courses</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/student-works</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/placements</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/alumni</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/blog</loc><changefreq>daily</changefreq></url>
  <url><loc>https://beta.prismmultimedia.com/contact</loc><changefreq>monthly</changefreq></url>
</urlset>`);
});

// Robots.txt Endpoint
app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${process.env.BACKEND_URL || 'http://localhost:5000'}/sitemap.xml`);
});

app.listen(PORT, () => {
  console.log(`🚀 Prism Multimedia Backend API Server running on port ${PORT}`);
});
