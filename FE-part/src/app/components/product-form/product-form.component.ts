import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantityInStock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.productService.getProductById(Number(id)).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          quantityInStock: product.quantityInStock,
          category: product.category
        });
        if (product.imageUrl) {
          this.imagePreview = product.imageUrl;
        }
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Failed to load product. Please try again.';
        this.loading = false;
        console.error('Error loading product:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.error = 'Please select an image file';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.error = 'Image size should not exceed 5MB';
        return;
      }

      this.selectedFile = file;
      this.productForm.patchValue({ image: file });
      this.error = null;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;

      const formData = new FormData();
      const formValue = this.productForm.value;

      // Append all form fields to FormData
      Object.keys(formValue).forEach(key => {
        if (key === 'image' && this.selectedFile) {
          formData.append('image', this.selectedFile);
        } else {
          formData.append(key, formValue[key]);
        }
      });

      const request$ = this.isEditMode
        ? this.productService.updateProduct(Number(this.route.snapshot.paramMap.get('id')), formData)
        : this.productService.createProduct(formData);

      request$.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (error: Error) => {
          this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} product. Please try again.`;
          this.loading = false;
          console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} product:`, error);
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return 'Value must be greater than or equal to 0';
    }
    return '';
  }
}
