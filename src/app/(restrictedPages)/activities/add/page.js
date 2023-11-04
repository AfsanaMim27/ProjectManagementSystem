"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function AddActivity() {
  const [errorOnSave, setErrorOnSave] = useState(null);
  const [contactList, setContactList] = useState(null);
    const [taskList, setTaskList] = useState(null);
    const { push } = useRouter();
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        await fetch('/api/activities', {
            method: 'POST',
            body: formData,
        })
        .then((res) => { return res.json() })
        .then((data) => {
            push('/activities/list');
        })
        .catch((error) => {
            console.log("Failed to add activity. Error:" + error);
            setErrorOnSave("Failed to add activity.");
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
        if (!taskList) {
            fetch('/api/tasks?page=1&size=9999999')
            .then((res) => { return res.json() })
            .then((data) => {
              setTaskList(data.records);
            })
            .catch(error=>{
              console.log("Failed to load tasks. Error: ", error);
            });           
        }
    }, []);

    return(
        <div className="container">
            <div className='card-title h5 mb-3'>Add Activity</div>     
            {errorOnSave ? (
                <div className="alert alert-danger">{errorOnSave}</div>
            ) : null}            
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
                    <label className = "form-label">Task</label>
                    <select className = "form-select" aria-label="Select Task" name="TaskId">
                        {taskList ? taskList.map(task => {
                            return <option value={task.TaskId}>{task.Title}</option>                            
                        }): null}
                    </select>
                </div>
                <div className = "mb-4">
                    <label className = "form-label">Worked Date</label>
                    <input placeholder="Select Worked Date" className = "form-control" type="date" name="WorkedDate" />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Duration</label>
                    <input placeholder="Enter Hours" className = "form-control" type='number' min={0} name="Duration" />
                </div>
                <div className = "mb-3">
                    <label className = "form-label">Worked By</label>
                    <select className = "form-select" aria-label="Select Contact" name="WorkedBy">
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