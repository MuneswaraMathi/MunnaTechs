import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Management</h2>
      <EmployeeForm />
      <hr />
      <EmployeeList />
    </div>
  );
}
