import './App.css';
import { useState } from 'react';

function App() {
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState('');
  const [error, setError] = useState('');

  const handleScrape = async () => {
    try {
      setError('');
      const response = await fetch(`https://careerpulse-backend.onrender.com/scrape?skills=${skills}`); // Updated URL
      if (!response.ok) throw new Error('Scraping failed');
      const data = await response.json();
      setJobs(data);
      setEmail('');
      setQuestions('');
    } catch (error) {
      console.error('Scrape failed:', error);
      setError('Failed to fetch jobs—try again!');
    }
  };

  const getEmail = async (job) => {
    try {
      setError('');
      const response = await fetch(`https://careerpulse-backend.onrender.com/scrape?skills=${skills}`);
      if (!response.ok) throw new Error('Email generation failed');
      const text = await response.text();
      setEmail(text);
      setQuestions('');
    } catch (error) {
      console.error('Email failed:', error);
      setError('Failed to generate email—try again!');
    }
  };

  const getQuestions = async (job) => {
    try {
      setError('');
      const response = await fetch(`https://careerpulse-backend.onrender.com/scrape?skills=${skills}`);
      if (!response.ok) throw new Error('Questions generation failed');
      const text = await response.text();
      setQuestions(text);
      setEmail('');
    } catch (error) {
      console.error('Questions failed:', error);
      setError('Failed to generate questions—try again!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CareerPulse</h1>
        <p className="tagline">Unlock your next opportunity with AI-powered insights</p>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter skills (e.g., Python, sales)"
        />
        <button onClick={handleScrape}>Find Jobs</button>
        {error && <p className="error">{error}</p>}
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                {job}
                <button onClick={() => getEmail(job)} className="action-btn">Email</button>
                <button onClick={() => getQuestions(job)} className="action-btn">Interview</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs yet—enter skills and click "Find Jobs"!</p>
        )}
        <div className="output">
          {email || questions || 'Your AI-generated content will appear here.'}
        </div>
      </header>
    </div>
  );
}

export default App;