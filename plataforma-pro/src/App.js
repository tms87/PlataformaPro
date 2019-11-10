import React, {useState} from 'react';
import './App.css';
import Body from './Body';
import Layout from './Layout';

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="App">
      <Layout page={page} setPage={setPage}/>
      <Body page={page} setPage={setPage}/>
    </div>
  )
}