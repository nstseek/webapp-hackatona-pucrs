import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Map from './components/map/Map';
import InputCard from './components/input-card/InputCard';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Map />
      <InputCard />
    </div>
  );
}

export default App;
