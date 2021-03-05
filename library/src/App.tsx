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
import {Author, Authors} from './pages/Authors'
import {Book, Books} from './pages/Books'
import {Category} from './pages/Category'
import {Login} from './pages/Login'
import {Publisher, Publishers} from './pages/Publishers'
import {LibraryStoreProvider} from './stores/LibraryStore'
import { Auth0Provider } from "@auth0/auth0-react";


function App() {
  return (
    <Auth0Provider
        domain="dev-gl6ejecq.au.auth0.com"
        clientId="8bWe12PZ8p0BCPGthw1SW6PTf7OOxMq8"
        redirectUri={window.location.origin + '/login'}
      >
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
          <p>{window.location.origin + '/login'}</p>
          <LibraryStoreProvider>
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
          </LibraryStoreProvider>
        </main>
      </div>
    </Router>
    </Auth0Provider>
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
