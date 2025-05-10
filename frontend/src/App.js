import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const fetchItems = async () => {
    const res = await fetch('http://192.168.99.100:4000/items');
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://192.168.99.100:4000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    });
    setNewItem('');
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Full Stack Docker Demo</h1>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add an item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
