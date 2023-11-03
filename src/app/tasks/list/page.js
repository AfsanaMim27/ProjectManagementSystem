"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Loading from '@/app/components/loading';
import Pagination from '@/app/components/pagination'
import moment from 'moment/moment';
import Link from 'next/link';

export default function TaskList(props) {
    const {projectId} = props.searchParams;
    const size = 5;
    const [taskList, setTaskList] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
   
    useEffect(() => {
      fetch('/api/tasks?page=' + page + '&size=' + size + '&projectId=' + projectId)
        .then((res) => { return res.json() })
        .then((data) => {
          setTaskList(data.records);
          setPagination(data.pagination);
          setLoading(false);
        })
        .catch(error =>{
            console.log("Failed to get task list. Error:" + error);
          setLoading(false);
        });
    }, [page, projectId]);

    if (isLoading) return <Loading></Loading>
    if (!taskList) return <p>No tasks found</p>
    return (
        <div className="container">
          <div className='card-title mb-3 d-flex justify-content-between'><span className='h5'>Tasks</span><Link href="/tasks/add">Add Task</Link></div>
          <div>
          <table className='table table-light table-hover table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Project</th>
                  <th>Phase</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>End Date</th>
                  <th>Estimated</th>
                  <th width="10%">Status</th>
                </tr>
              </thead>
              <tbody>
                {taskList ? taskList.map((task) => {
                  return (
                    <tr key={task.TaskId}>
                      <td>{task.Title}</td>
                      <td>{task.ShortDescription}</td>
                      <td>{task.ProjectTitle}</td>
                      <td>{task.PhaseTitle}</td>
                      <td>{task.StartDate ? moment(task.StartDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{task.DueDate ? moment(task.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{task.EndDate ? moment(task.EndDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{task.EstimatedDuration ? task.EstimatedDuration : 0} Hrs</td>
                      <td><span className='statusCircle' style={{ backgroundColor: task.Color }}>{task.TaskStatus}</span></td>
                    </tr>
                  );
                }): null}
              </tbody>
            </table>
            <div className='text-center'><Pagination currentPage={page} totalPages={pagination.totalPages} setPageNumber={setPage}></Pagination></div>
          </div>
        </div>
    )
  }
  

