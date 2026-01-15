package com.artify.controller;

import com.artify.model.Complaint;
import com.artify.repository.ComplaintRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin
public class ComplaintController {

    private final ComplaintRepository repo;

    public ComplaintController(ComplaintRepository repo) {
        this.repo = repo;
    }

    /* BUYER: submit complaint */
    @PostMapping
    public Complaint submit(@RequestBody Complaint body) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // from JWT

        Complaint c = new Complaint();
        c.setUserEmail(email);
        c.setMessage(body.getMessage());
        c.setStatus("PENDING");

        return repo.save(c);
    }

    /* ADMIN: get all complaints */
    @GetMapping
    public List<Complaint> all() {
        return repo.findAll();
    }

    /* ADMIN: resolve complaint */
    @PutMapping("/{id}/resolve")
    public void resolve(@PathVariable Long id) {
        Complaint c = repo.findById(id).orElseThrow();
        c.setStatus("RESOLVED");
        repo.save(c);
    }
}
