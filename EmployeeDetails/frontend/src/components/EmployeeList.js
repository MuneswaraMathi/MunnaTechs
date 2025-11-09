import React, { useEffect, useState } from 'react';
import api from '../api';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load employees');
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete employee?')) return;
    await api.delete(`/employees/${id}`);
    load();
  };

  return (
    <div>
      <h3>Employees</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>
                <button onClick={() => {
                  const first = prompt('Edit first name', e.firstName);
                  if (first !== null) {
                    const updated = { ...e, firstName: first };
                    api.put(`/employees/${e.id}`, updated).then(() => load());
                  }
                }}>Edit</button>
                <button onClick={() => remove(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
