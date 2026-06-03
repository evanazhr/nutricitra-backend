# 📚 Nutri Citra API Documentation

Dokumentasi ini berisi daftar *endpoint* yang tersedia pada backend aplikasi Nutri Citra. 
Secara *default*, semua *request* dan *response* menggunakan `Content-Type: application/json` kecuali disebutkan secara spesifik (misalnya, `multipart/form-data` untuk *upload file*).

---

## 🚀 Setup Project

Berikut adalah langkah-langkah untuk menjalankan *project* ini secara lokal:

1. **Clone repositori**
   ```bash
   git clone https://github.com/evanazhr/nutricitra-backend.git
   ```

2. **Masuk ke direktori**
   ```bash
   cd nutricitra-backend
   ```

3. **Install dependensi**
   ```bash
   pnpm install
   ```

4. **Konfigurasi Environment**
   Buat file `.env` dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Pastikan Anda membaca file `.env` dan mengisi variabel environment yang dibutuhkan.*

5. **Jalankan Aplikasi**
   ```bash
   pnpm run dev
   ```

---

## 📑 Table of Contents

1. [Authentication](#-1-authentication)
2. [Users](#-2-users)
3. [Profiles](#-3-profiles)
4. [Predicts](#-4-predicts)
5. [Meals](#-5-meals)
6. [Nutrition](#-6-nutrition)

---

## 🔐 1. Authentication

### Login User
Melakukan login untuk mendapatkan *access token* dan *refresh token*.

- **Method:** `POST`
- **Endpoint:** `/authentications`
- **Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "message": "Authentication berhasil ditambahkan",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
}
```

### Refresh Token
Memperbarui *access token* menggunakan *refresh token*.

- **Method:** `PUT`
- **Endpoint:** `/authentications`
- **Auth Required:** No

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Logout User
Menghapus *refresh token* pengguna pada *device* saat ini.

- **Method:** `DELETE`
- **Endpoint:** `/authentications`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Logout All Devices
Menghapus seluruh *refresh token* pengguna pada semua *device*.

- **Method:** `DELETE`
- **Endpoint:** `/authentications/all`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 👤 2. Users

### Register User
Mendaftarkan akun pengguna baru.

- **Method:** `POST`
- **Endpoint:** `/users`
- **Auth Required:** No

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "userId": "user-uuid-here"
  }
}
```

### Update Fullname User
Mengupdate nama lengkap pengguna.

- **Method:** `PUT`
- **Endpoint:** `/users/fullname`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "fullname": "John Doe"
}
```

### Update Avatar
Memperbarui foto profil pengguna (Avatar).

- **Method:** `PUT`
- **Endpoint:** `/users/avatar`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

**Request Body:**
- `avatar`: File gambar (JPG/PNG/JPEG)

---

## 📈 3. Profiles

### Create Profile
Membuat profil kesehatan pengguna baru.

- **Method:** `POST`
- **Endpoint:** `/profiles`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "height": 175,
  "weight": 65,
  "age": 20,
  "gender": "male",
  "calorieTarget": 2000,
  "proteinTarget": 120,
  "carbohydrateTarget": 200,
  "fatTarget": 100
}
```

### Get Profile
Mengambil profil kesehatan pengguna yang sedang login.

- **Method:** `GET`
- **Endpoint:** `/profiles`
- **Auth Required:** Yes

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "profile": {
      "userId": "uuid-string-here",
      "height": 175,
      "weight": 65,
      "age": 20,
      "gender": "male",
      "calorieTarget": 2000,
      "proteinTarget": 120,
      "carbohydrateTarget": 200,
      "fatTarget": 100,
      "isProfileComplete": true
    }
  }
}
```

### Update Profile
Memperbarui profil kesehatan pengguna.

- **Method:** `PUT`
- **Endpoint:** `/profiles`
- **Auth Required:** Yes

**Request Body:**
```json
{
  "height": 178,
  "weight": 70,
  "age": 21,
  "gender": "male",
  "calorieTarget": 2200,
  "proteinTarget": 130,
  "carbohydrateTarget": 210,
  "fatTarget": 110
}
```

### Get Akg Reference Data
Mengambil data referensi AKG untuk melengkapi profil kesehatan pengguna.

- **Method:** `GET`
- **Endpoint:** `/profiles/default-akg`
- **Auth Required:** Yes

**Query Parameters:**
- `age` (number)
- `gender` (string: `male` / `female`)
- `pregnancyTrimester` (number: `0`, `1`, `2`, `3`)
- `breastfeedingStatus` (number: `0`, `1`, `2`)

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Data referensi target AKG gizi berhasil diambil",
  "data": {
    "akg": {
      "id": 11,
      "ageLabel": "10-12 years",
      "ageMinMonths": 120,
      "ageMaxMonths": 155,
      "gender": 0,
      "pregnancyTrimester1": 0,
      "pregnancyTrimester2": 0,
      "pregnancyTrimester3": 0,
      "breastfeedingFirst6m": 0,
      "breastfeedingSecond6m": 0,
      "calories": 2000,
      "protein": 50,
      "fat": 65,
      "carbohydrate": 300
    }
  }
}
```

---

## 🍎 4. Predicts

### Predict Image
Mengunggah gambar makanan untuk diprediksi menggunakan model *Machine Learning*.

- **Method:** `POST`
- **Endpoint:** `/predict`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

**Request Body:**
- `file`: File gambar makanan (JPG/PNG/JPEG)

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Prediksi dan mengirim log berhasil",
  "data": {
    "predict": {
      "id": "cmptzrqne0003432tjl4y3yym",
      "foodName": "bubur ayam",
      "confidence": 0.89,
      "portion": 1.5,
      "imageUrl": "https://rcbxqjotupicnsdobhat.supabase.co/...",
      "nutrition": {
        "servingDescription": "1 Porsi (240 g)",
        "servingSizeG": 240,
        "calorie": 372,
        "protein": 27.56,
        "carbohydrate": 36.12,
        "fat": 12.39,
        "water": null,
        "fiber": null,
        "labelCategory": null,
        "originRegion": "Umum"
      },
      "totalNutrition": {
        "calorie": 558,
        "protein": 41.34,
        "carbohydrate": 54.18,
        "fat": 18.59,
        "water": null,
        "fiber": null
      }
    }
  }
}
```

### Get Predict Logs
Mengambil riwayat prediksi makanan dari pengguna.

- **Method:** `GET`
- **Endpoint:** `/predict`
- **Auth Required:** Yes

**Query Parameters:**
- `page` (optional): Nomor halaman, default `1`
- `limit` (optional): Jumlah data per halaman, default `10`

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Predict Logs berhasil ditampilkan",
  "data": {
    "pagination": {
      "currentPage": 1,
      "limit": 10,
      "totalPages": 1,
      "totalData": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    },
    "predictLogs": [
      {
        "id": "cmpthk5w90002f72t29fw3u24",
        "userId": "cmpth1bmb...",
        "foodName": "nasi padang",
        "confidenceScore": 0.96,
        "imageUrl": "https://rcbxqjotupicnsdobhat.supabase.co/...",
        "portion": 1,
        "createdAt": "2026-05-31T07:56:21.849Z",
        "updatedAt": "2026-05-31T07:56:21.849Z",
        "nutrition": {
          "calorie": 664,
          "protein": 70,
          "carbohydrate": 70,
          "fat": 15,
          "water": null,
          "fiber": null,
          "labelCategory": null,
          "originRegion": "Umum"
        },
        "totalNutrition": {
          "calorie": 664,
          "protein": 70,
          "carbohydrate": 70,
          "fat": 15,
          "water": null,
          "fiber": null
        }
      }
    ]
  }
}
```

---

## 🍽️ 5. Meals

### Get Meals
Mengambil daftar makanan yang telah dicatat (dimakan) pengguna.

- **Method:** `GET`
- **Endpoint:** `/meals`
- **Auth Required:** Yes

**Query Parameters:**
- `page` (optional): Nomor halaman, default `1`
- `limit` (optional): Jumlah data per halaman, default `10`

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Meals berhasil ditampilkan",
  "data": {
    "pagination": {
      "currentPage": 1,
      "limit": 10,
      "totalPages": 1,
      "totalData": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    },
    "meals": [
      {
        "id": "cmpti055x000204l5r96bn1yo",
        "userId": "cmpth1bmb...",
        "predictLogId": null,
        "mealType": "BREAKFAST",
        "foodName": "Nasi padang",
        "confidenceScore": null,
        "imageUrl": "https://rcbxqjotupicnsdobhat.supabase.co/...",
        "portion": 2,
        "createdAt": "2026-05-31T08:08:47.397Z",
        "updatedAt": "2026-05-31T08:08:47.397Z",
        "nutrition": {
          "calorie": 500,
          "protein": 100,
          "carbohydrate": 200,
          "fat": 100,
          "water": null,
          "fiber": null,
          "labelCategory": null,
          "originRegion": null
        },
        "totalNutrition": {
          "calorie": 1000,
          "protein": 200,
          "carbohydrate": 400,
          "fat": 200,
          "water": null,
          "fiber": null
        }
      }
    ]
  }
}
```

### Create Meal
Mencatat konsumsi makanan baru ke dalam jurnal.

- **Method:** `POST`
- **Endpoint:** `/meals`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

**Request Body:**
- `image` (optional): File gambar makanan (JPG/PNG/JPEG)
- `foodName` (required): Nama makanan (string)
- `mealType` (required): Waktu makan (`BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`)
- `portion` (optional): Porsi makanan (number, default `1.0`)
- `servingSizeG` (optional): Berat makanan per porsi dalam gram (number)
- `servingDescription` (optional): Deskripsi porsi makanan (string, cth: "1 Porsi")
- `calorie` (required): Total kalori (number)
- `protein` (required): Total protein (number)
- `carbohydrate` (required): Total karbohidrat (number)
- `fat` (required): Total lemak (number)
- `water` (optional): Total air (number)
- `fiber` (optional): Total serat (number)
- `predictLogId` (optional): ID dari log prediksi jika berasal dari AI (string)
- `confidentScore` (optional): Skor confidence jika dari AI (number 0-1)

### Update Meal
Memperbarui catatan makanan yang sudah ada.

- **Method:** `PUT`
- **Endpoint:** `/meals/:id`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

**Request Body:**
*Sama seperti **Create Meal** di atas.*

### Delete Meal
Menghapus catatan makanan berdasarkan ID.

- **Method:** `DELETE`
- **Endpoint:** `/meals/:id`
- **Auth Required:** Yes

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Meal berhasil dihapus"
}
```

