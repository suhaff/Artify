package com.artify.controller;

import com.artify.model.Product;
import com.artify.model.User;
import com.artify.repository.ProductRepository;
import com.artify.repository.UserRepository;
import com.artify.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public ProductController(ProductRepository productRepo,
                             UserRepository userRepo,
                             JwtUtil jwtUtil) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    // =============================
    // ADD PRODUCT (SELLER)
    // =============================
    @PostMapping
    public Product addProduct(@RequestBody Product product,
                              HttpServletRequest request) {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        User seller = userRepo.findByEmail(email).orElseThrow();

        product.setSellerId(seller.getId());
        return productRepo.save(product);
    }

    // =============================
    // SELLER PRODUCTS
    // =============================
    @GetMapping("/seller")
    public List<Product> getSellerProducts(HttpServletRequest request) {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        User seller = userRepo.findByEmail(email).orElseThrow();

        return productRepo.findBySellerId(seller.getId());
    }

    // =============================
    // PUBLIC CATALOGUE
    // =============================
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }
}
