import { BsBookmark } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';
import './CharacterTable.css';
// const bookmark = localStorage.getItem('imeheroja') ? true : false;

const CharacterTable = props => {
  const [bookmark, setBookmark] = useState(true);
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header">
          <h4>{props.hero.name}</h4>
          {bookmark ? (
            <BsBookmark
              onClick={() => {
                setBookmark(false);
                localStorage.setItem(
                  JSON.stringify(props.hero.name),
                  JSON.stringify(props)
                );
              }}
            />
          ) : (
            <BsBookmarkFill
              onClick={() => {
                setBookmark(true);
                localStorage.removeItem(
                  JSON.stringify(props.hero.name),
                  JSON.stringify(props)
                );
              }}
            />
          )}
        </div>
        <img className="hero-img" src={props.hero.img} alt="Marvel Hero" />
      </div>
    </>
  );
};

export default CharacterTable;
