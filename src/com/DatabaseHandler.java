package com.artify;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseHandler {

    public static Connection getConnection() throws Exception {

        String url = "jdbc:mysql://localhost:3306/artify";
        String user = "root";
        String pass = "";

        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, user, pass);
    }
}
