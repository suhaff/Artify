package com.artify.controller;

import com.artify.dto.SellerRequest;
import com.artify.model.User;
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
    private final JwtUtil jwtUtil;

    public SellerController(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/become-seller")
    public ResponseEntity<?> becomeSeller(@RequestBody SellerRequest req,
                                          HttpServletRequest request) {

        String auth = request.getHeader("Authorization");

        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing token");
        }

        String token = auth.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!user.getRole().equals("BUYER")) {
            return ResponseEntity.badRequest().body("Already a seller");
        }

        user.setRole("SELLER");
        user.setShopName(req.shopName);
        user.setTaxId(req.taxId);

        userRepo.save(user);

        return ResponseEntity.ok("Seller account created");
    }
}
