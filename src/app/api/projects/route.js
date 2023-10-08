import { connectToDatabase, getPageNumberAndSize } from "@/app/api/services";

export async function GET(request, response) {
    const { page, size } = getPageNumberAndSize(request);
    let dbConnection = await connectToDatabase(); 
    const [rows, fields] = await dbConnection.execute("SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId LIMIT " + size + " OFFSET " + ((page - 1) * size));
    const [projectCounts, projectCountsFields] = await dbConnection.execute('SELECT COUNT(*) AS TotalProjects');
    return Response.json({ records: rows, pagination: {totalPages: Math.ceil(parseInt(projectCounts[0].TotalProjects)/size), totalItems: projectCounts[0].TotalProjects} });    
}