import {
  Link,
} from "react-router-dom";
import { useLibraryStore } from "../stores/LibraryStore";

import {slugify} from '../utils'

export function Home() {
  const {categories} = useLibraryStore()
  return (
    <div>
      <h2>Library Home</h2>
      <p><Link to="/test/christopherbare">Test christopherbare</Link></p>
      <p><Link to="/test/janelucybare">Test janelucybare</Link></p>
      <p>What kinds of books are you interested in?</p>
      <ul className="bookList">
        {
          categories.map(
            function(c) {
              return <li key={slugify(c)}><Link to={"/category/" + slugify(c)}>{c}</Link></li>
            }
          )
        }
      </ul>
      <h3>Library App</h3>
      <p><Link to="/about">About</Link></p>
    </div>
  );
}
  