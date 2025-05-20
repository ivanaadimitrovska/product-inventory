package com.example.productinventory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    @Column(nullable = false)
    private Double price;
    
    @NotNull(message = "Quantity in stock is required")
    @Min(value = 0, message = "Quantity in stock must be greater than or equal to 0")
    @Column(name = "quantity_in_stock", nullable = false)
    private Integer quantityInStock;
    
    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    private String imageUrl;
} 