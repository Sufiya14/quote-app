import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


export default function EditQuote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quotes/${id}`);
        const quote = res.data;
        console.log("quote: ", quote);
        setText(quote.text);
        setAuthor(quote.author);
        setTags(quote.tags.join(', '));
      } catch (error) {
        console.error('Error fetching quote', error);
      }
    };

    fetchQuote();
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedQuote = {
    text,
    author,
    tags: tags.split(',').map((tag) => tag.trim()),
  };

  try {
    await axios.put(`http://localhost:5000/api/quotes/${id}`, updatedQuote, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    alert("Quote updated successfully!");
    navigate('/quotes');
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Request was made but no response:", error.request);
    } else {
      console.error("Something went wrong:", error.message);
    }
    alert("Failed to update quote. See console for details.");
  }
};


  return (
    
    <div>
      <h2>Edit Quote</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Update Quote</button>
      </form>
    </div>
  );
}