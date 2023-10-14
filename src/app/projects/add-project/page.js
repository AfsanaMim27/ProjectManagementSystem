"use client"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function(){
    async function onSubmit(event) {
        event.preventDefault()
     
        const formData = new FormData(event.target);
        console.log("formData:", formData.keys(), formData.values());
        let keys = formData.keys();
        let result = keys.next();
while (result) {
  console.log(result.value); // 1 3 5 7 9
  result = keys.next();
}
        const response = await fetch('/api/projects', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()
        console.log("data:", data);
    }

    return(
        <div className="container">
             <div className='card-title h5 mb-3'>Add Project</div>
             <Form className='w-50 mt-2' onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="Title" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="Description" as="textarea" placeholder="Enter Description" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Manager</Form.Label>
                    <Form.Control name="Manager" placeholder="Select Manager" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control name="StartDate" type='date' placeholder="Select Start Date" />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control name="DueDate" type='date' placeholder="Select Due Date" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </div>
    );
}