import {
  Link,
  useParams
} from "react-router-dom";
import {books} from '../bookData'
import {slugify} from '../utils'
import {PublisherLink} from '../components/PublisherLink'


interface IsbnParam {
  isbn: string
}

function AuthorLink(author: string) {
  return <li><Link to={"/author/" + slugify(author) }>{author}</Link></li>
}


export function Book() {
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
