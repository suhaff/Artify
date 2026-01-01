// Do not change this ~ Numaan Suhaff

package com.artify;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.*;
import java.time.LocalDateTime;

@WebServlet("/CheckoutServlet")
public class CheckoutServlet extends HttpServlet {

    // ============================================================
    //  NUMAAN SUHAFF – CHECKOUT BACKEND MODULE (DO NOT EDIT BY OTHERS)
    // ============================================================

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // -------------------------------
        // Retrieve checkout form data
        // (Numaan's responsibility)
        // -------------------------------
        String customerIdStr = request.getParameter("customer_id");   // hidden input from session
        String totalStr = request.getParameter("total_amount");       // cart total
        String[] artworkIds = request.getParameterValues("artwork_id");
        String[] quantities = request.getParameterValues("quantity");
        String[] prices = request.getParameterValues("price");

        if (customerIdStr == null || totalStr == null 
            || artworkIds == null || quantities == null) 
        {
            response.getWriter().println("Checkout data is missing.");
            return;
        }

        int customerId = Integer.parseInt(customerIdStr);
        double totalAmount = Double.parseDouble(totalStr);

        try {
            Connection conn = DatabaseHandler.getConnection();
            conn.setAutoCommit(false);  // Start transaction (Numaan requirement)

            // ============================
            // 1. INSERT INTO ORDERS TABLE
            // ============================
            String orderSQL = """
                INSERT INTO ORDERS (
                    ORDERS_AMOUNT, CUSTOMER_ID, ORDER_DATE, TOTAL_AMOUNT, SHIPPING_STATUS
                ) VALUES (?, ?, ?, ?, ?)
            """;

            PreparedStatement orderStmt = conn.prepareStatement(orderSQL, Statement.RETURN_GENERATED_KEYS);
            orderStmt.setDouble(1, totalAmount);
            orderStmt.setInt(2, customerId);
            orderStmt.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            orderStmt.setDouble(4, totalAmount);
            orderStmt.setString(5, "Pending");

            orderStmt.executeUpdate();

            // Get new ORDER_ID
            ResultSet rs = orderStmt.getGeneratedKeys();
            int orderId = 0;
            if (rs.next()) {
                orderId = rs.getInt(1);
            }

            // ================================
            // 2. INSERT INTO ORDER_DETAILS TABLE
            // ================================
            String detailsSQL = """
                INSERT INTO ORDERS_TABLE (
                    QUANTITY, PRICE, ORDERS_ID, ARTWORK_ID
                ) VALUES (?, ?, ?, ?)
            """;

            PreparedStatement detailsStmt = conn.prepareStatement(detailsSQL);

            for (int i = 0; i < artworkIds.length; i++) {
                int artId = Integer.parseInt(artworkIds[i]);
                int qty = Integer.parseInt(quantities[i]);
                double price = Double.parseDouble(prices[i]);

                detailsStmt.setInt(1, qty);
                detailsStmt.setDouble(2, price);
                detailsStmt.setInt(3, orderId);
                detailsStmt.setInt(4, artId);

                detailsStmt.addBatch();
            }

            detailsStmt.executeBatch();

            // Commit transaction
            conn.commit();

            // Redirect to success page
            response.sendRedirect("success.html");

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("Checkout Failed! Error: " + e.getMessage());
        }
    }
}
