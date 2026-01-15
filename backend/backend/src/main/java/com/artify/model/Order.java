package com.artify.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String email;
    private String address;
    private double total;
    private String status = "PROCESSING";

    @OneToMany(mappedBy="order", cascade=CascadeType.ALL)
    private List<OrderItem> items;

    // ===== GETTERS & SETTERS =====

    public Long getId(){ return id; }

    public Long getUserId(){ return userId; }
    public void setUserId(Long userId){ this.userId = userId; }

    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }

    public double getTotal(){ return total; }
    public void setTotal(double total){ this.total = total; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }

    public List<OrderItem> getItems(){ return items; }
    public void setItems(List<OrderItem> items){ this.items = items; }
}
