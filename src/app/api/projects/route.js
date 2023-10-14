import { connectToDatabase, getPageNumberAndSize } from "@/app/api/services";

export async function GET(request, response) {
    const { page, size } = getPageNumberAndSize(request);
    let dbConnection = await connectToDatabase();
    const [rows, fields] = await dbConnection.execute("SELECT p.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM projects AS p INNER JOIN contacts AS c ON p.ProjectManager = c.ContactId LIMIT " + size + " OFFSET " + ((page - 1) * size));
    const [projectCounts, projectCountsFields] = await dbConnection.execute('SELECT COUNT(*) AS TotalProjects FROM Projects');
    console.log(projectCounts);
    return Response.json({ records: rows, pagination: { totalPages: Math.ceil(parseInt(projectCounts[0].TotalProjects) / size), totalItems: projectCounts[0].TotalProjects } });
}

export async function POST(request, response) {
    const submittedData = request.body;
    console.log("submittedData:", submittedData.Title);

    let dbConnection = await connectToDatabase();
    const queryString = "INSERT INTO Projects (ProjectStatus, Title, ShortDescription, StartDate, DueDate, EndDate, ProjectManager) VALUES (2, " + submittedData.Title + ", " + submittedData.Description + ", " + submittedData.StartDate + ", " + submittedData.DueDate + ", " + submittedData.ProjectManager + ")";
    dbConnection.query(queryString, (error, results) => {
        if (error) return res.json({ error: error });
        console.log(results);
        res.status(200).json({ results });
    }); 
}