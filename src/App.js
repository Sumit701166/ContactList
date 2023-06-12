import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();

    const newContact = {
      name,
      email,
      phone
    };

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        newContact
      );
      setContacts((prevContacts) => [...prevContacts, response.data]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleUpdateContact = async (id) => {
    const updatedContact = {
      name,
      email,
      phone
    };
  
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedContact
      );
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Contact List</h1>

      <h2>Add Contact</h2>
      <form onSubmit={handleAddContact} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
        />
        <button
          type="submit"
          className="button"
          disabled={!name || !email || !phone}
        >
          Add
        </button>
      </form>

      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-card">
            <div className="contact-card-info">
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <div className="action-buttons">
              <button
                onClick={() => handleUpdateContact(contact.id)}
                className="button"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteContact(contact.id)}
                className="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
