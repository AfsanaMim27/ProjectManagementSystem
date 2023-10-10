package com.PMS_API;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactsController extends DatabaseConnection {

    @GetMapping("/list")
    public List<Contact> list() {
        List<Contact> contactList = new ArrayList<>();
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            ResultSet resultSet = statement.executeQuery("Select * from contacts");
            while (resultSet.next()) {
                Contact contact = new Contact();
                contact.ContactId = resultSet.getInt("ContactId");
                contact.FirstName = resultSet.getString("FirstName");
                contact.LastName = resultSet.getString("LastName");
                contact.Address = resultSet.getString("Address");
                contact.City = resultSet.getString("City");
                contact.Phone = resultSet.getString("Phone");
                contact.Email = resultSet.getString("Email");
                contactList.add(contact);
            }
            resultSet.close();
            statement.close();
            dc.DbConnection.close();
        } catch (SQLException e) {
            System.out.println("Query execution fails.");
        }
        return contactList;
    }
}

class Contact {
    public int ContactId;
    public String FirstName;
    public String LastName;
    public String Address;
    public String City;
    public String Phone;
    public String Email;
}

class DatabaseConnection {
    public Connection DbConnection;
    DatabaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            DbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/projecttrackingsystem","root", "Pass5577!");
        }
        catch (ClassNotFoundException exception) {
            System.out.println("JDBC Driver is not found.");
        }
        catch (SQLException exception) {
            System.out.println("Database connection fails.");
        }
    }
}
