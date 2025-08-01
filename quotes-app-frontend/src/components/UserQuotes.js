// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// //Public quote list with filter and search
// export default function UserQuotes() {
//   const [quotes, setQuotes] = useState([]);
//   const [search, setSearch] = useState('');
//   const [tag, setTag] = useState('');

//   const fetchQuotes = async () => {
//     let url = `http://localhost:5000/api/quotes`;
//     const params = [];

//     if (search) params.push(`search=${search}`);
//     if (tag) params.push(`tag=${tag}`);

//     if (params.length) url += '?' + params.join('&');

//     const res = await axios.get(url);
//     setQuotes(res.data);
//   };

//   useEffect(() => {
//     fetchQuotes();
//   }, [search, tag]);

//   const getUniqueTags = () => {
//     const allTags = quotes.flatMap(q => q.tags || []);
//     return Array.from(new Set(allTags));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Explore Quotes</h2>

//       <input
//         type="text"
//         placeholder="Search by keyword or author"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div>
//         <label>Filter by Tag: </label>
//         <select value={tag} onChange={(e) => setTag(e.target.value)}>
//           <option value="">-- All --</option>
//           {getUniqueTags().map((t) => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         {quotes.map((q) => (
//           <li key={q.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
//             <blockquote>"{q.text}"</blockquote>
//             <p>- {q.author}</p>
//             <small>Tags: {q.tags.join(', ')}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/quotes');
      setQuotes(res.data);
    } catch (err) {
      console.error("Failed to fetch quotes", err);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const term = searchTerm.toLowerCase();
    return (
      quote.text.toLowerCase().includes(term) ||
      quote.author.toLowerCase().includes(term) ||
      (quote.tags && quote.tags.join(',').toLowerCase().includes(term))
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Quotes</h2>
      <input
        type="text"
        placeholder="Search by text, author, or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '50%' }}
      />

      {filteredQuotes.length > 0 ? (
        filteredQuotes.map((quote) => (
          <div key={quote.id} style={{ padding: '15px', border: '1px solid #ccc', marginBottom: '10px' }}>
            <p><strong>"{quote.text}"</strong></p>
            <p>- {quote.author}</p>
            <p style={{ fontSize: '14px', color: 'gray' }}>{quote.tags?.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No quotes found.</p>
      )}
    </div>
  );
}
