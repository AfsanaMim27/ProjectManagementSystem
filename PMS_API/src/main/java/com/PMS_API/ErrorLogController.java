package com.PMS_API;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api")
public class ErrorLogController {
    @GetMapping("/errorLogs")
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
    
}
