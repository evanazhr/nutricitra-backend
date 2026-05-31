# 📚 NutriWise API Documentation

Dokumentasi ini berisi daftar *endpoint* yang tersedia pada backend aplikasi. 
Secara *default*, semua *request* dan *response* menggunakan `Content-Type: application/json` kecuali disebutkan secara spesifik. (misalnya, `multipart/form-data` untuk *upload file*).

---

## 🔐 1. Authentication

### Login User
Melakukan login untuk mendapatkan access token dan refresh token.
* **Method:** `POST`
* **Endpoint:** `/authentications`
* **Auth Required:** No
* **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```
* **Success Response (201 Created):**
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
Memperbarui access token menggunakan refresh token.
* **Method:** `PUT`
* **Endpoint:** `/authentications`
* **Auth Required:** No
* **Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Logout User
Menghapus refresh token pengguna pada *device* saat ini.
* **Method:** `DELETE`
* **Endpoint:** `/authentications`
* **Auth Required:** Yes
* **Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Logout All Devices
Menghapus seluruh refresh token pengguna pada semua *device*.
* **Method:** `DELETE`
* **Endpoint:** `/authentications/all`
* **Auth Required:** Yes
* **Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 👤 2. Users

### Register User
Mendaftarkan akun pengguna baru.
* **Method:** `POST`
* **Endpoint:** `/users`
* **Auth Required:** No
* **Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```
* **Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "userId": "user-uuid-here"
  }
}
```

### Get User by ID
Mengambil detail pengguna berdasarkan ID.
* **Method:** `GET`
* **Endpoint:** `/users/:id`
* **Auth Required:** No

### Update Avatar
Memperbarui foto profil pengguna (Avatar).
* **Method:** `PUT`
* **Endpoint:** `/users/avatar`
* **Auth Required:** Yes
* **Content-Type:** `multipart/form-data`
* **Request Body:**
  * `avatar`: File gambar (JPG/PNG/JPEG)

---

## 📈 3. Profiles

### Create Profile
Membuat profil kesehatan pengguna baru.
* **Method:** `POST`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Request Body:**
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
* **Method:** `GET`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "profile": {
      "user_id": "uuid-string-here",
      "height": 175,
      "weight": 65,
      "age": 20,
      "gender": "male",
      "calorieTarget": 2000,
      "proteinTarget": 120,
      "carbohydrateTarget": 200,
      "fatTarget": 100
    }
  }
}
```

### Update Profile
Memperbarui profil kesehatan pengguna.
* **Method:** `PUT`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Request Body:**
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

---

## 🍎 4. Predicts

### Predict Image
Mengunggah gambar makanan untuk diprediksi menggunakan model Machine Learning.
* **Method:** `POST`
* **Endpoint:** `/predict`
* **Auth Required:** Yes
* **Content-Type:** `multipart/form-data`
* **Request Body:**
  * `file`: File gambar makanan (JPG/PNG/JPEG)

### Get Predict Logs
Mengambil riwayat prediksi makanan dari pengguna.
* **Method:** `GET`
* **Endpoint:** `/predict`
* **Auth Required:** Yes
* **Query Parameters:**
  * `page` (optional): Nomor halaman, default: 1
  * `limit` (optional): Jumlah data per halaman, default: 10
* **Success Response (200 OK):**
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
                "userId": "cmpth1bmb000004kzatakfh4y",
                "foodName": "nasi padang",
                "confidenceScore": 0.96,
                "imageUrl": "https://rcbxqjotupicnsdobhat.supabase.co/storage/v1/object/public/food-images/food/predict-logs-cmpth1bmb000004kzatakfh4y-1780214181042",
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
Mengambil daftar makanan yang telah dicatat pengguna.
* **Method:** `GET`
* **Endpoint:** `/meals`
* **Auth Required:** Yes
* **Query Parameters:**
  * `page` (optional): Nomor halaman, default: 1
  * `limit` (optional): Jumlah data per halaman, default: 10
* **Success Response (200 OK):**
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
                "userId": "cmpth1bmb000004kzatakfh4y",
                "predictLogId": null,
                "mealType": "BREAKFAST",
                "foodName": "Nasi padang",
                "confidenceScore": null,
                "imageUrl": "https://rcbxqjotupicnsdobhat.supabase.co/storage/v1/object/public/food-images/food/-cmpth1bmb000004kzatakfh4y-1780214926329",
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
Mencatat konsumsi makanan baru.
* **Method:** `POST`
* **Endpoint:** `/meals`
* **Auth Required:** Yes
* **Content-Type:** `multipart/form-data`
* **Request Body:**
  * `image` (optional): File gambar makanan (JPG/PNG/JPEG)
  * `foodName` (required): Nama makanan (string)
  * `mealType` (required): Waktu makan ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')
  * `portion` (optional): Porsi makanan (number, default 1.0)
  * `calorie` (required): Total kalori (number)
  * `protein` (required): Total protein (number)
  * `carbohydrate` (required): Total karbohidrat (number)
  * `fat` (required): Total lemak (number)
  * `water` (optional): Total air (number)
  * `fiber` (optional): Total serat (number)
  * `predictLogId` (optional): ID dari log prediksi jika berasal dari scan AI (string)
  * `confidentScore` (optional): Skor confidence jika dari AI (number 0-1)

### Update Meal
Memperbarui catatan makanan yang ada.
* **Method:** `PUT`
* **Endpoint:** `/meals/:id`
* **Auth Required:** Yes
* **Content-Type:** `multipart/form-data`
* **Request Body:**
  * Sama seperti **Create Meal** di atas.

### Delete Meal
Menghapus catatan makanan berdasarkan ID.
* **Method:** `DELETE`
* **Endpoint:** `/meals/:id`
* **Auth Required:** Yes
* **Success Response (200 OK):**
```json
{
  "status": "success",
  "message": "Meal berhasil dihapus"
}
```

---

## 📊 6. Nutrition

### Get Daily Summary
Mengambil ringkasan total nutrisi harian pengguna yang sedang login.
* **Method:** `GET`
* **Endpoint:** `/nutrition/daily-summary`
* **Auth Required:** Yes
* **Success Response (200 OK):**
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