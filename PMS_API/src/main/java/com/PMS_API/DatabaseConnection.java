package com.PMS_API;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private Connection DbConnection;
 
    public Connection GetConnection()
    {
        return this.DbConnection;
    }
    
    DatabaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            DbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projecttrackingsystem", "root",
                    "Pass5577!");
        } catch (ClassNotFoundException exception) {
            System.out.println("JDBC Driver is not found.");
        } catch (SQLException exception) {
            System.out.println("Database connection fails.");
        }
    }
}
