import { connectToDatabase, getPageNumberAndSize, getParamValue } from "@/app/api/services";

export async function GET(request, response) {
  let dbConnection = await connectToDatabase();
  const projectId = getParamValue(request, 'projectId', 'int');
  if (projectId && projectId > 0) {
    const [project, fields] = await dbConnection.execute("SELECT * FROM Projects WHERE ProjectId = " + projectId);
    return Response.json({ project: project[0] });    
  } else {
    const { page, size } = getPageNumberAndSize(request);
    const [rows, fields] = await dbConnection.execute("SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId LIMIT " + size + " OFFSET " + ((page - 1) * size));
    const [projectCounts, projectCountsFields] = await dbConnection.execute('SELECT COUNT(*) AS TotalProjects FROM Projects');
    return Response.json({ records: rows, pagination: { totalPages: Math.ceil(parseInt(projectCounts[0].TotalProjects) / size), totalItems: projectCounts[0].TotalProjects } });
  }  
}

export async function POST(request) {
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "INSERT INTO Projects (ProjectStatus, Title, ShortDescription, StartDate, DueDate, ProjectManager) VALUES (2, '" + submittedData.get("Title") + "', '" + submittedData.get("Description") + "', '" + submittedData.get("StartDate") + "', '" + submittedData.get("DueDate") + "', " + submittedData.get("ProjectManager") + ")";
  const result = await dbConnection.query(queryString);
  return Response.json({ "Id": result[0].insertId });
}