import {Book} from './models/LibraryModels'
export { byLastName, slugify, byTitle };

function lastName(name: string): string {
  return name.split(" ").splice(-1,1)[0]
}

function byLastName(a: string, b: string): number {
  if (lastName(a) < lastName(b)) {
    return -1
  } else if (lastName(a) > lastName(b)) {
    return 1
  } else {
    return 0
  }
}

function byTitle(a: Book, b: Book): number {
  if (a.title < b.title) {
    return -1
  } else if (a.title> b.title) {
    return 1
  } else {
    return 0
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}
