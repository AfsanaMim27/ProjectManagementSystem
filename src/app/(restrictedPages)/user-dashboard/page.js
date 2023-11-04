"use client"
import moment from 'moment/moment';
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { DoughnutChart } from '../../components/charts/doughnutChart';
import Loading from '../../components/loading';
import { useSession } from "next-auth/react";

export default function ProjectList(props) {
  const { data } = useSession();
  const [userDashboard, setUserDashboard] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let { id } = props.searchParams;
  if (!id && data) {
    id = data.user.contactId;
  }
  useEffect(() => {
    fetch('/api/userDashboard?contactId='+ id)
      .then((res) => { return res.json() })
      .then((data) => {
        setUserDashboard(data);
        setLoading(false);
      })
  }, [id])
 
  if (isLoading) return <Loading></Loading>
  if (!userDashboard) return <p>No contact details found</p>
  return (
    <div className='container'>
      <Row>
        <Col md="7">
          <div className='card-title h6 mb-3'>Contact Details</div>
          <div>
            <div>{ userDashboard.Contact.FirstName + ' ' +  userDashboard.Contact.LastName }</div>
            <div>{ userDashboard.Contact.Phone }</div>
            <div>{ userDashboard.Contact.Email }</div>
            <div>{ userDashboard.Contact.Address + ', ' + userDashboard.Contact.City }</div>
          </div>
        </Col>
        <Col md="5">
          <div className='card-title h6 mb-3'>Hours this week</div>
          <div style={{ width: "250px" }}><DoughnutChart chartData={userDashboard.HoursThisWeek}></DoughnutChart></div>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <div className='card-title h6 mt-4 mb-3'>My Projects</div>
          <div>
            <table className='table table-light table-hover table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Manager</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {userDashboard.Projects ? userDashboard.Projects.map((project) => {
                  return (
                    <tr key={project.ProjectId}>
                      <td>{project.Title}</td>
                      <td>{project.ShortDescription}</td>
                      <td>{project.ProjectManagerName}</td>
                      <td>{project.StartDate ? moment(project.StartDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{project.DueDate ? moment(project.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                    </tr>
                  );
                }): null}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      <Row>
      <Col md="12">
          <div className='card-title h6 mt-4 mb-3'>My Tasks</div>
          <div>
          <table className='table table-light table-hover table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Project</th>
                  <th>Phase</th>
                  <th>Due Date</th>
                  <th>Estimated</th>
                  <th width="10%">Status</th>
                </tr>
              </thead>
              <tbody>
                {userDashboard.Tasks ? userDashboard.Tasks.map((task) => {
                  return (
                    <tr key={task.TaskId}>
                      <td>{task.Title}</td>
                      <td>{task.ShortDescription}</td>
                      <td>{task.ProjectTitle}</td>
                      <td>{task.PhaseTitle}</td>
                      <td>{task.DueDate ? moment(task.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{task.EstimatedDuration ? task.EstimatedDuration : 0} Hrs</td>
                      <td><span className='statusCircle' style={{ backgroundColor: task.Color }}>{task.TaskStatus}</span></td>
                    </tr>
                  );
                }): null}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      </div>
  )
}
