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

### Get All Users
Mengambil daftar semua pengguna.
* **Method:** `GET`
* **Endpoint:** `/users`
* **Auth Required:** No

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