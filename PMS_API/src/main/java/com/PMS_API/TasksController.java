package com.PMS_API;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TasksController extends DatabaseConnection implements ErrorLogging {

    @GetMapping("/list")
    public List<Task> taskList() {
        List<Task> taskList = new ArrayList<>();
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT CONCAT(c.FirstName, '', c.LastName) AS AssignedTo, t.TaskId, t.Title, t.ShortDescription, p.Title AS ProjectTitle, ph.Title AS PhaseTitle,t.StartDate, t.DueDate,t.EndDate, t.EstimatedDuration, s.Title AS TaskStatus, s.Color FROM Tasks AS t INNER JOIN Contacts as c ON c.ContactId = t.AssignedTo INNER JOIN Statuses AS s ON s.StatusId = t.TaskStatus INNER JOIN Projects AS p ON p.ProjectId = t.ProjectId INNER JOIN Phases AS ph ON ph.PhaseId = t.PhaseId WHERE t.Trashed = 0");
            while (resultSet.next()) {
                Task task = new Task();
                task.TaskId = resultSet.getInt("TaskId");
                task.TaskStatus = resultSet.getString("TaskStatus");
                task.Title = resultSet.getString("Title");
                task.ShortDescription = resultSet.getString("ShortDescription");
                task.StartDate = resultSet.getString("StartDate");
                task.DueDate = resultSet.getString("DueDate");
                task.EndDate = resultSet.getString("EndDate");
                task.EstimatedDuration = resultSet.getInt("EstimatedDuration");
                task.AssignedTo = resultSet.getString("AssignedTo");
                task.ProjectId = resultSet.getString("ProjectTitle");
                task.PhaseId = resultSet.getString("PhaseTitle");
                taskList.add(task);
            }
            resultSet.close();
            statement.close();
            dc.DbConnection.close();
        } catch (SQLException e) {
            logErrorFile("/api/tasks/", e.getMessage());
        }
        return taskList;
    }

    @GetMapping("/delete/{id}")
    public Boolean deleteTask(@PathVariable("id") int id) {
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            Boolean isTaskFound = false;
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Tasks WHERE TaskId = " + id);
            while (resultSet.next()) {
                int taskId = resultSet.getInt("TaskId");
                isTaskFound = taskId == id;
            }
            if (isTaskFound) {
                statement.executeUpdate("UPDATE Tasks SET Trashed = 1 WHERE TasktId = " + id);
                resultSet.close();
                statement.close();
                dc.DbConnection.close();
                return true;
            } else {
                resultSet.close();
                statement.close();
                dc.DbConnection.close();
                logErrorFile("/api/tasks/delete/" + id, "Task not found.");
            }
        } catch (SQLException e) {
            logErrorFile("/api/tasks/delete/" + id, e.getMessage());
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

class Task {
    public int TaskId;
    public String TaskStatus;
    public String Title;
    public String ShortDescription;
    public String StartDate;
    public String DueDate;
    public String EndDate;
    public int EstimatedDuration;
    public String AssignedTo;
    public String ProjectId;
    public String PhaseId;
}

