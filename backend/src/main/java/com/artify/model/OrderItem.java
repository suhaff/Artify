package com.artify.model;

import jakarta.persistence.*;

@Entity
@Table(name="order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String image;
    private double price;

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

    public Long getId(){ return id; }

    public String getTitle(){ return title; }
    public void setTitle(String title){ this.title = title; }

    public String getImage(){ return image; }
    public void setImage(String image){ this.image = image; }

    public double getPrice(){ return price; }
    public void setPrice(double price){ this.price = price; }

    public Order getOrder(){ return order; }
    public void setOrder(Order order){ this.order = order; }
}
