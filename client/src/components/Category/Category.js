import React from 'react';

import Result from '../Result/Result';
import './Category.css';

function Category(props) {
  return(
    <div className="category col-md-12">
      <h1 className="category-title">{props.type}s</h1>
      <div className="result-bg">
        {props.category.map(result => {
          return(
            <Result key={result.trackId || result.collectionId} result={result} />
          )
        })}
      </div>
    </div>
  )
}

export default Category;
