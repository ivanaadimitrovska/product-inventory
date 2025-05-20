import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response, NextFunction } from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(process.cwd(), 'dist/product-inventory-frontend/browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory product storage
let products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    quantityInStock: 10,
    category: 'Electronics',
    imageUrl: 'https://via.placeholder.com/150'
  },
  // Add more mock products as needed
];

// Product API endpoints
app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...req.body,
      id: parseInt(req.params.id)
    };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Stats endpoint
app.get('/api/stats', (req: Request, res: Response) => {
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.quantityInStock, 0),
    lowStockProducts: products.filter(p => p.quantityInStock < 5).length,
    categoryDistribution: Object.entries(
      products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([category, count]) => ({ category, count })),
    monthlySales: [
      { month: 'Jan', value: 1500 },
      { month: 'Feb', value: 2000 },
      { month: 'Mar', value: 1800 },
      // Add more months as needed
    ]
  };
  res.json(stats);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    next();
  } else {
    res.sendFile(path.join(browserDistFolder, 'index.html'));
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 8080.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 8080;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
