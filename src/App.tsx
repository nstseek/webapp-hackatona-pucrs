import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Map from './components/map/Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Map />
    </div>
  );
}

export default App;
