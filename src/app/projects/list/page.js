"use client"
import Loading from '@/app/components/loading';
import Pagination from '@/app/components/pagination'
import moment from 'moment/moment';
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function ProjectList() {
  const size = 5;
  const [projectList, setProjectList] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    fetch('/api/projects?page='+page+'&size='+size)
      .then((res) => { return res.json() })
      .then((data) => {
        setProjectList(data.records);
        setPagination(data.pagination);
        setLoading(false);
      })
  }, [page])
 
  if (isLoading) return <Loading></Loading>
  if (!projectList) return <p>No projects found</p>
  return (
      <div ç>
        <div className='card-title mb-3 d-flex justify-content-between'><span className='h5'>Projects</span><Link href="/projects/add-project">Add Project</Link></div>
        <div>
          <table className='table table-light table-hover table-striped'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Manager</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {projectList ? projectList.map((project) => {
                return (
                  <tr key={project.ProjectId}>
                    <td>{project.Title}</td>
                    <td>{project.ShortDescription}</td>
                    <td>{project.ProjectManagerName}</td>
                    <td>{project.StartDate ? moment(project.StartDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                    <td>{project.DueDate ? moment(project.DueDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                    <td>{project.EndDate ? moment(project.EndDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
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
