import {
  Link,
} from "react-router-dom";

import {books} from '../bookData'

export function Books() {
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
