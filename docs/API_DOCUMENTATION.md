# Kasi-eCo REST API Reference 🔌

The Kasi-eCo Backend REST API is built on Express.js and communicates via JSON.

* **Base URL (Local):** `http://localhost:5555`
* **Base URL (Production):** `https://kasi-e-co.vercel.app`

---

## 🔑 Authentication

Protected endpoints require a JSON Web Token (JWT) passed in the `x-access-token` header:

```http
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📦 Products Endpoints (`/v1/products`)

### 1. Get All Products
Retrieves the list of all active products on the marketplace.

* **Method:** `GET`
* **Path:** `/v1/products`
* **Authentication:** None
* **Response (200 OK):**
```json
[
  {
    "id": "64b7f8c12a0f8b1234567890",
    "p_name": "Handmade Beaded Necklace",
    "price": "220.00",
    "description": "Authentic African handmade beadwork necklace.",
    "category": "Crafts",
    "image": "https://example.com/necklace.jpg",
    "createdBy": "64b7f5a12a0f8b1234567800"
  }
]
```

---

### 2. Get Single Product
Fetches detailed specifications for a single product.

* **Method:** `GET`
* **Path:** `/v1/products/:id`
* **Authentication:** None
* **Response (200 OK):**
```json
{
  "id": "64b7f8c12a0f8b1234567890",
  "p_name": "Handmade Beaded Necklace",
  "price": "220.00",
  "description": "Authentic African handmade beadwork necklace.",
  "category": "Crafts",
  "image": "https://example.com/necklace.jpg",
  "createdBy": "64b7f5a12a0f8b1234567800"
}
```

---

### 3. Add Product Listing
Creates a new product item under the authenticated trader's inventory.

* **Method:** `POST`
* **Path:** `/v1/products/addProduct`
* **Authentication:** Required (`x-access-token`)
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "p_name": "Handcrafted Wooden Stool",
  "category": "Crafts",
  "description": "Solid pine timber handmade stool.",
  "price": "350.00",
  "image": "https://example.com/stool.jpg"
}
```
* **Response (201 Created):**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "64b7fa992a0f8b1234567899",
    "p_name": "Handcrafted Wooden Stool",
    "price": "350.00",
    "category": "Crafts",
    "description": "Solid pine timber handmade stool.",
    "image": "https://example.com/stool.jpg",
    "createdBy": "64b7f5a12a0f8b1234567800"
  }
}
```

---

### 4. Delete Product
Removes a product from the marketplace.

* **Method:** `DELETE`
* **Path:** `/v1/products/:id`
* **Authentication:** Required (`x-access-token`)
* **Response (200 OK):**
```json
{
  "message": "Product was deleted successfully!"
}
```

---

## 🏪 Traders Endpoints (`/v1/traders`)

### 1. Get All Traders
* **Method:** `GET`
* **Path:** `/v1/traders`
* **Authentication:** None
* **Response (200 OK):**
```json
[
  {
    "id": "64b7f5a12a0f8b1234567800",
    "trader_name": "Sipho Khumalo",
    "businessName": "Sipho's Woodcraft",
    "email": "sipho@example.co.za",
    "cell": "0721234567",
    "image": "https://example.com/sipho.jpg"
  }
]
```

---

### 2. Get Single Trader Profile
* **Method:** `GET`
* **Path:** `/v1/traders/:id`
* **Authentication:** None
* **Response (200 OK):**
```json
{
  "id": "64b7f5a12a0f8b1234567800",
  "trader_name": "Sipho Khumalo",
  "businessName": "Sipho's Woodcraft",
  "email": "sipho@example.co.za",
  "cell": "0721234567",
  "image": "https://example.com/sipho.jpg"
}
```

---

## 🔐 Auth Endpoints (`/v1/traders/`)

### 1. Sign Up
* **Method:** `POST`
* **Path:** `/v1/traders/signup`
* **Body:**
```json
{
  "trader_name": "Nandi Dlamini",
  "businessName": "Nandi Fashion Hub",
  "email": "nandi@example.co.za",
  "cell": "0839876543",
  "password": "Password123"
}
```

---

### 2. Sign In
* **Method:** `POST`
* **Path:** `/v1/traders/signin`
* **Body:**
```json
{
  "email": "nandi@example.co.za",
  "password": "Password123"
}
```
* **Response (200 OK):**
```json
{
  "id": "64b7f5a12a0f8b1234567801",
  "trader_name": "Nandi Dlamini",
  "businessName": "Nandi Fashion Hub",
  "email": "nandi@example.co.za",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
