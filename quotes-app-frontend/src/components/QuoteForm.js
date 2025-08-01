import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
export default function QuoteForm() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/quotes', {
        text,
        author,
        tags: tags.split(',').map(t => t.trim())
      }, {
        headers: { Authorization: token }
      });

      alert("Quote added!");
      setText('');
      setAuthor('');
      setTags('');
      navigate('/quotes');
    } catch (err) {
      alert("Error adding quote");
    }
  };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Quote</h2>
//       <textarea placeholder="Quote" value={text} onChange={(e) => setText(e.target.value)} required />
//       <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
//       <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
//       <button type="submit">Add Quote</button>
//     </form>
//   );
// }
return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✨ Add a New Quote ✨</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          placeholder="Write your quote here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>➕ Add Quote</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '25px',
    border: '1px solid #ccc',
    borderRadius: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  textarea: {
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    height: '100px',
    resize: 'vertical'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  }
};