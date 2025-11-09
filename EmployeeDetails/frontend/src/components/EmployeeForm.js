import React, { useState } from 'react';
import api from '../api';

export default function EmployeeForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', { firstName, lastName, email });
      setFirstName(''); setLastName(''); setEmail('');
      // Simple refresh to update the list
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to create employee');
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Employee</h3>
      <div>
        <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
