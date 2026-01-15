package com.artify.controller;

import com.artify.model.*;
import com.artify.repository.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderRepository orderRepo;

    public OrderController(OrderRepository orderRepo){
        this.orderRepo = orderRepo;
    }

    @PostMapping("/checkout")
    public Order checkout(@RequestBody Map<String,Object> payload){

        Order order = new Order();
        order.setUserId(Long.parseLong(payload.get("userId").toString()));
        order.setName(payload.get("name").toString());
        order.setEmail(payload.get("email").toString());
        order.setAddress(payload.get("address").toString());
        order.setTotal(Double.parseDouble(payload.get("total").toString()));
        order.setStatus("PROCESSING");

        List<Map<String,Object>> items =
                (List<Map<String,Object>>) payload.get("items");

        List<OrderItem> orderItems = new ArrayList<>();

        for(Map<String,Object> i : items){
            OrderItem item = new OrderItem();
            item.setTitle(i.get("title").toString());
            item.setImage(i.get("image").toString());
            item.setPrice(Double.parseDouble(i.get("price").toString()));
            item.setOrder(order);
            orderItems.add(item);
        }

        order.setItems(orderItems);

        return orderRepo.save(order);
    }

    @GetMapping("/my/{userId}")
    public List<Order> myOrders(@PathVariable Long userId){
        return orderRepo.findByUserId(userId);
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersForUser(@PathVariable Long userId) {
        return orderRepo.findByUserId(userId);
    }

}
