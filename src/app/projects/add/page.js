"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function () {
    const [contactList, setContactList] = useState(null);

    const { push } = useRouter();
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        await fetch('/api/projects', {
            method: 'POST',
            body: formData,
        })
        .then((res) => { return res.json() })
        .then((data) => {
            push('/projects/details?id=' + data.Id);
        });
    }

    useEffect(() => {
        fetch('/api/contacts?page=1&size=9999999')
          .then((res) => { return res.json() })
          .then((data) => {
            setContactList(data.records);
          })
    }, [])

    return(
        <div className="container">
            <div className='card-title h5 mb-3'>Add Project</div>                         
            <form class="w-50 mt-2" onSubmit={onSubmit}>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input placeholder="Enter Title" class="form-control" name="Title" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea name="Description" placeholder="Enter Description" class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Manager</label>
                    <select class="form-select" aria-label="Select Manager" name="ProjectManager">
                        <option selected>Select Manager</option>
                        {contactList ? contactList.map(contact => {
                            return <option value={contact.ContactId}>{ contact.FirstName + " " + contact.LastName }</option>                            
                        }): null}
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Start Date</label>
                    <input placeholder="Select Start Date" class="form-control" type="date" name="StartDate" />
                </div>
                <div class="mb-4">
                    <label class="form-label">Due Date</label>
                    <input placeholder="Select Due Date" class="form-control" type="date" name="DueDate" />
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
    );
}