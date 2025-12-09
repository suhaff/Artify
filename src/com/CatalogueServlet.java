package com.artify;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/CatalogueServlet")
public class CatalogueServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws IOException {

        // Placeholder response
        res.getWriter().println("Catalogue will load artworks dynamically (Friend 1 + Friend 2).");
    }
}
