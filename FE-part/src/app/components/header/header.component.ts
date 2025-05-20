import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header [class.dark-mode]="isDarkMode">
      <div class="container">
        <nav>
          <a routerLink="/" class="logo">Product Inventory</a>
          <div class="nav-links">
            <a routerLink="/products">Products</a>
            <a routerLink="/stats">Statistics</a>
            <button class="theme-toggle" (click)="toggleDarkMode()">
              {{ isDarkMode ? '🌞' : '🌙' }}
            </button>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    header {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      transition: background-color 0.3s ease;
    }

    header.dark-mode {
      background-color: #1a1a1a;
      color: #fff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: inherit;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-links a {
      text-decoration: none;
      color: inherit;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    .nav-links a:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dark-mode .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s ease;
    }

    .theme-toggle:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dark-mode .theme-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
} 