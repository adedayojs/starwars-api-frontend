class DataFetcher {
  static starships(url = '') {
    return fetch('https://swapi.co/api/starships/' + url)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  }
  static people(url = '') {
    return fetch('https://swapi.co/api/people/' + url)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  }
  static planets(url = '') {
    return fetch('https://swapi.co/api/planets/' + url)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  }
}

export default DataFetcher;
