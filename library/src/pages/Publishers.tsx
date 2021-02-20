import {
  Link,
  useParams
} from "react-router-dom";
import {books, publishers_by_slug} from '../bookData'
import {PublisherLink} from '../components/PublisherLink'


export function Publishers() {
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

export function Publisher() {
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
