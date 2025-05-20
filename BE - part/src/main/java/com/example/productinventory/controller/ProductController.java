package com.example.productinventory.controller;

import com.example.productinventory.model.Product;
import com.example.productinventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.net.MalformedURLException;
import org.springframework.http.MediaType;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    private final ProductService productService;
    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
    private final List<String> allowedFileTypes = Arrays.asList("image/jpeg", "image/png", "image/gif");
    private final long maxFileSize = 5 * 1024 * 1024; // 5MB
    
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<Product> products = productService.getAllProducts(name, category, pageable);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getProductStats() {
        return ResponseEntity.ok(productService.getProductStats());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("quantityInStock") Integer quantityInStock,
            @RequestParam("category") String category) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setQuantityInStock(quantityInStock);
            product.setCategory(category);
            
            if (image != null && !image.isEmpty()) {
                // Validate file size
                if (image.getSize() > maxFileSize) {
                    return ResponseEntity.badRequest().body("File size exceeds the maximum limit of 5MB");
                }

                // Validate file type
                String contentType = image.getContentType();
                if (contentType == null || !allowedFileTypes.contains(contentType)) {
                    return ResponseEntity.badRequest().body("Only JPG, PNG and GIF images are allowed");
                }

                // Save the image
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                String newFileName = "product-" + System.currentTimeMillis() + "-" + fileName;
                Path targetLocation = fileStorageLocation.resolve(newFileName);
                Files.createDirectories(fileStorageLocation);
                Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                
                // Set the image URL
                product.setImageUrl("/api/products/image/" + newFileName);
            }
            
            Product savedProduct = productService.createProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating product: " + e.getMessage());
        }
    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) Double price,
            @RequestParam(value = "quantityInStock", required = false) Integer quantityInStock,
            @RequestParam(value = "category", required = false) String category) {
        try {
            Product product = productService.getProductById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
            
            if (name != null) product.setName(name);
            if (description != null) product.setDescription(description);
            if (price != null) product.setPrice(price);
            if (quantityInStock != null) product.setQuantityInStock(quantityInStock);
            if (category != null) product.setCategory(category);
            
            if (image != null && !image.isEmpty()) {
                // Validate file size
                if (image.getSize() > maxFileSize) {
                    return ResponseEntity.badRequest().body("File size exceeds the maximum limit of 5MB");
                }

                // Validate file type
                String contentType = image.getContentType();
                if (contentType == null || !allowedFileTypes.contains(contentType)) {
                    return ResponseEntity.badRequest().body("Only JPG, PNG and GIF images are allowed");
                }

                // Save the image
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                String newFileName = "product-" + id + "-" + System.currentTimeMillis() + "-" + fileName;
                Path targetLocation = fileStorageLocation.resolve(newFileName);
                Files.createDirectories(fileStorageLocation);
                Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                
                // Set the image URL
                product.setImageUrl("/api/products/image/" + newFileName);
            }
            
            Product updatedProduct = productService.updateProduct(id, product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating product: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                String contentType = Files.probeContentType(filePath);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, contentType != null ? contentType : "application/octet-stream")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
} 