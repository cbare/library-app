import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {Home} from './pages/Home'
import {Books} from './pages/Books'
import {Book} from './pages/Book'
import {Author, Authors} from './pages/Authors'
import {Publisher, Publishers} from './pages/Publishers'
import {Category} from './pages/Category'


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
            <Route path="/book/:isbn">
              <Book/>
            </Route>
            <Route path="/category/:category_slug">
              <Category/>
            </Route>
            <Route path="/authors">
              <Authors/>
            </Route>
            <Route path="/author/:author_slug">
              <Author/>
            </Route>
            <Route path="/publishers">
              <Publishers/>
            </Route>
            <Route path="/publisher/:publisher_slug">
              <Publisher/>
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
      <p>A toy library application for learning <a href="https://www.typescriptlang.org/">Typescript</a> and <a href="https://reactjs.org/">React</a>, created in the model of Zoltan Debre's excellent <a href="https://yoember.com/">yoember</a> tutorial.</p>
    </div>
  );
}

export default App;
