import React, { useEffect, useState } from 'react';

import axios from 'axios';
import CharacterTable from './CharacterTable';
import './MarvelApi.css';
import img from './img/download.gif';

const MarvelApi = () => {
  const apiKey = '768d9a571df4b5a599fd30a045417e16';
  const MD5Hash = 'a56975fbbdf2bc15c085f6383a5213f1';

  const baseUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${MD5Hash}`;

  const [heroes, setHeroes] = useState([]);
  const [searchCharacters, setSearchCharacters] = useState('');
  const [displayedHeroes, setDisplayedHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios(baseUrl);
      setIsLoading(false);
      const heroes = [];

      for (const key in result.data.data.results) {
        heroes.push({
          id: key,
          name: result.data.data.results[key].name,
          img: `${result.data.data.results[key].thumbnail.path}.${result.data.data.results[key].thumbnail.extension} `,
        });
      }

      setHeroes(heroes);
      setDisplayedHeroes(heroes);
    };

    fetch();
    fetch().catch(error => {
      setHttpError(error.message);
    });
  }, [baseUrl]);

  useEffect(() => {
    const filteredData = heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchCharacters.toLowerCase())
    );

    setDisplayedHeroes(filteredData);
  }, [heroes, searchCharacters]);

  if (httpError) {
    return (
      <div>
        <p className="error">{httpError}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loader">
        <img src={img} alt="loader" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="search-wrapper">
        <input
          className="input"
          placeholder="Search Marvel Characters"
          onChange={e => setSearchCharacters(e.target.value)}
        />
      </div>
      <div className="grid">
        {displayedHeroes.map(hero => (
          <div className="col" key={hero.id}>
            <CharacterTable hero={hero} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarvelApi;
