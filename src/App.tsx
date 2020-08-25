import React from 'react';
import './App.css';
import Home from './components/home/home';

function App(props: any) {
  return (
    <div className="App">
      <Home store={props.store}></Home>
    </div>
  );
}

export default App;
