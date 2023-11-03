"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function () {
    const [contactList, setContactList] = useState(null);
    const [projectList, setProjectList] = useState(null);
    const [phaseList, setPhaseList] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const { push } = useRouter();
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        await fetch('/api/tasks', {
            method: 'POST',
            body: formData,
        })
        .then((res) => { return res.json() })
        .then((data) => {
            push('/tasks/list');
        });
    }

    useEffect(() => {
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
              setSelectedProjectId(data.records[0].ProjectId);
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
    }, [selectedProjectId]);

    useEffect(() => {
        fetch('/api/projects?page=1&size=9999999')
          .then((res) => { return res.json() })
          .then((data) => {
            setProjectList(data.records);
          })
          .catch(error=>{
            console.log("Failed to load projects. Error: ", error);
          });
    }, [])

    return(
        <div className="container">
            <div className='card-title h5 mb-3'>Add Task</div>                         
            <form className = "w-50 mt-2" onSubmit={onSubmit}>
                <div className = "mb-3">
                    <label className = "form-label">Title</label>
                    <input placeholder="Enter Title" className = "form-control" name="Title" />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Description</label>
                    <textarea name="Description" placeholder="Enter Description" className = "form-control"></textarea>
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Project</label>
                    <select className = "form-select" aria-label="Select Project" name="ProjectId" onChange={e=>setSelectedProjectId(e.target.value)}>
                        {projectList ? projectList.map(project => {
                            return <option value={project.ProjectId}>{project.Title}</option>                            
                        }): null}
                    </select>
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Phase</label>
                    <select className = "form-select" aria-label="Select Phase" name="PhaseId">
                        {phaseList ? phaseList.map(phase => {
                            return <option value={phase.PhaseId}>{phase.Title}</option>                            
                        }): null}
                    </select>
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Start Date</label>
                    <input placeholder="Select Start Date" className = "form-control" type="date" name="StartDate" />
                </div>
                <div className = "mb-4">
                    <label className = "form-label">Due Date</label>
                    <input placeholder="Select Due Date" className = "form-control" type="date" name="DueDate" />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Estimated Hours</label>
                    <input placeholder="Enter Hours" className = "form-control" type='number' min={0} name="EstimatedDuration" />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Assigned To</label>
                    <select className = "form-select" aria-label="Select Contact" name="AssignedTo">
                        <option selected>Select Contact</option>
                        {contactList ? contactList.map(contact => {
                            return <option value={contact.ContactId}>{ contact.FirstName + " " + contact.LastName }</option>                            
                        }): null}
                    </select>
                </div>
                <button type="submit" className = "btn btn-primary">Add</button>
            </form>
        </div>
    );
}