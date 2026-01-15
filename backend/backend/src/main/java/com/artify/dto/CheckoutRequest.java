package com.artify.controller;

import java.util.List;

public record CheckoutRequest(
        Long userId,
        String name,
        String email,
        String address,
        double total,
        List<CartItem> items
) {}
