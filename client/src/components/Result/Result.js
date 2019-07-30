import React, { useState } from 'react';

import Modal from '../Modal/Modal';
import './Result.css';

function Result(props) {
  const result = props.result;
  const [isFavorited, setIsFavorited] = useState(!checkIfFavorited(result));
  const [showModal, setShowModal] = useState(false);

  function checkIfFavorited(data) {
    if(!localStorage.favorites) {
      return false;
    } else {
      let favorites = JSON.parse(localStorage.favorites);
      const id = result.trackId || result.collectionId;
      const type = result.kind || result.wrapperType;

      if(!favorites[type]) {
        return false;
      }

      for(let obj of favorites[type]) {
        if(obj.trackId === id || obj.collectionId === id) {
          return true;
        }
      }
      return false;
    }
  }

  function addToFavorites(e) {
    try {
      if(!localStorage.favorites) {
        const favorites = {}
        favorites[result.kind] = [result];
        localStorage.favorites = JSON.stringify(favorites);
        setIsFavorited(false)
      } else {
        let favorites = JSON.parse(localStorage.favorites);
        if(favorites[result.kind || result.wrapperType]) {
          favorites[result.kind || result.wrapperType].push(result);
        } else {
          favorites[result.kind || result.wrapperType] = [result];
        }
        localStorage.favorites = JSON.stringify(favorites);
        setIsFavorited(false)
      }
    } catch {
      alert("Something went wrong. Unable to add to favorites");
    }
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  return(
    <div className="result col-md-3 text-center">
      <a href={result.trackViewUrl} target="_blank" rel="noopener noreferrer">
        <img className="artwork" src={ result.artworkUrl100 } alt={ result.trackName }/>
      </a>
      <p className="title">{ result.trackName }</p>
      <p className="artist">{ result.artistName }</p>
      <p className="genre">{ result.primaryGenreName }</p>
      {result.previewUrl && <button className="action-btn btn btn-outline-primary btn-sm" onClick={toggleModal}>Preview</button>}
      <Modal showModal={showModal} url={result.previewUrl} toggleModal={toggleModal} />
      { isFavorited ?
        <button className="action-btn btn btn-sm btn-outline-light" onClick={ addToFavorites }>Favorite</button>
          :
        <div className="favorited placehold">Favorited</div>
      }
    </div>
  )
}

export default Result
