package com.PMS_API;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface ErrorLogging {
    public void logErrorFile(String url, String errorMessage);

    public void logErrorDB(String url, String errorMessage);

    public static String GetErrorLogFilePath() {
        String rootPath = "/Users/afsanamim/Github/Office/ProjectManagementSystem/PMS_API/";
        String filePath = rootPath + "ErrorLog.txt";
        return filePath;
    }

    public static void StoreErrorInFile(String url, String errorMessage) {
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

    public static void StoreErrorInDb(String url, String errorMessage){
                try {
            DatabaseConnection dc = new DatabaseConnection();
            Connection connection = dc.GetConnection();
            Statement statement = connection.createStatement();
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
            connection.close();
        } catch (Exception e) {
            System.out.println("Creating log fails. Url: " + url + ", Error message: " + e.getMessage());
        }
    }
}
