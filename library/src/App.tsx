import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {books, authors, authors_by_slug, publishers_by_slug, categories, categories_by_slug} from './bookData'
import {byLastName, slugify} from './utils'

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

function Home() {
  return (
    <div>
      <h2>Library Home</h2>
      <p>What kinds of books are you interested in?</p>
      <ul>
        {
          categories.map(
            function(c) {
              return <li><Link to={"/category/" + slugify(c)}>{c}</Link></li>
            }
          )
        }
      </ul>
    </div>
  );
}

function Books() {
  return (
    <div>
      <h2>Books</h2>
      <ul>
        { books.map(
            function(b) {
              return (
                <li key={b.isbn}>
                  <Link to={"/book/" + b.isbn }>{b.title}</Link>
                </li>)
            }
          )
        }
      </ul>
    </div>
  );
}

interface IsbnParam {
  isbn: string
}

function AuthorLink(author: string) {
  return <li><Link to={"/author/" + slugify(author) }>{author}</Link></li>
}


interface PublisherParam {
  publisher: string
}

function PublisherLink(props: PublisherParam) {
  const { publisher } = props
  return <Link to={"/publisher/" + slugify(publisher) }>{publisher}</Link>
}

function Book() {
  let {isbn} = useParams<IsbnParam>();
  let book = books.find(
    function(b) { return b.isbn===isbn }
  );
  if (book) {
    return (
      <div>
        <h2>{ book.title }</h2>
        <p>{ book.isbn }</p>
        <ul>{ book.authors.map(AuthorLink) }</ul>
        <p><PublisherLink publisher={ book.publisher } /></p>
        <p>{ book.published_on }</p>
        <p>{ book.category }</p>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Not found</h2>
        <p>We don't have a book with ISBN { isbn }.</p>
      </div>
    );
  }
}

function Authors() {
  return (
    <div>
      <h2>Authors</h2>
      <ul>
        { authors.map(
            function(a) {
              return (<li><Link to={"/author/" + a.slug }>{a.author}</Link></li>)
            }
          )
        }
      </ul>
    </div>
  );
}


interface AuthorSlugParam {
  author_slug: string
}

function Author() {
  let {author_slug} = useParams<AuthorSlugParam>();
  let author = authors_by_slug.get(author_slug);

  if (author) {
    return (
      <div>
        <h2>{ author.author }</h2>
        <h3>Books</h3>
        <ul>
          { author.books.map(
              function(b) {
                return (
                  <li key={b.isbn}>
                    <Link to={"/book/" + b.isbn }>{b.title}</Link>
                  </li>)
              }
            )
          }
        </ul>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Not found</h2>
        <p>We don't have an author "{ author_slug }".</p>
      </div>
    );
  }
}

function Publishers() {
  let publishers = Array.from(new Set(books.map(
    function(b) { return b.publisher }
  ))).sort();
  return (
    <div>
      <h2>Publishers</h2>
      <ul>
        { publishers.map(
            function(publisher) {
              return (<li><PublisherLink publisher={ publisher } /></li>)
            }
          )
        }
      </ul>
    </div>
  );
}

interface PublisherSlugParam {
  publisher_slug: string
}

function Publisher() {
  let {publisher_slug} = useParams<PublisherSlugParam>();
  let publisher = publishers_by_slug.get(publisher_slug)
  if (publisher) {
    return (
      <div>
        <h2>{publisher}</h2>
        <h2>Books</h2>
        <ul>
          { books.filter((b) => b.publisher === publisher)?.map(
              function(b) {
                return (
                  <li key={b.isbn}>
                    <Link to={"/book/" + b.isbn }>{b.title}</Link>
                  </li>)
              }
            )
          }
        </ul>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Not found</h2>
        <p>We don't have a publisher "{ publisher_slug }".</p>
      </div>
    );
  }
}

interface CategorySlugParam {
  category_slug: string;
}

function Category() {
  let {category_slug} = useParams<CategorySlugParam>();
  let category = categories_by_slug.get(category_slug);
  if (category) {
    return (
      <div>
        <h2>{category}</h2>
        <ul>
          { books.filter((b) => category && b.category.includes(category))?.map(
              function(b) {
                return (
                  <li key={b.isbn}>
                    <Link to={"/book/" + b.isbn }>{b.title}</Link>
                  </li>)
              }
            )
          }
        </ul>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Not found</h2>
        <p>We don't have a category "{ category_slug }".</p>
      </div>
    );
  }
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
