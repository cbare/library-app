export { byLastName, slugify };

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
