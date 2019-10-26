import React, {useState} from 'react';
import './App.css';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export default function App() {
  const [page, setPage] = useState("profile");
  return (
    <div className="App">
      <Header/>
      <Body page={page} setPage={setPage}/>
      <Footer page={page} setPage={setPage}/>
    </div>
  )
}