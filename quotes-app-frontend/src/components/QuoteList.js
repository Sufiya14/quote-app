import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function QuoteList() {
    const [quotes, setQuotes] = useState([]);
    const token = localStorage.getItem('token');

    const fetchQuotes = async () => {
        const res = await axios.get('http://localhost:5000/api/quotes');
        setQuotes(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this quote?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/quotes/${id}`, {
                headers: { Authorization: token }
            });
            fetchQuotes();
        } catch (err) {
            alert("Error deleting quote");
        }
    };

    return (
        <div>
            <h2>All Quotes</h2>
            <ul>
                {quotes.map((quote) => (
                    <li key={quote.id}>
                        <blockquote>"{quote.text}"</blockquote>
                        <p>- {quote.author}</p>
                        <p><strong>Tags:</strong> {quote.tags.join(', ')}</p>

                        <Link to={`/edit/${quote.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(quote.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}




