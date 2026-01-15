package com.artify.dto;

public class SellerStatsResponse {

    private int products;
    private int orders;
    private double revenue;
    private int reviews;

    public SellerStatsResponse(int products, int orders, double revenue, int reviews) {
        this.products = products;
        this.orders = orders;
        this.revenue = revenue;
        this.reviews = reviews;
    }

    public int getProducts() {
        return products;
    }

    public int getOrders() {
        return orders;
    }

    public double getRevenue() {
        return revenue;
    }

    public int getReviews() {
        return reviews;
    }
}
