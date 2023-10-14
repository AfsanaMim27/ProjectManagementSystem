package com.PMS_API;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("/api/contacts")
public class ContactsController extends DatabaseConnection implements ErrorLogging {

    @GetMapping("/list")
    public List<Contact> contactList() {
        List<Contact> contactList = new ArrayList<>();
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Contacts WHERE Trashed = 0");
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
            logError("/api/contacts/", e.getMessage());
        }
        return contactList;
    }

    @GetMapping("/delete/{id}")
    public Boolean deleteContact(@PathVariable("id") int id) {
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            Boolean isContactFound = false;
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Contacts WHERE ContactId = " + id);
            while (resultSet.next()) {
                int contactId = resultSet.getInt("ContactId");
                isContactFound = contactId == id;
            }
            if (isContactFound) {
                statement.executeUpdate("UPDATE Contacts SET Trashed = 1 WHERE ContactId = " + id);
                resultSet.close();
                statement.close();
                dc.DbConnection.close();
                return true;
            } else {
                logError("/api/contacts/delete/" + id, "Contact not found.");
            }
        } catch (SQLException e) {
            logError("/api/contacts/delete/" + id, e.getMessage());
        }
        return false;
    }

    public void logError(String url, String errorMessage) {
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            Date currentDateTime = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd hh:mm");
            String currentDateTimeString = formatter.format(currentDateTime);
            try {
                statement.executeUpdate("INSERT INTO ErrorLogs (CreatedDateTime, Url, ErrorMessage) VALUES ('"
                        + currentDateTimeString + "', '" + url + "', '" + errorMessage + "')");
            } catch (SQLException e) {
                System.out.println(
                        "Storing log record in database fails. Url: " + url + ", Error message: " + e.getMessage());
            }
            statement.close();
            dc.DbConnection.close();
        } catch (Exception e) {
            System.out.println("Creating log fails. Url: " + url + ", Error message: " + e.getMessage());
        }
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

interface ErrorLogging {
    public void logError(String url, String errorMessage);
}

class DatabaseConnection {
    public Connection DbConnection;

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
