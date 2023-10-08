"use client"
import Loading from '@/app/components/loading';
import Pagination from '@/app/components/pagination'
import { useState, useEffect } from 'react'

export default function ContactList() {
  const size = 5;
  const [contactList, setContactList] = useState(null);
  const [contactTypeCounts, setContactTypeCounts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    fetch('/api/contacts?page='+page+'&size='+size)
      .then((res) => { return res.json() })
      .then((data) => {
        setContactList(data.records);
        setContactTypeCounts(data.contactTypeCounts);
        setPagination(data.pagination);
        setLoading(false);
      })
  }, [page])
 
  if (isLoading) return <Loading></Loading>
  if (!contactList) return <p>No contacts found</p>
  return (
      <div className='container'>
      <div className='card-title h5 mb-3'>Contacts</div>
      <div className='contactCounts'>
        <div>
          <div>Contacts</div>
          <div>{contactTypeCounts.TotalContacts}</div>
        </div>
        <div>
          <div>People</div>
          <div>{contactTypeCounts.PersonCount}</div>
        </div>
        <div>
          <div>Companies</div>
          <div>{contactTypeCounts.CompaniesCount}</div>
        </div>
      </div>
      <div>
        <table className='table table-light table-hover table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {contactList ? contactList.map((contact) => {
              return (
                <tr key={contact.ContactId}>
                  <td>{contact.FirstName + " " + contact.LastName}</td>
                  <td>{contact.Phone}</td>
                  <td>{contact.Email}</td>
                  <td>{contact.Address + ", " + contact.City}</td>
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
