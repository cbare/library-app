import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <span className="nav-logo">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="title">Library</span>
          </span>
          <ul className="nav-menu">
            <li><a href="">Home</a></li>
            <li><a href="">Search</a></li>
            <li><a href="">About</a></li>
          </ul>
          <ul className="nav-menu">
            <li><a href="">Login</a></li>
          </ul>
        </nav>
      </header>
      <div>
        <p>This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.</p>
      </div>
    </div>
  );
}

export default App;
