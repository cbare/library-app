import {
  Link,
  useParams,
} from "react-router-dom";

import {authors, authors_by_slug} from '../bookData'

export function Authors() {
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

export function Author() {
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
