import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <span className="nav-logo">
              <img src={logo} className="App-logo" alt="logo" />
              <span className="title"><Link to="/">Library</Link></span>
            </span>
            <ul className="nav-menu">
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/publishers">Publishers</Link></li>
            </ul>
            <ul className="nav-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/books">
              <Books/>
            </Route>
            <Route path="/authors">
              <Authors/>
            </Route>
            <Route path="/publishers">
              <Publishers/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Books() {
  return (
    <div>
      <h2>Books</h2>
    </div>
  );
}

function Authors() {
  return (
    <div>
      <h2>Authors</h2>
    </div>
  );
}

function Publishers() {
  return (
    <div>
      <h2>Publishers</h2>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>A toy application for learning <a href="https://www.typescriptlang.org/">Typescript</a> and <a href="https://reactjs.org/">React</a>, created in the model of Zoltan Debre's excellent <a href="https://yoember.com/">yoember</a> tutorial.</p>
    </div>
  );
}

export default App;
