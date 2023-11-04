"use client"
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function TaskUpdate(props) {
    const [errorOnSave, setErrorOnSave] = useState(null);
    const [task, setTask] = useState(null);
    const [taskStatuses, setTaskStatuses] = useState(null);
    const [contactList, setContactList] = useState(null);
    const [projectList, setProjectList] = useState(null);
    const [phaseList, setPhaseList] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    let { id } = props.searchParams;

    const { push } = useRouter();
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        await fetch('/api/tasks?taskId='+ id, {
            method: 'PUT',
            body: formData,
        })
        .then((res) => { return res.json() })
        .then((data) => {
            push('/tasks/list');
        })
        .catch((error) => {
            console.log("Failed to update task. Error:" + error);
            setErrorOnSave("Failed to update task.");
        });
    }

    useEffect(() => {
        if (!task) {
            fetch('/api/tasks?taskId=' + id)
            .then((res) => { return res.json() })
            .then((data) => {
                setTask(data.task);
                setTaskStatuses(data.taskStatuses);
                setSelectedProjectId(data.task.ProjectId ? data.task.ProjectId : null);
            })
            .catch(error=>{
              console.log("Failed to load task. Error: " + error);
            });  
        }
        if (!contactList) {
            fetch('/api/contacts?page=1&size=9999999')
            .then((res) => { return res.json() })
            .then((data) => {
                const contacts = data.records.filter(c=>c.ContactType==1 );
                setContactList(contacts);
            })
            .catch(error=>{
                console.log("Failed to load contacts. Error: ", error);
            }); 
        }
        if (!projectList) {
            fetch('/api/projects?page=1&size=9999999')
            .then((res) => { return res.json() })
            .then((data) => {
                setProjectList(data.records);
            })
            .catch(error=>{
              console.log("Failed to load projects. Error: ", error);
            });           
        }
        if (selectedProjectId) {
            fetch('/api/projects?projectId=' + selectedProjectId)
            .then((res) => { return res.json() })
            .then((data) => {
                setPhaseList(data.phases);
            })
            .catch(error=>{
              console.log("Failed to load phases of Project: " + selectedProjectId + ". Error: " + error);
            });   
        } 
    }, [selectedProjectId, id]);
    return(
        <div className="container">
            <div className='card-title h5 mb-3'>Edit Task</div>  
            {errorOnSave ? (
                <div className="alert alert-danger">{errorOnSave}</div>
            ) : null}
            {task && contactList && projectList && ((task.PhaseId && phaseList) || !task.PhaseId) ? (
                <form className = "w-50 mt-2" onSubmit={onSubmit}>
                    <div className = "mb-3">
                        <label className = "form-label">Title</label>
                        <input placeholder="Enter Title" defaultValue={task ? task.Title : ""} className = "form-control" name="Title" />
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Description</label>
                        <textarea name="Description" defaultValue={task ? task.ShortDescription : ""} placeholder="Enter Description" className = "form-control"></textarea>
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Project</label>
                        <select className = "form-select" aria-label="Select Project" name="ProjectId" defaultValue={task && task.ProjectId ? task.ProjectId :""} onChange={e=>setSelectedProjectId(e.target.value)}>
                            {projectList ? projectList.map(project => {
                                return <option key={project.ProjectId} value={project.ProjectId}>{project.Title}</option>
                            }): null}
                        </select>
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Phase</label>
                        <select className = "form-select" aria-label="Select Phase" name="PhaseId" defaultValue={task && task.PhaseId ? task.PhaseId :""}>
                            {phaseList ? phaseList.map(phase => {
                                return <option key={phase.PhaseId} value={phase.PhaseId}>{phase.Title}</option>                            
                            }): null}
                        </select>
                    </div>
                    <div className = "mb-3">
                        <label className="form-label">Start Date</label>
                        <input defaultValue={task ? moment(task.StartDate).format('YYYY-MM-DD') : ""} placeholder="Select Start Date" className = "form-control" type="date" name="StartDate" />
                    </div>
                    <div className = "mb-4">
                        <label className = "form-label">Due Date</label>
                        <input defaultValue={task ? moment(task.DueDate).format('YYYY-MM-DD') : ""} placeholder="Select Due Date" className = "form-control" type="date" name="DueDate" />
                    </div>
                    <div className = "mb-4">
                        <label className = "form-label">End Date</label>
                        <input defaultValue={task.EndDate ? moment(task.EndDate).format('YYYY-MM-DD') : ""} placeholder="Select End Date" className = "form-control" type="date" name="EndDate" />
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Estimated Hours</label>
                        <input defaultValue={task ? task.EstimatedDuration : ""} placeholder="Enter Hours" className = "form-control" type='number' min={0} name="EstimatedDuration" />
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Assigned To</label>
                        <select  defaultValue={task ? task.AssignedTo : ""} className = "form-select" aria-label="Select Contact" name="AssignedTo">
                            <option>Select Contact {task ? task.AssignedTo : ""}</option>
                            {contactList ? contactList.map(contact => {
                                return <option key={contact.ContactId} value={contact.ContactId}>{ contact.FirstName + " " + contact.LastName }</option>                            
                            }): null}
                        </select>
                    </div>
                    <div className = "mb-3">
                        <label className = "form-label">Status</label>
                        <select className = "form-select" aria-label="Select Status" name="TaskStatus" defaultValue={task && task.TaskStatus ? task.TaskStatus :""}>
                            {taskStatuses ? taskStatuses.map(status => {
                                return <option key={status.StatusId} value={status.StatusId}>{status.Title}</option>                            
                            }): null}
                        </select>
                    </div>
                    <button type="submit" className = "btn btn-primary">Save</button>
                </form>            
            ) : null}
        </div>
    );
}