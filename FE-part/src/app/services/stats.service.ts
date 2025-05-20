import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProductStats {
  totalProducts: number;
  totalValue: number;
  lowStockProducts: number;
  categoryDistribution: {
    category: string;
    count: number;
  }[];
  monthlySales: {
    month: string;
    value: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<ProductStats> {
    return this.http.get<ProductStats>(this.apiUrl);
  }
} 