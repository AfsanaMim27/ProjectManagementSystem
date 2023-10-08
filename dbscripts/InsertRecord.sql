INSERT INTO Users (UserRole, UserName, UserPassword)
VALUES (2, 'rahman', 'rahman123')
,(2, 'abcDeveloper', 'abc123')
,(1, 'admin', 'admin123')
,(2, 'sarkar', 'sarkar123')
,(2, 'ahmed', 'ahmed123')
,(2, 'khan', 'khan123')
,(2, 'chowdhury', 'chowdhury123')
,(2, 'biswas', 'biswas123')
,(2, 'kabir', 'kabir123')
,(2, 'nayeem', 'nayeem123');

INSERT INTO Contacts (ContactType, LastName, FirstName, Address, City, Country, Phone, Email, UserId)
VALUES (1, 'Rahman', 'Aminul', '12 Gulshan Avenue', 'Dhaka', 'Bangladesh', '+8801712345678', 'aminul.rahman@example.com', 1)
,(2, '', 'ABC Developer Ltd.', '34 Motijheel Road', 'Chittagong', 'Bangladesh', '+8801812345678', 'nadia.islam@company.com', 2)
,(1, 'Hossain', 'Mizanur', '45 Dhanmondi Road', 'Rajshahi', 'Bangladesh', '+8801912345678', 'mizanur.hossain@example.com', 3)
,(1, 'Sarker', 'Sabina', '56 Uttara Avenue', 'Sylhet', 'Bangladesh', '+8801512345678', 'sabina.sarker@example.com', 4)
,(1, 'Ahmed', 'Mahmudul', '78 Mirpur Road', 'Khulna', 'Bangladesh', '+8801512345678', 'mahmudul.ahmed@example.com', 5)
,(1, 'Khan', 'Tasnim', '90 Jashore Avenue', 'Jessore', 'Bangladesh', '+8801612345678', 'tasnim@example.com', 6)
,(1, 'Chowdhury', 'Zahid', '112 Narayanganj Road', 'Narayanganj', 'Bangladesh', '+8801712345678', 'zahid.chowdhury@example.com', 7)
,(1, 'Biswas', 'Shirin', '135 Comilla Avenue, Apt 101, Building B, Unit 3, Floor 4', 'Comilla', 'Bangladesh', '+8801812345678', 'shirin.biswas@example.com', 8)
,(1, 'Kabir', 'Touhid', '145 Bogura Avenue', 'Bogura', 'Bangladesh', '+8801912345678', 'kabir@example.com', 9)
,(1, 'Nayeem', 'Muhammad', '158 Noakhali Road', 'Noakhali', 'Bangladesh', '+8801512345678', 'nasreen@example.com', 10);

INSERT INTO Statuses (DataModel, Title, Color)
VALUES (1, 'Not Planned', 'blue')
,(1, 'Ongoing', 'purple')
,(1, 'Review', 'yellow')
,(1, 'Done', 'green')
,(2, 'Open', 'blue')
,(2, 'In Progress', 'yellow')
,(2, 'Completed', 'green')
,(3, 'Planned', 'blue')
,(3, 'Active', 'yellow')
,(3, 'Closed', 'green');


INSERT INTO Projects (ProjectStatus, Title, ShortDescription, StartDate, DueDate, EndDate, ProjectManager)
VALUES (2, 'Product Launch - Mobile App', 'Prepare for the launch of our cutting-edge mobile app', '2023-08-01', '2024-09-30', NULL, 7)
,(2, 'Green Energy Initiative', 'Develop renewable energy solutions for a sustainable future.', '2023-09-25', '2023-10-25', NULL, 5)
,(3, 'Market Expansion Strategy', 'Create a plan to enter new markets and reach a broader customer base.', '2023-10-01', '2023-11-15', NULL, 5)
,(4, 'Employee Wellness Program', 'Implement a program to promote employee health and well-being.', '2023-09-15', '2023-10-15', '2023-10-12', 7)
,(1, 'Data Security Enhancement', 'Upgrade security measures to protect sensitive customer data.', '2023-07-20', NULL, NULL, 10);

INSERT INTO ProjectMembers (ProjectId, MemberId)
Values (1, 1)
,(1, 3)
,(1, 5)
,(1, 7)
,(1, 8)
,(2, 3)
,(2, 4)
,(2, 8)
,(2, 9)
,(2, 10)
,(3, 5)
,(3, 7)
,(4, 3)
,(4, 4);

