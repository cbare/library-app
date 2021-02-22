import { useContext } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { useLibraryStore } from "../stores/LibraryStore";

interface CategorySlugParam {
  category_slug: string;
}

export function Category() {
  let {category_slug} = useParams<CategorySlugParam>();
  const {categories_by_slug, books} = useLibraryStore();
  let category = categories_by_slug.get(category_slug);
  if (category) {
    return (
      <div>
        <h2>{category}</h2>
        <ul className="bookList">
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
