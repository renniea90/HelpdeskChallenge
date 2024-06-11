import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import TicketCard from './components/tickets';
import db from '.data/db.json';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/help">Help</Link></li>
      <li><Link to="/tickets">Tickets</Link></li>
    </ul>
  </nav>
);

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Navigation />
    {/* Your home page content goes here */}
  </div>
);

const AboutPage = () => (
  <div>
    <h1>About Page</h1>
    <Navigation />
    {/* Your about page content goes here */}
  </div>
);

const HelpLayout = () => (
  <div>
    <h1>Help Layout</h1>
    <Navigation />
    <ul>
      <li><Link to="contact">Contact</Link></li>
      <li><Link to="knowledgebase">Knowledge Base</Link></li>
    </ul>
    <Outlet /> {/* This is where the nested route will render */}
  </div>
);

const KnowledgeBasePage = () => (
  <div>
    <h1>Knowledge Base Page</h1>
    {/* Your knowledge base page content goes here */}
  </div>
);

const TicketsLayout = () => (
  <div>
    <h1>Tickets Layout</h1>
    <Navigation />
    <main>
      <h1>Logged Tickets</h1>
      <div className="tickets-grid">
      {db.map((ticket) => (
          <TicketCard
            Forename={ticket.Forename}
            Surname={ticket.Surname}
            emailAddress={ticket.emailAddress}
            Issue={ticket.Issue}
          />
        ))}
      </div>
    </main>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    forename: '',
    surname: '',
    email: '',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/Tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setFormData({
        forename: '',
        surname: '',
        email: '',
        description: ''
      });
      setIsSubmitted(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1>Contact Page</h1>
      {isSubmitted && <p>Your issue has successfully been logged!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Forename:
          <input type="text" name="forename" value={formData.forename} onChange={handleChange} />
        </label>
        <label>
          Surname:
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
        </label>
        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Description of your issue:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/help" element={<HelpLayout />}>
        <Route path="contact" element={<ContactPage />} />
        <Route path="knowledgebase" element={<KnowledgeBasePage />} />
      </Route>
      <Route path="/tickets" element={<TicketsLayout />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
