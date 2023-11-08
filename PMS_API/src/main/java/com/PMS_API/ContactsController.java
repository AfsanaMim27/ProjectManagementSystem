package com.PMS_API;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactsController extends DatabaseConnection implements ErrorLogging {

    @GetMapping("/contacts")
    public List<Contact> contactList() {
        List<Contact> contactList = new ArrayList<>();
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Connection connection = dc.GetConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Contacts WHERE Trashed IS NULL OR Trashed = 0");
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
            connection.close();
        } catch (SQLException e) {
            logErrorFile("GET: /api/contacts", e.getMessage());
        }
        return contactList;
    }

    @DeleteMapping("/contacts/{id}")
    public Boolean deleteContact(@PathVariable("id") int id) {
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Connection connection = dc.GetConnection();
            Statement statement = connection.createStatement();
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
                connection.close();
                return true;
            } else {
                resultSet.close();
                statement.close();
                connection.close();
                logErrorFile("DELETE: /api/contacts" + id, "Contact not found.");
            }
        } catch (SQLException e) {
            logErrorFile("DELETE: /api/contacts" + id, e.getMessage());
        }
        return false;
    }

    public void logErrorFile(String url, String errorMessage) {
        ErrorLogging.StoreErrorInFile(url, errorMessage);
    }

    public void logErrorDB(String url, String errorMessage) {
        ErrorLogging.StoreErrorInDb(url, errorMessage);
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
