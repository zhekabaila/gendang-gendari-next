# API Documentation - Gendang Gendari Express

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

All endpoints require JWT token in Authorization header (except Register & Login):

```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth & Register

#### 1. Register

**POST** `/register`

**Payload:**

```json
{
  "nama": "John Doe",
  "umur": 25,
  "asalKota": "Jakarta",
  "username": "johndoe",
  "password": "password123",
  "phone": "08123456789"
}
```

**Response:** User created with JWT token

---

#### 2. Login

**POST** `/auth/login`

**Payload:**

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:** JWT token

---

### User

#### 1. Get All Users

**GET** `/user?page=1&limit=10`

**Response:** List of users with pagination

---

#### 2. Get User by ID

**GET** `/user/:id`

**Response:** User detail

---

#### 3. Create User

**POST** `/user`

**Payload:**

```json
{
  "nama": "Jane Doe",
  "umur": 28,
  "asalKota": "Bandung",
  "username": "janedoe",
  "password": "password456",
  "phone": "08234567890"
}
```

**Response:** User created

---

#### 4. Update User

**PUT** `/user/:id`

**Payload:**

```json
{
  "nama": "Jane Smith",
  "umur": 29,
  "asalKota": "Surabaya",
  "phone": "08345678901"
}
```

**Response:** User updated

---

#### 5. Delete User

**DELETE** `/user/:id`

**Response:** User deleted

---

### Ticket

#### 1. Get All Tickets

**GET** `/ticket?page=1&limit=10&kategori=musik`

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `kategori` - Filter by category (optional)

**Response:** List of tickets with quota info (totalTerjual, sisaQuota, persentaseTerisi)

---

#### 2. Get Ticket by ID

**GET** `/ticket/:id`

**Response:** Ticket detail with quota

---

#### 3. Get Ticket Quota

**GET** `/ticket/quota/:id`

**Response:**

```json
{
  "totalTerjual": 150,
  "sisaQuota": 350,
  "persentaseTerisi": 30
}
```

---

#### 4. Create Ticket

**POST** `/ticket`

**Payload:**

```json
{
  "judul": "Konser Musik Indie 2025",
  "kategori": ["musik", "konser"],
  "deskripsi": "Konser musik indie terbesar tahun ini dengan menghadirkan artis-artis ternama dari berbagai genre yang tidak boleh dilewatkan.",
  "tanggal": "2025-12-15",
  "waktu": "19:00",
  "venue": "Jakarta International Expo",
  "kota": "Jakarta",
  "harga": 350000,
  "kapasitas": 5000,
  "penyelenggara": "PT. Konser Musik Indonesia",
  "gambar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
}
```

**Response:** Ticket created

---

#### 5. Update Ticket

**PUT** `/ticket/:id`

**Payload:** (Same as Create, all fields optional)

**Response:** Ticket updated

---

#### 6. Patch Ticket

**PATCH** `/ticket/:id`

**Payload:** (Partial update, only fields to update)

**Response:** Ticket updated

---

#### 7. Delete Ticket

**DELETE** `/ticket/:id`

**Response:** Ticket deleted

---

### Blog

#### 1. Get All Blogs

**GET** `/blog?page=1&limit=10`

**Response:** List of blogs with pagination

---

#### 2. Get Blog by ID

**GET** `/blog/:id`

**Response:** Blog detail

---

#### 3. Create Blog

**POST** `/blog`

**Payload:**

```json
{
  "judul": "Panduan Memulai Karir di Teknologi",
  "kategori": ["teknologi", "karir"],
  "ringkasan": "Artikel ini membahas tips dan trik untuk memulai karir di dunia teknologi dengan strategi yang efektif.",
  "konten": "Memulai karir di teknologi memerlukan persiapan yang matang. Anda perlu membangun fondasi pengetahuan yang kuat, belajar dari mentor berpengalaman, dan terus mengikuti perkembangan industri.",
  "penulis": "Ahmad Hidayat",
  "tanggal": "2025-11-18",
  "waktuBaca": 8,
  "gambar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
}
```

**Response:** Blog created

---

#### 4. Update Blog

**PUT** `/blog/:id`

**Payload:** (Same as Create, all fields optional)

**Response:** Blog updated

---

#### 5. Patch Blog

**PATCH** `/blog/:id`

**Payload:** (Partial update, only fields to update)

**Response:** Blog updated

---

#### 6. Delete Blog

**DELETE** `/blog/:id`

**Response:** Blog deleted

---

### Pembeli

#### 1. Get All Pembeli

**GET** `/pembeli?page=1&limit=10`

**Response:** List of pembeli with pagination

---

#### 2. Get Pembeli by ID

**GET** `/pembeli/:id`

**Response:** Pembeli detail with user and ticket info

---

#### 3. Create Pembeli

**POST** `/pembeli`

**Payload:**

```json
{
  "nama": "Rendra Wijaya",
  "email": "rendra.wijaya@email.com",
  "noHandphone": "08123456789",
  "alamat": "Jl. Merdeka No. 45 RT 03 RW 05",
  "kota": "Jakarta",
  "jumlahTiket": 2,
  "metodePembayaran": "transfer",
  "userId": "02c2d02b-8291-4f8a-bffc-8e2158c7b66a",
  "ticketId": "51062c82-9315-44b5-8880-5b109a22e6ec"
}
```

**Note:** `userId` is optional, `ticketId` is required

**Response:** Pembeli created

---

#### 4. Update Pembeli

**PUT** `/pembeli/:id`

**Payload:** (Same as Create, all fields optional)

**Response:** Pembeli updated

---

#### 5. Patch Pembeli

**PATCH** `/pembeli/:id`

**Payload:** (Partial update, only fields to update)

**Response:** Pembeli updated

---

#### 6. Delete Pembeli

**DELETE** `/pembeli/:id`

**Response:** Pembeli deleted

---

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "size": 10,
    "pages": 5
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```

---

## Notes

- Image field accepts base64 format: `data:image/[format];base64,[data]`
- Supported image formats: png, jpg, jpeg, gif, webp
- Tanggal field format: `YYYY-MM-DD`
- Waktu field format: `HH:MM` (24-hour format)
- Phone number: 10-12 digits
- metodePembayaran options: `transfer`, `cash`, `kartu kredit`, `e-wallet`
