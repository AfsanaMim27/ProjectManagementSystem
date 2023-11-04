import { connectToDatabase, getPageNumberAndSize, getParamValue } from "@/app/api/services";

export async function GET(request, response) {
  let dbConnection = await connectToDatabase();
  const taskId = getParamValue(request, 'taskId', 'int');
  if (taskId && taskId > 0) {
    const [tasks, tasksFields] = await dbConnection.execute("SELECT * FROM Tasks WHERE TaskId = "+ taskId);
    const [taskStatuses, taskStatusesFields] = await dbConnection.execute("SELECT * FROM Statuses WHERE DataModel = 2");
    dbConnection.end();
    return Response.json({ task: tasks && tasks.length > 0 ? tasks[0] : {}, taskStatuses: taskStatuses });
  } else {
    const projectId = getParamValue(request, 'projectId', 'int');
    const { page, size } = getPageNumberAndSize(request);
    const [tasks, tasksFields] = await dbConnection.execute("SELECT t.TaskId, t.Title, t.ShortDescription, p.Title AS ProjectTitle, ph.Title AS PhaseTitle, t.StartDate, t.DueDate, t.EndDate, t.EstimatedDuration, s.Title AS TaskStatus, s.Color FROM Tasks AS t INNER JOIN Statuses AS s ON s.StatusId = t.TaskStatus INNER JOIN Projects AS p ON p.ProjectId = t.ProjectId LEFT JOIN Phases AS ph ON ph.PhaseId = t.PhaseId " + (projectId ? ("WHERE p.ProjectId = " + projectId) : "") + " LIMIT " + size + " OFFSET " + ((page - 1) * size));
    const [taskCounts, projectCountsFields] = await dbConnection.execute("SELECT COUNT(*) AS TotalTasks FROM Tasks WHERE Trashed IS NULL OR Trashed = 0 " + (projectId ? ("AND ProjectId = " + projectId) : ""));
    dbConnection.end();
    return Response.json({ records: tasks, pagination: { totalPages: Math.ceil(parseInt(taskCounts[0].TotalTasks) / size), totalItems: taskCounts[0].TotalTasks } });
  }
}

export async function POST(request) {
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "INSERT INTO Tasks (Trashed, TaskStatus, Title, ShortDescription, StartDate, DueDate, EstimatedDuration, AssignedTo, ProjectId, PhaseId) VALUES (0, 5, '" + submittedData.get("Title") + "', '" + submittedData.get("Description") + "', '" + submittedData.get("StartDate") + "', '" + submittedData.get("DueDate") + "', " + submittedData.get("EstimatedDuration") + ", " + submittedData.get("AssignedTo") + ", " + submittedData.get("ProjectId") + ", " + submittedData.get("PhaseId") + ")";
  const result = await dbConnection.query(queryString);
  dbConnection.end();
  return Response.json({ "Id": result[0].insertId });
}

export async function PUT(request) {
  const taskId = getParamValue(request, 'taskId', 'int');
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "UPDATE Tasks SET TaskStatus = " + submittedData.get("TaskStatus") + ", Title = '" + submittedData.get("Title") + "', ShortDescription = '" + submittedData.get("Description") + "', StartDate = '" + submittedData.get("StartDate") + "', DueDate = '" + submittedData.get("DueDate") + "', EndDate = '" + submittedData.get("EndDate") + "', EstimatedDuration = " + submittedData.get("EstimatedDuration") + ", AssignedTo = " + submittedData.get("AssignedTo") + ", ProjectId = "+ submittedData.get("ProjectId") + ", PhaseId = " + submittedData.get("PhaseId") + " WHERE TaskId = " + taskId;
  const result = await dbConnection.query(queryString);
  dbConnection.end();
  return Response.json({ "isUpdated": result[0].affectedRows == 1 });
}