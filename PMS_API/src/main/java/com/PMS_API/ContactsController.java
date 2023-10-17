package com.PMS_API;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import jakarta.servlet.ServletContext;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.io.File;
import java.io.FileWriter;

@RestController
@RequestMapping("/api/contacts")
public class ContactsController extends DatabaseConnection implements ErrorLogging {

    @GetMapping("/list")
    public List<Contact> contactList() {
        List<Contact> contactList = new ArrayList<>();
        try {
            logErrorFile("/api/contacts/", "request started");
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
            logErrorFile("/api/contacts/", e.getMessage());
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
                logErrorFile("/api/contacts/delete/" + id, "Contact not found.");
            }
        } catch (SQLException e) {
            logErrorFile("/api/contacts/delete/" + id, e.getMessage());
        }
        return false;
    }

    @GetMapping("/error_logs")
    public String error_logs() {
        try {
            Path filePath = Paths.get(ErrorLogging.GetErrorLogFilePath());
            String fileContent = Files.readString(filePath);
            return fileContent;
        } catch (IOException e) {
            System.out.println("An unexpected error is occurred when errors are retrieved.");
            return "No errors found";
        }
    }

    public void logErrorFile(String url, String errorMessage) {
        try {
            String filePath = ErrorLogging.GetErrorLogFilePath();
            File logFile = new File(filePath);
            if (!(logFile.exists())) {
                boolean isFileCreated = logFile.createNewFile();
                System.out.println(isFileCreated ? (filePath + " file is created successfully.") : (filePath + " file create fails."));
            }
            StringBuilder sb = new StringBuilder();
            sb.append("{");
            sb.append("\nUrl: ").append(url);
            sb.append("\nError: ").append(errorMessage);
            sb.append("\n},\n");
            Files.write(Paths.get(filePath), sb.toString().getBytes(), StandardOpenOption.APPEND);
        } catch (IOException exception) {
            System.out.println("An unexpected error is occurred when error is logged.");
        }
    }

    public void logErrorDB(String url, String errorMessage) {
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
    public static String GetErrorLogFilePath() {
        String rootPath = "C:/ProjectManagementSystem/PMS_API/";
        String filePath = rootPath + "ErrorLog.txt";
        return filePath;
    }

    public void logErrorFile(String url, String errorMessage);

    public void logErrorDB(String url, String errorMessage);
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
