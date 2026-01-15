package com.artify.controller;

import com.artify.dto.SellerRequest;
import com.artify.dto.SellerStatsResponse;
import com.artify.model.User;
import com.artify.repository.OrderRepository;
import com.artify.repository.ProductRepository;
import com.artify.repository.UserRepository;
import com.artify.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class SellerController {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final JwtUtil jwtUtil;

    public SellerController(UserRepository userRepo,
                            ProductRepository productRepo,
                            OrderRepository orderRepo,
                            JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.jwtUtil = jwtUtil;
    }

    // =============================
    // BECOME SELLER
    // =============================
    @PostMapping("/become-seller")
    public ResponseEntity<?> becomeSeller(@RequestBody SellerRequest req,
                                          HttpServletRequest request) {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!"BUYER".equals(user.getRole())) {
            return ResponseEntity.badRequest().body("Already a seller");
        }

        user.setRole("SELLER");
        user.setShopName(req.getShopName());
        user.setTaxId(req.getTaxId());

        userRepo.save(user);
        return ResponseEntity.ok("Seller account created");
    }

    // =============================
    // SELLER DASHBOARD STATS
    // =============================
    @GetMapping("/seller/stats")
    public ResponseEntity<?> getSellerStats(HttpServletRequest request) {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        User seller = userRepo.findByEmail(email).orElse(null);

        if (seller == null || !"SELLER".equals(seller.getRole())) {
            return ResponseEntity.status(403).body("Not a seller");
        }

        int products = productRepo.findBySellerId(seller.getId()).size();
        int orders = orderRepo.findAll().size(); // simplified
        double revenue = orderRepo.findAll()
                .stream()
                .mapToDouble(o -> o.getTotal())
                .sum();

        int reviews = 3; // placeholder

        return ResponseEntity.ok(
                new SellerStatsResponse(products, orders, revenue, reviews)
        );
    }
}
