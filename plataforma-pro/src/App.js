import React, {useState} from 'react';
import './App.css';
import Body from './Body';
import Header from './Layout';

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="App">
      <Header page={page} setPage={setPage}/>
      <Body page={page} setPage={setPage}/>
    </div>
  )
}