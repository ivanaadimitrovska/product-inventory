import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService, ProductStats } from '../../services/stats.service';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  template: `
    <div class="stats-container">
      <h1>Product Statistics</h1>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <div *ngIf="loading" class="loading">
        Loading statistics...
      </div>

      <div *ngIf="!loading && !error" class="stats-grid">
        <!-- Summary Cards -->
        <div class="stats-card">
          <h3>Total Products</h3>
          <p class="stat-value">{{ stats?.totalProducts }}</p>
        </div>
        <div class="stats-card">
          <h3>Total Value</h3>
          <p class="stat-value">{{ stats?.totalValue | currency }}</p>
        </div>
        <div class="stats-card">
          <h3>Low Stock Products</h3>
          <p class="stat-value">{{ stats?.lowStockProducts }}</p>
        </div>

        <!-- Category Distribution Chart -->
        <div class="chart-card">
          <h3>Category Distribution</h3>
          <ngx-charts-pie-chart
            [results]="categoryData"
            [gradient]="true"
            [legend]="true"
            [legendTitle]="'Categories'"
            [labels]="true"
            [doughnut]="true"
            [arcWidth]="0.5"
            [scheme]="colorScheme">
          </ngx-charts-pie-chart>
        </div>

        <!-- Monthly Sales Chart -->
        <div class="chart-card">
          <h3>Monthly Sales</h3>
          <ngx-charts-bar-vertical
            [results]="salesData"
            [gradient]="true"
            [xAxis]="true"
            [yAxis]="true"
            [legend]="false"
            [showXAxisLabel]="true"
            [showYAxisLabel]="true"
            [xAxisLabel]="'Month'"
            [yAxisLabel]="'Sales'"
            [scheme]="colorScheme">
          </ngx-charts-bar-vertical>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      padding: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .stats-card {
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 4px var(--shadow-color);
    }

    .chart-card {
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px var(--shadow-color);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 10px 0;
      color: var(--text-color);
    }

    h3 {
      margin: 0;
      color: var(--text-color);
    }

    .error-message {
      color: #dc3545;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #dc3545;
      border-radius: 4px;
      background-color: #f8d7da;
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: var(--text-color);
    }

    :host ::ng-deep {
      .ngx-charts {
        text {
          fill: var(--text-color) !important;
        }
      }
    }
  `]
})
export class StatsComponent implements OnInit {
  stats: ProductStats | null = null;
  loading = false;
  error: string | null = null;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = null;

    this.statsService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load statistics. Please try again.';
        this.loading = false;
        console.error('Error loading statistics:', error);
      }
    });
  }

  get categoryData() {
    return this.stats?.categoryDistribution.map(item => ({
      name: item.category,
      value: item.count
    })) || [];
  }

  get salesData() {
    return this.stats?.monthlySales.map(item => ({
      name: item.month,
      value: item.value
    })) || [];
  }
} 