"use client"
import { useState, useEffect } from 'react';
import Loading from '@/app/components/loading';


export default function (props) {
  const {id} = props.searchParams;
  const [project, setProject] = useState(null);
  const [projectId, setPage] = useState(7);
  const [isLoading, setLoading] = useState(true);
   
  useEffect(() => {
    fetch('/api/projects?projectId=' + id)
      .then((res) => { return res.json() })
      .then((data) => {
        setProject(data.project);
        setLoading(false);
      })
  }, [projectId]);

  if (isLoading) return <Loading></Loading>

  return(
      <div className="container">
        <div className='card-title h5 mb-3'>Project Details</div>
        <div>Project Name: {project.Title }</div>
      </div>
  );
}