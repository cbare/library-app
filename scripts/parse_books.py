books = []
with open('data/books.txt') as f:
    for line in f:
        books.append(
            {
                "title": line.strip(),
                "authors": next(f).strip().split(', '),
                "publisher": next(f).strip(),
                "isbn": next(f).strip(),
                "published-on": next(f).strip(),
                "category": next(f).strip().split(', '),
            })
        assert next(f).strip() == ''
