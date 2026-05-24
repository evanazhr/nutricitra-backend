# 📚 NutriWise API Documentation

Dokumentasi ini berisi daftar *endpoint* yang tersedia pada backend aplikasi. 
Secara *default*, semua *request* dan *response* menggunakan `Content-Type: application/json` kecuali disebutkan secara spesifik.

---

## 🔐 1. Authentication & Users

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

```json
{
    "status": "success",
    "message": "User berhasil didaftarkan"
}
```

### login User
Mendaftarkan akun pengguna baru.
* **Method:** `POST`
* **Endpoint:** `/users`
* **Auth Required:** No
* **Request Body:**
  

```json
{
    "email": "john@example.com",
    "password": "Password123!"
}
```

success response
```json
{
    "status": "success",
    "message": "Login berhasil",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    }
}
```

### get Profile
* **Method:** `GET`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Success response (200 ok):**
  
```json
{
    "status": "success",
    "message": "Profile berhasil diambil",
    "data": {
      "profile": {
        "user_id": "uuid-string-here",
        "height": 175,
        "weight": 65,
        "age": 20
      }
    }
}
```

### create Profile
Mendaftarkan akun pengguna baru.
* **Method:** `GET`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Request Body:**
  

```json
{
    "height": 175,
    "weight": 65,
    "age": 20
}
```

 * **Success response (201 created):**

```json 
{
    "status": "success",
    "message": "Profile berhasil dibuat",
    "data": {
      "profile": {
        "user_id": "uuid-string-here",
        "height": 175,
        "weight": 65,
        "age": 20
      }
    }
}
```


### Update Profile
Mendaftarkan akun pengguna baru.
* **Method:** `PUT`
* **Endpoint:** `/profiles`
* **Auth Required:** Yes
* **Request Body:**
  
```json
{
    "height": 176,
    "weight": 68,
    "age": 21
}
```