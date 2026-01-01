package com.artify;

import java.util.ArrayList;

public class Cart {

    private ArrayList<ArtItem> items = new ArrayList<>();

    public void addItem(ArtItem item) {
        items.add(item);
    }

    public void removeItem(int id) {
        items.removeIf(i -> i.getId() == id);
    }

    public double getTotalPrice() {
        return items.stream().mapToDouble(ArtItem::getPrice).sum();
    }

    public ArrayList<ArtItem> getItems() {
        return items;
    }
}
