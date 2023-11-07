package com.PMS_API;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectsController extends DatabaseConnection implements ErrorLogging {
    @GetMapping("/projects")
    public List<Project> projectList() {
        List<Project> projectList = new ArrayList<>();
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            ResultSet resultSet = statement.executeQuery(
                    "SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId where p.Trashed IS NULL OR p.Trashed = 0");
            while (resultSet.next()) {
                Project project = new Project();
                project.ProjectId = resultSet.getInt("ProjectId");
                project.Title = resultSet.getString("Title");
                project.ShortDescription = resultSet.getString("ShortDescription");
                project.StartDate = resultSet.getString("StartDate");
                project.EndDate = resultSet.getString("EndDate");
                project.DueDate = resultSet.getString("DueDate");
                project.ProjectManager = resultSet.getString("ProjectManagerName");
                projectList.add(project);
            }
            resultSet.close();
            statement.close();
            dc.DbConnection.close();
        } catch (SQLException e) {
            logErrorFile("GET: /api/projects", e.getMessage());
        }
        return projectList;
    }

    @PostMapping("/projects")
    Project createProject(@RequestBody Project newProject) {
        String insertQuery = "INSERT INTO Projects (Trashed, ProjectStatus, Title, ShortDescription, StartDate, DueDate, ProjectManager) VALUES (0, 2, '"
                + newProject.Title + "', '" + newProject.ShortDescription + "', '" + newProject.StartDate + "', '"
                + newProject.DueDate + "', " + newProject.ProjectManager + ")";
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            int result = statement.executeUpdate(insertQuery);
            newProject.ProjectId = result;
            return newProject;
        } catch (SQLException e) {
            logErrorFile("POST: /api/projects", e.getMessage());
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "entity not found");
    }

    @DeleteMapping("/projects")
    public Boolean deleteProject(@PathVariable("id") int id) {
        try {
            DatabaseConnection dc = new DatabaseConnection();
            Statement statement = dc.DbConnection.createStatement();
            Boolean isProjectFound = false;
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Projects WHERE ProjectId = " + id);
            while (resultSet.next()) {
                int projectId = resultSet.getInt("ProjectId");
                isProjectFound = projectId == id;
            }
            if (isProjectFound) {
                statement.executeUpdate("UPDATE Projects SET Trashed = 1 WHERE ProjectId = " + id);
                resultSet.close();
                statement.close();
                dc.DbConnection.close();
                return true;
            } else {
                resultSet.close();
                statement.close();
                dc.DbConnection.close();
                logErrorFile("DELETE: /api/projects/" + id, "Project not found.");
            }
        } catch (SQLException e) {
            logErrorFile("DELETE: /api/projects/" + id, e.getMessage());
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

class Project {
    public int ProjectId;
    public String Title;
    public String ShortDescription;
    public String StartDate;
    public String EndDate;
    public String DueDate;
    public String ProjectManager;
}
