package com.artify.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private String address;
    private String phone;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role; // BUYER, SELLER, ADMIN

    private boolean sellerRequest;

    // Seller fields
    private String shopName;
    private String taxId;

    // ===== GETTERS =====
    public Long getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getAddress() { return address; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public boolean isSellerRequest() { return sellerRequest; }
    public String getShopName() { return shopName; }
    public String getTaxId() { return taxId; }

    // ===== SETTERS =====
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setAddress(String address) { this.address = address; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setSellerRequest(boolean sellerRequest) { this.sellerRequest = sellerRequest; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public void setTaxId(String taxId) { this.taxId = taxId; }
}
