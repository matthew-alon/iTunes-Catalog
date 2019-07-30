import React from 'react';

import './Modal.css';

function Modal(props) {
  const showHideClassName = props.showModal ? "modal display-block" : "modal display-none";

  return(
    <div className={showHideClassName}>
      <section className="modal-main">
        <br />
        <audio controls preload="none" width="400px">
           <source src={props.url} type="audio/mp4" />
           <p>Your browser does not support HTML5 audio.</p>
         </audio>
         <br />
        <button className="btn btn-danger" onClick={props.toggleModal}>Close</button>
      </section>
    </div>
  )
}

export default Modal;
