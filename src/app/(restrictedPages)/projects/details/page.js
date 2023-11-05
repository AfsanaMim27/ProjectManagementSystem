"use client"
import { useState, useEffect } from 'react';
import Loading from '@/app/components/loading';
import moment from 'moment';
import Link from 'next/link';

export default function (props) {
  const {id} = props.searchParams;
  const [project, setProject] = useState(null);
  const [phases, setPhases] = useState(null);
  const [isLoading, setLoading] = useState(true);
   
  useEffect(() => {
    fetch('/api/projects?projectId=' + id)
      .then((res) => { return res.json() })
      .then((data) => {
        setProject(data.project);
        setPhases(data.phases);
        setLoading(false);
      })
  }, [id]);

  if (isLoading) return <Loading></Loading>

  return(
      <div className="container">
        <div className='card-title h5 mb-3'>Project Details</div>
        <p><b>{project.Title}</b></p>
        <div>{project.ShortDescription}</div>
        <div>Manager: { project.ProjectManagerName }</div>
        <div>Start Date: {project.StartDate ? moment(project.StartDate).format('DD-MM-YYYY, h:mm a') : ""}</div>
        <div>Due Date: {project.DueDate ? moment(project.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</div>
        <div className='mb-4'>End Date: {project.EndDate ? moment(project.EndDate).format('DD-MM-YYYY, h:mm a') : ""}</div>
        <b>Project Phases</b>
        <table className='table table-light table-hover table-striped mt-2'>
          <thead>
            <tr>
              <th>Title</th>                
              <th>Start Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {phases ? phases.map((phase) => {
              return (
                <tr key={phase.PhaseId}>
                  <td>{phase.Title}</td>
                  <td>{phase.StartDate ? moment(phase.StartDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                  <td>{phase.DueDate ? moment(phase.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                </tr>
              );
            }): null}
          </tbody>
        </table>
        <b><Link href={"/tasks/list?projectId=" + id}>Task List</Link></b>
      </div>
  );
}