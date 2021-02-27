import json
import os, os.path
import requests
import time

def read_api_key():
    with open('secrets.json') as f:
        secrets = json.load(f)
    return secrets['google-books']['api-key']

API_KEY = read_api_key()

url = "https://www.googleapis.com/books/v1/volumes"

with open('data/books.json') as f:
    books = json.load(f)


def find_isbn13(book):
    for x in book['volumeInfo']['industryIdentifiers']:
        if x['type'] == 'ISBN_13':
            return x['identifier']
    return None


def get_by_isbn(isbn: str, key=API_KEY):
    response = requests.get(
        url,
        params={
            'q': f'ISBN:{isbn}',
            'key': API_KEY,
            'country': 'US',
        },
    )
    time.sleep(1/5)
    response.raise_for_status()
    books = response.json()

    return [
        b
        for b in books['items']
        if find_isbn13(b) == isbn
    ]


def fetch_cover_image(book, dir='images'):
    if 'imageLinks' in book['volumeInfo']:
        isbn = find_isbn13(book)

        img_url = book['volumeInfo']['imageLinks']['thumbnail']
        img_url.replace('zoom=1', 'zoom=3')
        response = requests.get(img_url)

        ct = response.headers.get('Content-Type')
        if ct == 'image/jpeg':
            fn = 'cover-' + isbn + '.jpg'
        else:
            raise RuntimeError(f'Unknow content type "{ct}"!')
        
        path = os.path.join('images', fn)

        with open(path, 'wb') as f:
            f.write(response.content)


def get_google_books_info(books):
    found = 0

    for book in books:
        print('>>', book['isbn'], book['title'])
        bs = get_by_isbn(book['isbn'])
        for b in bs:
            print('    --',
                find_isbn13(b),
                b['volumeInfo'].get('categories'),
                b['volumeInfo']['title'])

            fetch_cover_image(b)
        
        if bs:
            found += 1
    
    print(f'found {found} of {len(books)}.')


def get_open_library_covers(books, size='M'):
    found = 0

    for book in books:
        isbn = book['isbn']
        print('>>', isbn, book['title'])
        url = f'http://covers.openlibrary.org/b/ISBN/{isbn}-{size}.jpg'
        time.sleep(0.5)
        response = requests.get(url)

        if response.status_code == 500:
            continue

        ct = response.headers.get('Content-Type')
        if ct != 'image/jpeg':
            print(response.text)
            raise RuntimeError(f'Unknow content type "{ct}"!')

        fn = 'cover-' + isbn + '.jpg'
        path = os.path.join('images', fn)

        with open(path, 'wb') as f:
            f.write(response.content)
        
        found += 1

    print(f'found {found} of {len(books)}.')

get_google_books_info(books)
get_open_library_covers(books)
