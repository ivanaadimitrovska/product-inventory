package com.example.productinventory.service;

import com.example.productinventory.model.Product;
import com.example.productinventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private static final int LOW_STOCK_THRESHOLD = 10;
    
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public Page<Product> getAllProducts(String name, String category, Pageable pageable) {
        if (name != null && !name.isEmpty() && category != null && !category.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(name, category, pageable);
        } else if (name != null && !name.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(name, pageable);
        } else if (category != null && !category.isEmpty()) {
            return productRepository.findByCategoryContainingIgnoreCase(category, pageable);
        }
        return productRepository.findAll(pageable);
    }
    
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    
    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantityInStock(productDetails.getQuantityInStock());
        product.setCategory(productDetails.getCategory());
        if (productDetails.getImageUrl() != null) {
            product.setImageUrl(productDetails.getImageUrl());
        }
        
        return productRepository.save(product);
    }
    
    public Product patchProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        if (productDetails.getName() != null) {
            product.setName(productDetails.getName());
        }
        if (productDetails.getDescription() != null) {
            product.setDescription(productDetails.getDescription());
        }
        if (productDetails.getPrice() != null) {
            product.setPrice(productDetails.getPrice());
        }
        if (productDetails.getQuantityInStock() != null) {
            product.setQuantityInStock(productDetails.getQuantityInStock());
        }
        if (productDetails.getCategory() != null) {
            product.setCategory(productDetails.getCategory());
        }
        if (productDetails.getImageUrl() != null) {
            product.setImageUrl(productDetails.getImageUrl());
        }
        
        return productRepository.save(product);
    }
    
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    public Map<String, Object> getProductStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get total product count
        long totalProducts = productRepository.count();
        stats.put("totalProducts", totalProducts);
        
        // Get low stock count
        long lowStockCount = productRepository.countByQuantityInStockLessThanEqual(LOW_STOCK_THRESHOLD);
        stats.put("lowStockCount", lowStockCount);
        
        // Calculate average price
        List<Product> allProducts = productRepository.findAll();
        double averagePrice = allProducts.stream()
                .mapToDouble(Product::getPrice)
                .average()
                .orElse(0.0);
        stats.put("averagePrice", averagePrice);
        
        return stats;
    }
} 