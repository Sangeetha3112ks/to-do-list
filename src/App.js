import React from 'react';
import { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import Search from './Search';

function App() {
  const [items, setItems] = useState(JSON.parse
    (localStorage.getItem('todo')));

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item }
    const ListItems = [...items, addNewItem]
    setItems(ListItems);
    localStorage.setItem("todo", JSON.stringify(ListItems));
  }

  const handleCheck = (id) => {
    const listitems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listitems);
    localStorage.setItem("todo", JSON.stringify(listitems));
  }
  const handleDelete = (id) => {
    const listitems = items.filter((item) => item.id !== id);
    setItems(listitems);
    localStorage.setItem("todo", JSON.stringify(listitems));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }

  
  
  return (
    <div className="App">
      <Header title="To do list" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <Search 
        search={search}
        setSearch={setSearch}
      />
      
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        length={items.length} />
    </div>
  );
}
export default App;