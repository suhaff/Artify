package com.artify.controller;

import com.artify.model.*;
import com.artify.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository itemRepo;

    @PostMapping("/checkout")
    public Order checkout(@RequestBody Map<String, Object> payload) {

        Long userId = Long.valueOf(payload.get("userId").toString());
        User user = userRepo.findById(userId).orElseThrow();

        Order order = new Order();
        order.setUser(user);
        order.setBuyerName(payload.get("name").toString());
        order.setEmail(payload.get("email").toString());
        order.setAddress(payload.get("address").toString());
        order.setTotal(Double.parseDouble(payload.get("total").toString()));

        order = orderRepo.save(order);

        var items = (ArrayList<Map<String,Object>>) payload.get("items");

        for (var i : items) {
            OrderItem item = new OrderItem();
            item.setArtworkTitle(i.get("title").toString());
            item.setImage(i.get("image").toString());
            item.setPrice(Double.parseDouble(i.get("price").toString()));
            item.setOrder(order);
            itemRepo.save(item);
        }

        return order;
    }
}