### Get Recommendation Meals
Meminta rekomendasi makanan berdasarkan sisa kuota kalori dan kalori makanan yang baru ditambahkan.

- **Method:** `GET`
- **Endpoint:** `/meals/recomendations`
- **Auth Required:** Yes

**Query Parameters:**
- `sisaKuota` (number): Sisa kuota kalori harian
- `kaloriMakanan` (number): Kalori makanan yang baru ditambahkan

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Rekomendasi meal berhasil ditampilkan",
  "data": {
    "meals": {
      "dataAnalysis": {
        "remainingUserQuota": 1000,
        "calorieTarget": 2000,
        "recentMealCalorie": 500,
        "selectedLabelCategory": 1,
        "categoryName": "Serat Tinggi & Kalori Sedang"
      },
      "fruitRecommendations": [
        {
          "name": "Sirsak",
          "calories": 65,
          "protein": 1,
          "carbohydrate": 16.3,
          "fat": 0.3,
          "water": 81.7
        },
        {
          "name": "Menteng",
          "calories": 65,
          "protein": 1.7,
          "carbohydrate": 16.1,
          "fat": 0.3,
          "water": 79
        }
      ]
    }
  }
}
```

---

## 📊 6. Nutrition

### Get Daily Summary
Mengambil ringkasan total nutrisi harian pengguna yang sedang login.

- **Method:** `GET`
- **Endpoint:** `/nutrition/daily-summary`
- **Auth Required:** Yes

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Ringkasan konsumsi harian berhasil dimuat",
  "data": {
    "nutrition": {
      "calorieConsumed": 1200,
      "proteinConsumed": 50,
      "carbohydrateConsumed": 150,
      "fatConsumed": 40,
      "waterConsumed": 0,
      "fiberConsumed": 10
    }
  }
}
```

### Get Weekly Summary 
Mengambil ringkasan total nutrisi mingguan pengguna yang sedang login.

- **Method:** `GET`
- **Endpoint:** `/nutrition/weekly-summary`
- **Auth Required:** Yes

**Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Ringkasan konsumsi grafik mingguan berhasil dimuat",
  "data": {
    "nutrition": [
      {
        "date": "2026-05-30",
        "dayName": "Minggu",
        "calorie": 500.00,
        "protein": 100.00,
        "carbohydrate": 200.00,
        "fat": 100.00,
        "water": 0.00,
        "fiber": 0.00
      },
      {
        "date": "2026-05-31",
        "dayName": "Senin",
        "calorie": 1000.00,
        "protein": 200.00,
        "carbohydrate": 400.00,
        "fat": 200.00,
        "water": 0.00,
        "fiber": 0.00
      }
    ]
  }
}
```