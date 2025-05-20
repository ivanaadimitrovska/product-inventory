# Product Inventory Frontend

This is the frontend application for the Product Inventory system, built with Angular 17. It provides a user interface for managing products, including features like product listing, creation, editing, and deletion.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-inventory-frontend/FE-part
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200`.

## Features

- **Product List**: View all products with pagination and search functionality
- **Product Creation**: Add new products with images
- **Product Editing**: Modify existing product details
- **Product Deletion**: Remove products from the inventory
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── product-list/
│   │   ├── product-form/
│   │   └── stats/
│   ├── models/
│   │   └── product.model.ts
│   ├── services/
│   │   ├── product.service.ts
│   │   └── stats.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss
```

## API Integration

The frontend communicates with a backend API running at `http://localhost:8080`. The API endpoints are:

- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{id}` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product

## Building for Production

To build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/product-inventory-frontend` directory.

## Running with SSR (Server-Side Rendering)

To run the application with server-side rendering:

1. Build the application:
```bash
ng build
ng run product-inventory-frontend:server
```

2. Start the server:
```bash
npm run start:ssr
```

## Environment Configuration

The application uses environment files for configuration:

- `environment.ts` - Development environment settings
- `environment.prod.ts` - Production environment settings

Key configuration options:
- `apiUrl`: The base URL for the backend API
- `production`: Boolean flag indicating the environment

## Dependencies

Main dependencies:
- Angular 17
- RxJS
- ngx-pagination
- Bootstrap (for styling)

# Product Inventory Backend

This is the backend part of the Product Inventory Management System. It is built using Spring Boot and PostgreSQL.

## Prerequisites

- Java 17 or higher
- Maven
- Docker (for running PostgreSQL)

## Database Setup

1. **Start PostgreSQL using Docker:**

   ```bash
   docker run --name pgdb -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

   This command:
   - Creates a PostgreSQL container named `pgdb`
   - Sets the password for the `postgres` user to `postgres`
   - Maps port 5432 on your host to port 5432 in the container
   - Runs the container in detached mode

2. **Verify the container is running:**

   ```bash
   docker ps
   ```

   You should see the `pgdb` container running.

## Configuration

The application uses the following configuration in `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080

# File Upload Configuration
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
```

## Running the Application

1. **Navigate to the backend directory:**

   ```bash
   cd BE - part
   ```

2. **Start the application using Maven:**

   ```bash
   ./mvnw spring-boot:run
   ```

   The application will start on `http://localhost:8080`.

## API Endpoints

The backend provides the following REST endpoints:

- **GET /api/products**: Get a paginated list of products
- **GET /api/products/{id}**: Get a product by ID
- **POST /api/products**: Create a new product
- **PUT /api/products/{id}**: Update a product
- **DELETE /api/products/{id}**: Delete a product

