import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/new', component: ProductFormComponent },
  { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '/products' }
];
