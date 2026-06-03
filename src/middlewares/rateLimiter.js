import rateLimit from 'express-rate-limit';

// Global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 60, // Batas maksimal 60 request per IP dalam 15 menit
  message: {
    status: 'error',
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit'
  },
  standardHeaders: true, // Mengembalikan info rate limit di header `RateLimit-*`
  legacyHeaders: false, // Menonaktifkan header `X-RateLimit-*`
});

// Auth rate limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // Batas maksimal 10 kali percobaan login/register per IP
  message: {
    status: 'error',
    message: 'Terlalu banyak percobaan login atau register, silakan coba lagi setelah 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
