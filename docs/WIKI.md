# Kasi-eCo Wiki & Knowledge Base 📚

Welcome to the internal engineering and operational wiki for **Kasi-eCo**. This knowledge base documents the platform architecture, data models, developer standards, and user journeys.

---

## 📑 Table of Contents

1. [Architecture & System Design](#1-architecture--system-design)
2. [Data Models & Schema Design](#2-data-models--schema-design)
3. [Authentication & Security](#3-authentication--security)
4. [WhatsApp Direct Commerce Flow](#4-whatsapp-direct-commerce-flow)
5. [Frontend Structure & Component Hierarchy](#5-frontend-structure--component-hierarchy)
6. [Related Documentation Modules](#6-related-documentation-modules)

---

## 1. Architecture & System Design

Kasi-eCo is organized as a decoupled, monolithic repository containing an **Angular 16 Single Page Application (SPA)** and a **Node.js/Express REST API**:

### Architectural Layers
* **Client Tier:** Angular 16 utilizing component-driven architecture, modular routing, reactive services (`HttpClient`), and Bootstrap 5 for responsive layout.
* **API Tier:** Express.js REST application operating under the MVC pattern with route-controller-model separation.
* **Persistence Tier:** MongoDB managed via Mongoose 7 schemas with custom JSON serializers stripping `__v` and standardizing `_id` to `id`.
* **Integration Tier:** WhatsApp Click-to-Chat deep linking (`wa.me`) enabling client-to-merchant transactional communication without demanding complex merchant banking setups.

---

## 2. Data Models & Schema Design

All schemas reside in [`Backend/models/`](file:///c:/projects/Kasi-eCo/Backend/models/):

### User & Role Model (`user.model.js`, `role.model.js`)
* Manages core authentication credentials, encrypted passwords (`bcrypt`), and user roles (`ROLE_USER`, `ROLE_MODERATOR`, `ROLE_ADMIN`).

### Trader Model (`trader.model.js`)
* Stores merchant business profiles:
  * `trader_name`: Primary contact or owner name.
  * `businessName`: Commercial name displayed on marketplace storefronts.
  * `cell`: Merchant phone number used for direct WhatsApp generation.
  * `email`: Contact email address.
  * `image`: Store avatar or banner URL.
  * `address`: Physical township location/trading outpost.

### Product Model (`products.model.js`)
* Catalog items published by merchants:
  * `p_name`: Item name.
  * `price`: Retail price (ZAR).
  * `category`: Taxonomy classification (e.g., Crafts, Fashion, Food, Services).
  * `description`: Item specifications and details.
  * `image`: Base64 string or public URL.
  * `createdBy`: Foreign key reference to Trader's ID.

### Order Model (`orders.model.js`)
* Tracks order transactions placed through the platform:
  * `customerId`: Reference to customer user.
  * `traderId`: Reference to seller merchant.
  * `items`: Array of product items and quantities.
  * `status`: Processing state (`Pending`, `Confirmed`, `Completed`, `Cancelled`).

---

## 3. Authentication & Security

* **Hashing:** Passwords are encrypted using `bcrypt` with salt rounds before database persistence.
* **Tokens:** On successful login, the server issues a JSON Web Token (JWT) signed with `JWT_SECRET`.
* **Angular Interceptor:** The client utilizes an HTTP Interceptor ([`auth.interceptor.ts`](file:///c:/projects/Kasi-eCo/Frontend/Kasi-eCo/src/app/_helpers/auth.interceptor.ts)) that captures outgoing requests and automatically attaches the `x-access-token` header when a token is present in `TokenStorageService`.

---

## 4. WhatsApp Direct Commerce Flow

South African township commerce thrives on trust, direct negotiation, and informal cash/e-wallet arrangements. Kasi-eCo leverages standard WhatsApp URL schemas to bridge this:

```
https://wa.me/{cleanInternationalNumber}?text={urlEncodedMessage}
```

1. **Number Normalization:** 
   The client helper transforms South African mobile numbers (starting with `07`, `08`, `06`) by stripping whitespace, removing the leading `0`, and prepending South Africa's country code `27`.
2. **Contextual Messaging:**
   When a user clicks "Chat on WhatsApp" from a product detail page, the link automatically pre-fills:
   > *"Hi! I found your product 'Handmade Leather Belt' (R150.00) on Kasi-eCo and would like to inquire."*
3. **Frictionless Conversion:** 
   The customer is immediately in contact with the maker, allowing them to agree on payment method (Cash, Instant EFT, eWallet) and collection/delivery location.

---

## 5. Frontend Structure & Component Hierarchy

```text
app-root
 ├── Navbar (Bootstrap 5 Responsive, Token-Aware)
 └── router-outlet
      ├── HomeComponent (/home)
      │    ├── Hero Banner
      │    └── Featured Merchant Profiles
      ├── ProductsComponent (/products)
      │    ├── Instant Search Bar
      │    ├── Category Filter Pills
      │    └── Responsive Product Card Grid
      ├── ProductDetailComponent (/product-detail/:id)
      │    ├── Product Media & Pricing
      │    ├── WhatsApp Direct CTA
      │    └── Trader Storefront Modal
      ├── TradersComponent (/traders)
      │    ├── Search Bar
      │    └── Merchant Card Grid
      ├── TraderDetailComponent (/trader-detail/:id)
      │    ├── Avatar & Bio
      │    └── Direct Contact & WhatsApp Links
      └── ProductInventoryComponent (/product-inventory)
           ├── Add Product Form (Validation & Base64 upload)
           ├── Live Customer Card Preview
           └── Active Listings Management
```

---

## 6. Related Documentation Modules

* 🔌 [**REST API Documentation**](API_DOCUMENTATION.md): Endpoint reference, schemas, status codes, and curl examples.
* 🏪 [**Trader User Guide**](TRADER_GUIDE.md): Guide for merchants to register, list items, and maximize sales.
* ☁️ [**Deployment Guide**](DEPLOYMENT_GUIDE.md): Hosting the API on Vercel and Angular on GitHub Pages/Vercel.
