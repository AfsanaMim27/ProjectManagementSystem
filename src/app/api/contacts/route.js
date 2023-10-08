import { connectToDatabase, getPageNumberAndSize } from "@/app/api/services";

export async function GET(request, response) {
    const { page, size } = getPageNumberAndSize(request);
    let dbConnection = await connectToDatabase(); 
    const [rows, fields] = await dbConnection.execute('SELECT ContactId, FirstName, LastName, Phone, Email, Address, City FROM Contacts ORDER BY FirstName LIMIT ' + size + ' OFFSET ' + ((page - 1) * size));
    const [contactTypeCounts, contactTypeCountsFields] = await dbConnection.execute('SELECT COUNT(*) AS TotalContacts, SUM(CASE WHEN ContactType = 1 THEN 1 ELSE 0 END) AS PersonCount, SUM(CASE WHEN ContactType = 2 THEN 1 ELSE 0 END) AS CompaniesCount FROM Contacts');
    return Response.json({ records: rows, pagination: {totalPages: Math.ceil(parseInt(contactTypeCounts[0].TotalContacts)/size), totalItems: contactTypeCounts[0].TotalContacts}, contactTypeCounts: contactTypeCounts[0] });    
}