import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({ text: '', author: '', tags: '' });

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await axios.get(`http://localhost:5000/api/quotes/${id}`);
      setQuote({
        text: res.data.text,
        author: res.data.author,
        tags: res.data.tags.join(', ')
      });
    };
    fetchQuote();
  }, [id]);

  const handleChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuote = {
      ...quote,
      tags: quote.tags.split(',').map(tag => tag.trim())
    };

    await axios.put(`http://localhost:5000/api/quotes/${id}`, updatedQuote);
    navigate('/quotes');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Quote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quote:</label><br />
          <textarea
            name="text"
            value={quote.text}
            onChange={handleChange}
            rows="3"
            cols="40"
          />
        </div>
        <div>
          <label>Author:</label><br />
          <input
            name="author"
            value={quote.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label><br />
          <input
            name="tags"
            value={quote.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Quote</button>
      </form>
    </div>
  );
}
