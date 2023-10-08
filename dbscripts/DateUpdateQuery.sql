UPDATE tasks SET StartDate = DATE_ADD(StartDate, INTERVAL 80 DAY) WHERE StartDate IS NOT NULL AND TaskId  > 0;
UPDATE tasks SET DueDate = DATE_ADD(DueDate, INTERVAL 80 DAY) WHERE DueDate IS NOT NULL AND TaskId  > 0;
UPDATE tasks SET EndDate = DATE_ADD(EndDate, INTERVAL 80 DAY) WHERE EndDate IS NOT NULL AND TaskId  > 0;

UPDATE projects SET StartDate = DATE_ADD(StartDate, INTERVAL 80 DAY) WHERE StartDate IS NOT NULL AND ProjectId  > 0;
UPDATE projects SET DueDate = DATE_ADD(DueDate, INTERVAL 80 DAY) WHERE DueDate IS NOT NULL AND ProjectId  > 0;
UPDATE projects SET EndDate = DATE_ADD(EndDate, INTERVAL 80 DAY) WHERE EndDate IS NOT NULL AND ProjectId  > 0;

UPDATE phases SET StartDate = DATE_ADD(StartDate, INTERVAL 80 DAY) WHERE StartDate IS NOT NULL AND PhaseId  > 0;
UPDATE phases SET DueDate = DATE_ADD(DueDate, INTERVAL 80 DAY) WHERE DueDate IS NOT NULL AND PhaseId  > 0;

UPDATE activities SET WorkedDate = DATE_ADD(WorkedDate, INTERVAL 80 DAY) WHERE WorkedDate IS NOT NULL AND ActivityId  > 0;