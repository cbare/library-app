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
  