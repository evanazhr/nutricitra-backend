import rateLimit from 'express-rate-limit';

// Global rate limiter untuk mengamankan seluruh API dari spam/DDoS
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Batas maksimal 100 request per IP dalam 15 menit
  message: {
    status: 'error',
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit'
  },
  standardHeaders: true, // Mengembalikan info rate limit di header `RateLimit-*`
  legacyHeaders: false, // Menonaktifkan header `X-RateLimit-*`
});

// Auth rate limiter yang lebih ketat untuk endpoint sensitif (login, register)
// untuk mencegah serangan brute-force
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Batas maksimal 5 kali percobaan login/register per IP
  message: {
    status: 'error',
    message: 'Terlalu banyak percobaan login atau register, silakan coba lagi setelah 15 menit'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
