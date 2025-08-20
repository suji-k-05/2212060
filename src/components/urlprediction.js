import React, { useState } from 'react';

export default function url() {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Registered: ${form.name}, ${form.email}`);
  };
  return (
    <form onSubmit={onSubmit} style={{ maxWidth:400, margin:'auto', padding:20 }}>
      <h2>Register</h2>
      <div>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" required />
      </div>
      <div>
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" required />
      </div>
      <div>
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" required />
      </div>
      <div>
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={onChange} placeholder="Confirm Password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

