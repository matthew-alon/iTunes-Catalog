import React, { useState } from 'react';

import Results from './components/Results/Results';
import './App.css';

function App() { 
  const [term, setTerm] = useState('');
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);

  function updateTerm(e) {
    setShowResults(false);
    setTerm(e.target.value);
  };

  function searchTerm(e) {
    if(e.keyCode === 13) {
      const data = { term };

      fetch('/search', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => {
          return response.json();
        }).then(json => {
          const arr = Object.keys(json.data).map(k => {return k})
          if(arr.length === 0) return alert("No results");
          setResults(json.data);
        });

      e.target.value = '';
    } else if(e.target.value === 'go') {
      const data = { term };

      fetch('/search', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => {
          return response.json();
        }).then(json => {
          const arr = Object.keys(json.data).map(k => {return k})
          if(arr.length === 0) return alert("No results");
          setResults(json.data);
        });
    };
    setShowResults(true);
  };

  function renderFavorites() {
    try {
      const favorites = JSON.parse(localStorage.favorites);
      setResults(favorites);
      setTerm('favorites')
      setShowResults(true);
    }
    catch(error) {
      alert('No Favorites')
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="input-group search-col col-md-4">
            <div className="input-group mb-3">
              <input className="search-input form-control" type="text" placeholder="Search" onChange={updateTerm} onKeyDown={searchTerm} />
              <div className="search-btn input-group-append">
                <button className="btn btn-outline-light" type="button" value="go" onClick={searchTerm}>Go</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button className="fav-btn btn btn-outline-info" onClick={ renderFavorites }>Favorites</button>
          </div>
        </div>
        { Object.keys(results).length > 0 &&
          <Results results={results} term={term} showResults={showResults}/>
        }
      </div>
    </div>
  );
}

export default App;
