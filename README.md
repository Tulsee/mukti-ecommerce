## Tech Stack

- **Runtime** : Node.js (v18+)
- **Framework** : Express.js with TypeScript
- **Database** : PostgreSQL
- **ORM** : Drizzle ORM
- **Authentication** : JSON Web Tokens (JWT)
- **Containerization** : Docker & Docker Compose
- **Security** : Rate limiting, input validation
- **Logging** : Morgan HTTP request logger

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) (for containerized setup)
- PostgreSQL database

## Quick Start

### Option 1: Docker Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tulsee/mukti-ecommerce
   cd muktiTech
   ```
2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
3. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

The API will be available at `http://localhost:8000`

### Option 2: Local Development

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/Tulsee/mukti-ecommerce
   cd muktiTech
   npm install
   ```
2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Update .env with your PostgreSQL connection details
   ```
3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Register User

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "fullName": "Shankar Ghimire",
  "email": "ramtulsi022@gmail.com",
  "password": "Securepassword@123"
}
```

### To register seller

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "fullName": "Shankar Ghimire",
  "email": "ramtulsi022@gmail.com",
  "password": "Securepassword@123",
  "role": "Seller"
}
```

### Login User

```bash
POST /api/v1/auth/login
Content-Type: application/json{
  "email": "ramtulsi022@gmail.com",
  "password": "Securepassword@123"
}
```

### Create Product

```bash
POST /api/v1/products
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 99,
  "stock": 50
}
```

### Get All Product

```bash
GET /api/v1/products
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

Available Routes with filter
`/api/v1/products?page=2`
`/api/v1/products?minPrice=45000&maxPrice=45000`
`/api/v1/products?minPrice=45000&sellerId=2`

### Place Order

```bash
POST /api/v1/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "productId": 1
}
```

## Docker Configuration

The project includes:

- **Dockerfile**
- **docker-compose.yml** with PostgreSQL service
- **Automatic migrations** on container startup

### Docker Commands

```bash
# Build and start services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## Deployment

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## Database Schema

The API uses the following main entities:

- **Users** : Authentication and role management
- **Products** : Product catalog with seller relationship
- **Orders** : Order tracking with buyer and product relationships

## Security Features

- JWT-based authentication
- Role-based authorization
- Rate limiting (configurable)
- Input validation
- SQL injection prevention (via Drizzle ORM)
- CORS configuration
