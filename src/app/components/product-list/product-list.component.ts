import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  error: string | null = null;
  searchControl = new FormControl('');
  
  // Pagination properties
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private productService: ProductService,
    public router: Router
  ) {
    // Subscribe to search input changes
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms after user stops typing
      distinctUntilChanged() // Only emit if the value has changed
    ).subscribe(searchTerm => {
      this.filterProducts(searchTerm || '');
      this.page = 1; // Reset to first page when search changes
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.totalItems = data.length;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  filterProducts(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredProducts = this.products;
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.category?.toLowerCase() || '').includes(term)
      );
    }
    this.totalItems = this.filteredProducts.length;
    this.page = 1; // Reset to first page when filter changes
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.error = null;
      
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
          this.totalItems = this.filteredProducts.length;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to delete product. Please try again.';
          this.loading = false;
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  refreshProducts(): void {
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.page = page;
  }
}
