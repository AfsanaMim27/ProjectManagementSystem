import { connectToDatabase, getParamValue } from "@/app/api/services";
import moment from "moment";

const getDoughnutChartData = (workDone) => {
    const workDoneHrs = workDone ? parseInt(workDone) : 0;
    const workLeftHrs = 40 - workDoneHrs > -1 ? 40 - workDoneHrs : 0;
    const chartData = {
        labels: ['Work Left', 'Work Done'],
        datasets: [
            {
                label: ' Hours',
                data: [workLeftHrs, workDoneHrs],
                backgroundColor: [
                    'rgba(54, 240, 99, 0.2)',
                    'rgba(20, 240, 10, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 240, 99, 1)',
                    'rgba(20, 240, 10, 1)'
                ],
                borderWidth: 1,
            },
        ],
      };
    return chartData;
}

const getWeekStartAndEndDate = () => {
    let date_today = new Date();
    let weekStartDate = new Date(date_today.setDate(date_today.getDate() - date_today.getDay() ));
    let weekEndDate = new Date(date_today.setDate(date_today.getDate() - date_today.getDay() + 6));
    return { weekStartDate, weekEndDate };
}

export async function GET(request, response) {
    const contactId = getParamValue(request, 'contactId', 'int');
    const { weekStartDate, weekEndDate } = getWeekStartAndEndDate();
    let dbConnection = await connectToDatabase(); 
    const [rowsContactDetails, fields] = await dbConnection.execute("SELECT ContactId, FirstName, LastName, Phone, Email, Address, City FROM Contacts WHERE ContactId = " + contactId);
    const [hoursThisWeek, hoursThisWeekFields] = await dbConnection.execute("SELECT SUM(Duration) AS `HoursThisWeek` FROM Activities where WorkedBy =  " + contactId + " AND (WorkedDate between '" + moment(weekStartDate).format('YYYY-MM-DD') + "' AND '" + moment(weekEndDate).format('YYYY-MM-DD') + "')");
    const [projects, projectsFields] = await dbConnection.execute("SELECT pj.*, CONCAT(c.FirstName, ' ', c.LastName) AS ProjectManagerName FROM Projects AS pj INNER JOIN ProjectMembers AS pm ON pj.ProjectId = pm.ProjectId INNER JOIN Contacts AS c ON c.ContactId = pj.ProjectManager WHERE pm.MemberId = " + contactId);
    const [tasks, tasksFields] = await dbConnection.execute("SELECT t.TaskId, t.Title, t.ShortDescription, p.Title AS ProjectTitle, ph.Title AS PhaseTitle, t.DueDate, t.EstimatedDuration, s.Title AS TaskStatus, s.Color FROM Tasks AS t INNER JOIN Statuses AS s ON s.StatusId = t.TaskStatus INNER JOIN Projects AS p ON p.ProjectId = t.ProjectId INNER JOIN Phases AS ph ON ph.PhaseId = t.PhaseId  where t.AssignedTo = " + contactId);
    dbConnection.end();
    return Response.json({ Contact: rowsContactDetails[0], HoursThisWeek: getDoughnutChartData(hoursThisWeek[0].HoursThisWeek), Projects: projects, Tasks: tasks });
}