import {
  Link,
  useParams
} from "react-router-dom";
import {books, categories_by_slug} from '../bookData'

interface CategorySlugParam {
  category_slug: string;
}

export function Category() {
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
