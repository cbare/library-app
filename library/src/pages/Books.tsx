import {
  Link,
  useParams
} from "react-router-dom";

import {useLibraryStore} from '../stores/LibraryStore'
import {PublisherLink} from '../components/PublisherLink'
import {byTitle, slugify} from '../utils'


export function Books() {
  const { books } = useLibraryStore()
  return (
    <div>
      <h2>Books</h2>
      <ul className="bookList">
        { books.sort(byTitle).map(
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


export function Book() {
  let {isbn} = useParams<IsbnParam>();
  const {getBookByIsbn} = useLibraryStore()

  let book = getBookByIsbn(isbn);
  if (book) {
    return (
      <div>
        <img src={ "/images/cover-" + book.isbn + ".jpg" }/>
        <h2>{ book.title }</h2>
        <p>{ book.isbn }</p>
        <ul className="csv">{ book.authors.map(AuthorLink) }</ul>
        <p><PublisherLink publisher={ book.publisher } /></p>
        <p>{ book.published_on }</p>
        <ul className="csv">{ book.category.map(
          (c) => <li><Link to={"/category/" + slugify(c)}>{c}</Link></li>
        ) }
        </ul>
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
