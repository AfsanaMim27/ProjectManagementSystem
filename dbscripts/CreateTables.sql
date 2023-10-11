ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pass5577!';

CREATE DATABASE IF NOT EXISTS ProjectTrackingSystem;

USE ProjectTrackingSystem;

CREATE TABLE Users(
	UserId int NOT NULL AUTO_INCREMENT,
    Trashed bool,
    UserRole int,
    UserName varchar(128),
    UserPassword varchar(512),
    CONSTRAINT PK_User PRIMARY KEY (UserId)
 );
 
CREATE TABLE Contacts (
    ContactId int NOT NULL AUTO_INCREMENT,
    Trashed bool,
    ContactType int,
    LastName varchar(128),
    FirstName varchar(128),
    Address varchar(128),
    City varchar(128),
    Country varchar(128),
    Phone varchar(128),
    Email varchar(128),
    UserId int,
    CONSTRAINT PK_Contact PRIMARY KEY (ContactId),
    CONSTRAINT FK_ContactUser FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
 
 CREATE TABLE Statuses(
	StatusId int NOT NULL AUTO_INCREMENT,
    DataModel int,
    Title varchar(128),
    Color nvarchar(64),
    CONSTRAINT PK_Statuse PRIMARY KEY (StatusId)
);
 
 CREATE TABLE Projects(
	ProjectId int NOT NULL AUTO_INCREMENT,
	Trashed bool,
	ProjectStatus int,
    Title varchar(128),
    ShortDescription varchar(1024),
    StartDate datetime,
    DueDate datetime,
    EndDate datetime,
    ProjectManager int,
    CONSTRAINT PK_Project PRIMARY KEY (ProjectId),
    CONSTRAINT FK_ProjectContact FOREIGN KEY (ProjectManager) REFERENCES Contacts(ContactId),
    CONSTRAINT FK_ProjectStatus FOREIGN KEY (ProjectStatus) REFERENCES Statuses(StatusId)
);

  CREATE TABLE Phases(
	PhaseId int NOT NULL AUTO_INCREMENT,
    Trashed bool,
    Title varchar(128),
    Weight int,
    StartDate datetime,
    DueDate datetime,
    ProjectId int,
    CONSTRAINT PK_Phase PRIMARY KEY (PhaseId),
    CONSTRAINT FK_PhaseProject FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId)
 );
 
  CREATE TABLE Tasks(
	TaskId int NOT NULL AUTO_INCREMENT,
    Trashed bool,
    TaskStatus int,
    Title varchar(128),
    ShortDescription varchar(1024),
    StartDate datetime,
    DueDate datetime,
    EndDate datetime,
    EstimatedDuration int,
    AssignedTo int,
    ProjectId int,
    PhaseId int,
    CONSTRAINT PK_Task PRIMARY KEY (TaskId),
	CONSTRAINT FK_TaskContact FOREIGN KEY (AssignedTo) REFERENCES Contacts(ContactId),
    CONSTRAINT FK_TaskPhase FOREIGN KEY (PhaseId) REFERENCES Phases(PhaseId),
    CONSTRAINT FK_TaskProject FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
	CONSTRAINT FK_TaskStatus FOREIGN KEY (TaskStatus) REFERENCES Statuses(StatusId)
 );
 
 CREATE TABLE Activities(
	ActivityId int NOT NULL AUTO_INCREMENT,
    ActivityStatus int,
    Title varchar(128),
    ShortDescription varchar(1024),    
    Duration int,
    BillableTime int,
    WorkedDate datetime,
    TaskId int,
	WorkedBy int,    
    CONSTRAINT PK_Activity PRIMARY KEY (ActivityId),
    CONSTRAINT FK_ActivityContact FOREIGN KEY (WorkedBy) REFERENCES Contacts(ContactId),
    CONSTRAINT FK_ActivityTask FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
	CONSTRAINT FK_ActivityStatus FOREIGN KEY (ActivityStatus) REFERENCES Statuses(StatusId)
 );
 
 CREATE TABLE Comments(
	CommentId int NOT NULL AUTO_INCREMENT,
    CommentedBy int,
    CommentDescription varchar(1024),
    RecordId int,
    RecordType int,
    CONSTRAINT PK_Comment PRIMARY KEY (CommentId),
	CONSTRAINT FK_CommentContact FOREIGN KEY (CommentedBy) REFERENCES Contacts(ContactId)
);

CREATE TABLE Documents(
	DocumentId int NOT NULL AUTO_INCREMENT,
	RecordId int,
    RecordType int,
    Title varchar(256),
    UploadedBy int,
    CONSTRAINT PK_Document PRIMARY KEY (DocumentId),
    CONSTRAINT FK_DocumentContact FOREIGN KEY (UploadedBy) REFERENCES Contacts(ContactId)
);

CREATE TABLE ProjectMembers(
	ProjectId int NOT NULL AUTO_INCREMENT,
    MemberId int,
    CONSTRAINT PK_ProjectMember PRIMARY KEY (ProjectId, MemberId),
    CONSTRAINT FK_ProjectMemberProject FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    CONSTRAINT FK_ProjectMemberContact FOREIGN KEY (MemberId) REFERENCES Contacts(ContactId)
);

CREATE TABLE ErrorLogs(
	LogId int not null auto_increment,
    CreatedDateTime datetime,
    Url varchar(512),
	ErrorMessage varchar(1024),
    CONSTRAINT PK_ErrorLog PRIMARY KEY (LogId)
);
