import { connectToDatabase, getPageNumberAndSize, getParamValue } from "@/app/api/services";

export async function GET(request, response) {
  let dbConnection = await connectToDatabase();
  const taskId = getParamValue(request, 'taskId', 'int');
  const { page, size } = getPageNumberAndSize(request);
  const [activities, activitiesFields] = await dbConnection.execute("SELECT a.Title, a.ShortDescription, a.Duration, a.WorkedDate, t.Title as Task, CONCAT(c.FirstName, ' ', c.LastName) AS WorkedByName , s.Title as ActivityStatus, s.Color FROM Activities AS a INNER JOIN Statuses AS s ON s.StatusId = a.ActivityStatus INNER JOIN Tasks AS t ON t.TaskId = a.TaskId INNER JOIN contacts AS c ON a.WorkedBy = c.ContactId " + (taskId ? ("WHERE a.TaskId = " + taskId) : "") + " LIMIT " + size + " OFFSET " + ((page - 1) * size));
  const [activityCounts, projectCountsFields] = await dbConnection.execute("SELECT COUNT(*) AS TotalActivities FROM Activities");
  dbConnection.end();
  return Response.json({ records: activities, pagination: { totalPages: Math.ceil(parseInt(activityCounts[0].TotalActivities) / size), totalItems: activityCounts[0].TotalActivities } });
}

export async function POST(request) {
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "INSERT INTO Activities (ActivityStatus, Title, ShortDescription, WorkedDate, Duration, WorkedBy, TaskId) VALUES ( 8, '" + submittedData.get("Title") + "', '" + submittedData.get("Description") + "', '" + submittedData.get("WorkedDate") + "', " + submittedData.get("Duration") + ", " + submittedData.get("WorkedBy") + ", " + submittedData.get("TaskId") + ")";
  const result = await dbConnection.query(queryString);
  dbConnection.end();
  return Response.json({ "Id": result[0].insertId });
}