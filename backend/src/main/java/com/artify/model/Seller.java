package com.artify.model;

import jakarta.persistence.*;

@Entity
@Table(name="sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String shopName;
    private String taxId;
    private String status; // PENDING, APPROVED

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getShopName() { return shopName; }
    public String getTaxId() { return taxId; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public void setTaxId(String taxId) { this.taxId = taxId; }
    public void setStatus(String status) { this.status = status; }
}
