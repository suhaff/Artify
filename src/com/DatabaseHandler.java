package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class DatabaseHandler {

    public static Connection getConnection() throws Exception {

        String url = "jdbc:mysql://localhost:3306/artify";
        String user = "root";
        String pass = "";

        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, user, pass);
    }

    // CRUD Operations 
 
    // Adding artworks to a cart
    public static void addArtwork(int QUANTITY, int CART_ID, int ARTWORK_ID) {
        String sql = "INSERT INTO CART_ITEM(QUANTITY, CART_ID, ARTWORK_ID) VALUES (?, ?, ?)";

        // Prepared statement is a security measure, prevents SQL injection
        try (Connection con = DatabaseHandler.getConnection(); 
        PreparedStatement statement = con.prepareStatement(sql)){

            // Setting the values
            statement.setInt(1, QUANTITY);
            statement.setInt(2, CART_ID);
            statement.setInt(3, ARTWORK_ID);

            // Inserting records 
            int rows = statement.executeUpdate();
            System.out.print("Row" + rows + "has been inserted successfully.");
        
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    public static void main(String[] args) {
        addArtwork(2, 201, 1);
    }
}