INSERT INTO Phases (Title, Weight, StartDate, DueDate, ProjectId)
VALUES ('Requirements Gathering', 1, '2023-08-01', '2023-08-05', 1) 
,('Project Planning', 2, '2023-08-06', '2023-08-10', 1)
,('Design and Development', 3, '2023-08-11', '2023-12-31', 1)
,('Testing and Quality Assurance', 4, '2024-01-01', '2024-06-30', 1)
,('Deployment', 5, '2024-07-01', '2024-09-30', 1)
,('Planning and Assessment', 1, '2023-08-01', '2023-08-05', 2)
,('Policy and Regulation Development', 2, '2023-08-06', '2023-08-10', 2)
,('Technology Research and Development', 3, '2023-08-11', '2023-12-31', 2)
,('Infrastructure Development', 4, '2024-01-01', '2024-06-30', 2)
,('Public Awareness and Education', 5, '2024-07-01', '2024-09-30', 2)
,('Implementation and Deployment', 5, '2024-10-01', '2024-12-31', 2);

INSERT INTO Tasks (TaskStatus, Title, ShortDescription, StartDate, DueDate, EndDate, EstimatedDuration, AssignedTo, ProjectId, PhaseId)
VALUES (7, 'Stakeholder Identification and Analysis', 'Analyze their needs, expectations, and potential impact on the project.', '2023-08-01', '2023-08-03', '2023-08-03', 24, 3, 1, 1)
,(7, 'Documentation of Requirements', 'Record and document the gathered requirements systematically.', '2023-08-04', '2023-08-05', '2023-08-05', 8, 5, 1, 1)
,(7, 'Prioritization and Scope Definition', 'Work with stakeholders to prioritize requirements and define the project scope.', '2023-08-06', '2023-08-08', '2023-08-08', 24, 3, 1, 2)
,(7, 'Create app home page', 'Display app home page', '2023-08-11', '2023-08-20', '2023-09-09', 180, 3, 1, 3)
,(7, 'Create contact details page', 'Display contact information page', '2023-09-11', '2023-10-05', '2023-10-05', 180, 4, 1, 3)
,(2, 'Create contact add page', 'Contact add page', '2023-10-06', '2023-12-15', NULL, 300, 4, 1, 3)
,(2, 'Create project add page', 'Project add page', '2023-10-20', '2023-12-15', NULL, 300, 3, 1, 3)
,(2, 'Create project details page', 'Display project detials page', '2023-11-01', '2023-12-25', NULL, 300, 3, 1, 3)
,(2, 'Task assign', 'Allow user to assign a task', '2023-11-15', '2023-12-25', NULL, 300, 3, 1, 3);

INSERT INTO Activities (ActivityStatus, Title, ShortDescription, Duration, BillableTime, TaskId, WorkedDate, WorkedBy)
VALUES (10, 'Complete project requirement analysis', 'Analyze the needs and expection of the app', 4, 4, 1, '2023-08-01', 3)
,(10, 'Complete project requirement analysis - Day 2', 'Analyze the needs and expection of the app', 8, 8, 1, '2023-08-02', 3)
,(10, 'Complete project requirement analysis - Day 3', 'Analyze the needs and expection of the app', 6, 6, 1, '2023-08-03', 3)
,(10, 'Create Documentation of Requirements', 'Record and document the gathered requirements', 8, 8, 1, '2023-08-04', 5)
,(10, 'Create Documentation of Requirements - Day 2', 'Record and document the gathered requirements', 7, 7, 1, '2023-08-05', 5)
,(10, 'Prioritization and Scope Definition', 'Prioritize requirements and define the project scope', 8, 8, 1, '2023-08-06', 3)
,(10, 'Prioritization and Scope Definition- Day 1', 'Prioritize requirements and define the project scope', 8, 8, 1, '2023-08-07', 3)
,(10, 'Prioritization and Scope Definition - Day 2', 'Prioritize requirements and define the project scope', 8, 8, 1, '2023-08-08', 3)
,(8, 'Home Page - UI Design', 'Display app home page', 8, 8, 1, '2023-08-09', 3)
,(8, 'Home Page - Dashboard Design', 'Display app home page', 8, 8, 1, '2023-08-09', 3)
,(8, 'Home Page - Write Queries', 'Display app home page', 8, 8, 1, '2023-08-09', 3)
,(8, 'Home Page - Render Data', 'Display app home page', 8, 8, 1, '2023-08-09', 3)
,(8, 'Home Page - Fix issues', 'Display app home page', 8, 8, 1, '2023-08-09', 3)
,(8, 'Home Page - Fix UI issues', 'Display app home page', 8, 8, 1, '2023-08-09', 3);









