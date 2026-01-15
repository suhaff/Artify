package com.artify.dto;

public class SellerRequest {

    private String shopName;
    private String taxId;

    // ✅ Required empty constructor
    public SellerRequest() {}

    // ✅ Optional constructor
    public SellerRequest(String shopName, String taxId) {
        this.shopName = shopName;
        this.taxId = taxId;
    }

    // ✅ GETTERS (THIS WAS MISSING)
    public String getShopName() {
        return shopName;
    }

    public String getTaxId() {
        return taxId;
    }

    // ✅ SETTERS
    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }
}
