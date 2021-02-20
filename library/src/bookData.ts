import { byLastName, slugify } from "./utils";
import {Book} from './models/LibraryModels'


export const books: Book[] = [
    {
      "title": "The Pragmatic Programmer: Your Journey To Mastery, 20th Anniversary Edition",
      "authors": [
        "Andrew Hunt",
        "David Thomas"
      ],
      "publisher": "Addison-Wesley",
      "isbn": "9780135957059",
      "published_on": "September 13, 2019",
      "category": [
        "Computers"
      ]
    },
    {
      "title": "Hands-On Machine learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems, 2nd Edition",
      "authors": [
        "Aurélien Géron"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781492032649",
      "published_on": "October 15, 2019",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "Deep Learning",
      "authors": [
        "Ian Goodfellow",
        "Yoshua Bengio",
        "Aaron Courville"
      ],
      "publisher": "MIT Press",
      "isbn": "9780262035613",
      "published_on": "November 18, 2016",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "The Elements of Statistical Learning: Data Mining, Inference, and Prediction, 2nd Edition",
      "authors": [
        "Trevor Hastie",
        "Robert Tibshirani",
        "Jerome Friedman"
      ],
      "publisher": "Springer",
      "isbn": "9780387848570",
      "published_on": "January 1, 2016",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "Data Science from Scratch: First Principles with Python, 2nd Edition",
      "authors": [
        "Joel Grus"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781492041139",
      "published_on": "May 16, 2019",
      "category": [
        "Computers",
        "Machine learning",
        "Data Science"
      ]
    },
    {
      "title": "Python Machine learning: Machine learning and Deep Learning with Python, scikit-learn, and TensorFlow 2, 3rd Edition",
      "authors": [
        "Sebastian Raschka",
        "Vahid Mirjalili"
      ],
      "publisher": "Packt Publishing",
      "isbn": "9781789955750",
      "published_on": "December 12, 2019",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and IPython",
      "authors": [
        "Wes McKinney"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781491957660",
      "published_on": "October 31, 2017",
      "category": [
        "Computers",
        "Machine learning",
        "Data Science"
      ]
    },
    {
      "title": "Practical Statistics for Data Scientists: 50+ Essential Concepts Using R and Python, 2nd Edition",
      "authors": [
        "Peter Bruce",
        "Andrew Bruce",
        "Peter Gedeck"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781492072942",
      "published_on": "June 2, 2020",
      "category": [
        "Computers",
        "Statistics",
        "Data Science"
      ]
    },
    {
      "title": "Deep Learning with Python, 1st Edition",
      "authors": [
        "François Chollet"
      ],
      "publisher": "Manning",
      "isbn": "9781617294433",
      "published_on": "December 22, 2017",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "Machine learning Design Patterns",
      "authors": [
        "Valliappa Lakshmanan",
        "Sara Robinson",
        "Michael Munn"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781098115784",
      "published_on": "November 10, 2020",
      "category": [
        "Computers",
        "Machine learning"
      ]
    },
    {
      "title": "Designing Data-Intensive Applications",
      "authors": [
        "Martin Kleppmann"
      ],
      "publisher": "O'Reilly",
      "isbn": "9781449373320",
      "published_on": "April 18, 2017",
      "category": [
        "Computers",
        "Data Science"
      ]
    },
    {
      "title": "Introduction to Natural Language Processing",
      "authors": [
        "Jacob Eisenstein"
      ],
      "publisher": "MIT Press",
      "isbn": "9780262042840",
      "published_on": "October 1, 2019",
      "category": [
        "Computers",
        "Machine learning",
        "Natural language processing"
      ]
    },
    {
      "title": "Neural Network Methods in Natural Language Processing",
      "authors": [
        "Yoav Goldberg"
      ],
      "publisher": "Morgan & Claypool",
      "isbn": "9781627052986",
      "published_on": "April 17, 2017",
      "category": [
        "Computers",
        "Machine learning",
        "Natural language processing"
      ]
    },
    {
      "title": "Natural Language Processing in Action",
      "authors": [
        "Hobson Lane",
        "Hannes Hapke",
        "Cole Howard"
      ],
      "publisher": "Manning",
      "isbn": "9781617294631",
      "published_on": "April 14, 2019",
      "category": [
        "Computers",
        "Machine learning",
        "Natural language processing"
      ]
    },
    {
      "title": "The Penguin History of New Zealand, 2nd Edition",
      "authors": [
        "Michael King"
      ],
      "publisher": "Penguin Random House",
      "isbn": "9780143567578",
      "published_on": "February 1, 2012",
      "category": [
        "History"
      ]
    },
    {
      "title": "Amsterdam: A History of the World's Most Liberal City",
      "authors": [
        "Russell Shorto"
      ],
      "publisher": "Vintage",
      "isbn": "9780307743756",
      "published_on": "August 12, 2014",
      "category": [
        "History"
      ]
    },
    {
      "title": "The Island at the Center of the World",
      "authors": [
        "Russell Shorto"
      ],
      "publisher": "Vintage",
      "isbn": "9780385503495",
      "published_on": "April 12, 2005",
      "category": [
        "History"
      ]
    },
    {
      "title": "Underland: A Deep Time Journey",
      "authors": [
        "Robert Macfarlane"
      ],
      "publisher": "Norton",
      "isbn": "9780393242140",
      "published_on": "June 4, 2019",
      "category": [
        "Nature writing"
      ]
    },
    {
      "title": "Structure and Interpretation of Computer Programs, 2nd Edition",
      "authors": [
        "Harold Abelson",
        "Gerald Jay Sussman",
        "Julie Sussman"
      ],
      "publisher": "MIT Press",
      "isbn": "9780262510875",
      "published_on": "September 1, 1996",
      "category": [
        "Computers"
      ]
    },
    {
      "title": "The Algorithm Design Manual, 3rd Edition",
      "authors": [
        "Steven S. Skiena"
      ],
      "publisher": "Springer",
      "isbn": "9783030542559",
      "published_on": "October 6, 2020",
      "category": [
        "Computers"
      ]
    },
    {
      "title": "Introduction to Algorithms, 3rd Edition",
      "authors": [
        "Thomas H. Cormen",
        "Charles E. Leiserson",
        "Ronald L. Rivest",
        "Clifford Stein"
      ],
      "publisher": "MIT Press",
      "isbn": "9780262033848",
      "published_on": "September 1, 2009",
      "category": [
        "Computers"
      ]
    },
    {
      "title": "Algorithms, 4th Edition",
      "authors": [
        "Robert Sedgewick",
        "Kevin Wayne"
      ],
      "publisher": "Addison-Wesley",
      "isbn": "9780321573513",
      "published_on": "April 3, 2011",
      "category": [
        "Computers"
      ]
    },
    {
      "title": "White Noise",
      "authors": [
        "Don DeLillo"
      ],
      "publisher": "Penguin",
      "isbn": "9780140077025",
      "published_on": "January 7, 1986",
      "category": [
        "Fiction"
      ]
    },
    {
      "title": "The Book of Disquiet",
      "authors": [
        "Fernando Pessoa"
      ],
      "publisher": "Penguin Classics",
      "isbn": "9780141183046",
      "published_on": "December 31, 2002",
      "category": [
        "Fiction"
      ]
    },
    {
      "title": "Agency",
      "authors": [
        "William Gibson"
      ],
      "publisher": "Berkley Books",
      "isbn": "9781101986936",
      "published_on": "January 21, 2020",
      "category": [
        "Fiction", "Science Fiction"
      ]
    },
    {
      "title": "The Peripheral",
      "authors": [
        "William Gibson"
      ],
      "publisher": "Berkley Books",
      "isbn": "9780399158445",
      "published_on": "October 28, 2014",
      "category": [
        "Fiction", "Science Fiction"
      ]
    },
    {
      "title": "Neuromancer",
      "authors": [
        "William Gibson"
      ],
      "publisher": "Ace Books",
      "isbn": "9780441569588",
      "published_on": "Oct 15, 1985",
      "category": [
        "Fiction", "Science Fiction"
      ]
    },
    {
      "title": "Foundation, Foundation and Empire, Second Foundation",
      "authors": [
        "Isaac Asimov"
      ],
      "publisher": "Penguin Random House",
      "isbn": "9780307593962",
      "published_on": "Nov 02, 2010",
      "category": [
        "Fiction", "Science Fiction"
      ]
    },
    {
      "title": "The Plague, The Fall, Exile and the Kingdom, and Selected Essays",
      "authors": [
        "Albert Camus"
      ],
      "publisher": "Penguin Random House",
      "isbn": "9781400042555",
      "published_on": "Aug 17, 2004",
      "category": [
        "Fiction"
      ]
    },
    {
      "title": "The History of Jazz",
      "authors": [
        "Ted Gioia"
      ],
      "publisher": "Oxford University Press",
      "isbn": "9780195126532",
      "published_on": "December 17, 1998",
      "category": [
        "History", "Music"
      ]
    }
  ]

export interface AuthorEntry {
  author: string,
  slug: string,
  books: Book[]
}

export var authors_by_slug = new Map<string, AuthorEntry>();

for (var book of books) {
  for (var author of book.authors) {
    const slug = slugify(author);
    const x = authors_by_slug.get(slug);
    if (x) {
      x.books.push(book)
    } else {
      authors_by_slug.set(slug, {
        author: author,
        slug: slug,
        books: [book]
      })
    }
  }
}

function byAuthorLastName(a: AuthorEntry, b: AuthorEntry) {
  return byLastName(a.author, b.author);
}

export var authors: AuthorEntry[] = Array.from(authors_by_slug.values()).sort(byAuthorLastName)


export var publishers_by_slug = new Map<string, string>();
for (var book of books) {
  const slug = slugify(book.publisher);
  const x = publishers_by_slug.get(slug);
  if (!x) {
    publishers_by_slug.set(slug, book.publisher);
  }
}

export var categories_by_slug = new Map<string, string>();
for (var book of books) {
  for (var category of book.category) {
    const slug = slugify(category);
    const x = categories_by_slug.get(slug)
    if (!x) {
      categories_by_slug.set(slug, category)
    }
  }
}

export var categories: string[] = Array.from(categories_by_slug.values()).sort()
