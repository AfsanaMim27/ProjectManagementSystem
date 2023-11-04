import { connectToDatabase, getPageNumberAndSize, getParamValue } from "@/app/api/services";

export async function GET(request, response) {
  let dbConnection = await connectToDatabase();
  const projectId = getParamValue(request, 'projectId', 'int');
  if (projectId && projectId > 0) {
    const [project, fields] = await dbConnection.execute("SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId WHERE p.ProjectId = " + projectId);
    const [phases, phaseFields] = await dbConnection.execute("SELECT ph.* FROM Phases AS ph INNER JOIN Projects AS p ON p.ProjectId = ph.ProjectId WHERE p.ProjectId = " + projectId + " ORDER BY ph.Weight;");    
    dbConnection.end();
    return Response.json({ project: project[0], phases: phases });    
  } else {
    const { page, size } = getPageNumberAndSize(request);
    const [rows, fields] = await dbConnection.execute("SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId LIMIT " + size + " OFFSET " + ((page - 1) * size));
    const [projectCounts, projectCountsFields] = await dbConnection.execute('SELECT COUNT(*) AS TotalProjects FROM Projects WHERE Trashed IS NULL OR Trashed = 0');
    dbConnection.end();
    return Response.json({ records: rows, pagination: { totalPages: Math.ceil(parseInt(projectCounts[0].TotalProjects) / size), totalItems: projectCounts[0].TotalProjects } });
  }  
}

export async function POST(request) {
  let submittedData = await request.formData();     
  let dbConnection = await connectToDatabase();
  const queryString = "INSERT INTO Projects (Trashed, ProjectStatus, Title, ShortDescription, StartDate, DueDate, ProjectManager) VALUES (0, 2, '" + submittedData.get("Title") + "', '" + submittedData.get("Description") + "', '" + submittedData.get("StartDate") + "', '" + submittedData.get("DueDate") + "', " + submittedData.get("ProjectManager") + ")";
  const result = await dbConnection.query(queryString);
  dbConnection.end();
  return Response.json({ "Id": result[0].insertId });
}