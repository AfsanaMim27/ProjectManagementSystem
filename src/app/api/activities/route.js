import { connectToDatabase, getPageNumberAndSize, getParamValue } from "@/app/api/services";

export async function GET(request, response) {
  let dbConnection = await connectToDatabase();
  const taskId = getParamValue(request, 'taskId', 'int');
  const { page, size } = getPageNumberAndSize(request);
  const [activities, activitiesFields] = await dbConnection.execute("SELECT a.Title, a.ShortDescription, a.Duration, a.WorkedDate, t.Title as Task, CONCAT(c.FirstName, ' ', c.LastName) AS WorkedByName , s.Title as ActivityStatus, s.Color FROM Activities AS a INNER JOIN Statuses AS s ON s.StatusId = a.ActivityStatus INNER JOIN Tasks AS t ON t.TaskId = a.TaskId INNER JOIN contacts AS c ON a.WorkedBy = c.ContactId " + (taskId ? ("WHERE a.TaskId = " + taskId) : "") + " LIMIT " + size + " OFFSET " + ((page - 1) * size));
  const [activityCounts, projectCountsFields] = await dbConnection.execute("SELECT COUNT(*) AS TotalActivities FROM Tasks WHERE Trashed = 0 " + (taskId ? ("AND TaskId = " + taskId) : ""));
  dbConnection.end();
  return Response.json({ records: activities, pagination: { totalPages: Math.ceil(parseInt(activityCounts[0].TotalActivities) / size), totalItems: activityCounts[0].TotalActivities } });
}

export async function POST(request) {
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "INSERT INTO Tasks (Trashed, TaskStatus, Title, ShortDescription, StartDate, DueDate, EstimatedDuration, AssignedTo, ProjectId, PhaseId) VALUES (0, 5, '" + submittedData.get("Title") + "', '" + submittedData.get("Description") + "', '" + submittedData.get("StartDate") + "', '" + submittedData.get("DueDate") + "', " + submittedData.get("EstimatedDuration") + ", " + submittedData.get("AssignedTo") + ", " + submittedData.get("ProjectId") + ", " + submittedData.get("PhaseId") + ")";
  const result = await dbConnection.query(queryString);
  dbConnection.end();
  return Response.json({ "Id": result[0].insertId });
}