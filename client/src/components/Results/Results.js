import React from 'react';

import Category from '../Category/Category';
import './Results.css';

function Results(props) {
  const results = props.results;

  return(
    <div>
      {props.showResults && <h4 className="show-results">Showing results for "{props.term}" from iTunes store</h4>}
      {
        Object.keys(results).map(type => {
          const category = results[type];
          return(<Category key={type} category={category} type={type} />)
        })
      }
    </div>
  )
}

export default Results
