function starshipFetcher(url = '') {
  return fetch('https://swapi.co/api/starships/' + url)
    .then(res => res.json())
    .then(res => res)
    .catch(err => err);
}

export { starshipFetcher };
