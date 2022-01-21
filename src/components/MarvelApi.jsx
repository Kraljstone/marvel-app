import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const MarvelApi = () => {
  const apiKey = '768d9a571df4b5a599fd30a045417e16';
  const MD5Hash = 'a56975fbbdf2bc15c085f6383a5213f1';

  const baseUrl = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${MD5Hash}`;

  const [marvel, setMarvel] = useState([]);
  const [searchCharacters, setSearchCharacters] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const result = await axios(baseUrl);
      const marvelArr = [];
      console.log(result);

      for (const key in result.data.data.results) {
        marvelArr.push({
          id: key,
          name: result.data.data.results[key].name,
          img: `${result.data.data.results[key].thumbnail.path}.${result.data.data.results[key].thumbnail.extension} `,
        });
      }
      setMarvel(marvelArr);

      const filteredData = marvelArr.filter(hero =>
        hero.name.toLowerCase().includes(searchCharacters.toLowerCase())
      );

      setMarvel(filteredData);
    };

    fetch();
  }, [baseUrl, searchCharacters]);

  const bookmarkHandler = () => {
    if (true) {
      alert(123);
    } else {
      console.log(123);
    }
  };

  return (
    <>
      <div className="search-characters">
        <Input
          placeholder="Search Marvel Characters"
          onChange={e => setSearchCharacters(e.target.value)}
        />
      </div>
      <Row gutter={[32, 32]} className="marvel-card-container">
        {marvel.map(marvel => (
          <Col xs={24} sm={12} lg={6} className="marvel-card" key={marvel.id}>
            <Card className="card" title={`${marvel.name}`}>
              <img
                src={marvel.img}
                className="marvel-image"
                alt="Marvel Hero"
              />
              <FontAwesomeIcon
                icon={faBookmark}
                className="bookmark"
                onClick={bookmarkHandler}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MarvelApi;
