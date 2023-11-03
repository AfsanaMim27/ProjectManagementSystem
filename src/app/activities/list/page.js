"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Loading from '@/app/components/loading';
import Pagination from '@/app/components/pagination'
import moment from 'moment/moment';
import Link from 'next/link';

export default function ActivityList(props) {
    const {projectId} = props.searchParams;
    const size = 5;
    const [activityList, setActivityList] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
   
    useEffect(() => {
      fetch('/api/activities?page=' + page + '&size=' + size + '&projectId=' + projectId)
        .then((res) => { return res.json() })
        .then((data) => {
          setActivityList(data.records);
          setPagination(data.pagination);
          setLoading(false);
        })
        .catch(error =>{
            console.log("Failed to get activity list. Error:" + error);
          setLoading(false);
        });
    }, [page]);

    if (isLoading) return <Loading></Loading>
    if (!activityList) return <p>No activities found</p>
    return (
        <div className="container">
          <div className='card-title mb-3 d-flex justify-content-between'><span className='h5'>Activities</span><Link href="/activities/add">Add Activity</Link></div>
          <div>
          <table className='table table-light table-hover table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Worked Date</th>
                  <th>Task</th>
                  <th>Worked By</th>
                  <th width="10%">Status</th>
                </tr>
              </thead>
              <tbody>
                {activityList ? activityList.map((activity) => {
                  return (
                    <tr key={activity.ActivityId}>
                      <td>{activity.Title}</td>
                      <td>{activity.ShortDescription}</td>
                      <td>{activity.Duration ? activity.Duration : 0} Hrs</td>
                      <td>{activity.WorkedDate ? moment(activity.WorkedDate).format('DD-MM-YYYY, h:mm a') : ""}</td>
                      <td>{activity.Task}</td>
                      <td>{activity.WorkedByName}</td>
                      <td><span className='statusCircle' style={{ backgroundColor: activity.Color }}>{activity.ActivityStatus}</span></td>
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
  

