import React, {useState} from 'react';
import './App.css';
import Body from './Body';
import Layout from './Layout/Layout';

export default function App() {
  const [page, setPage] = useState("home");
  const [modoPaciente, setModoPaciente] = useState(false);
  return (
    <div className="App">
      <Layout page={page} setPage={setPage} modoPaciente={modoPaciente} />
      <Body page={page} setPage={setPage} modoPaciente={modoPaciente} />
    </div>
  )
}