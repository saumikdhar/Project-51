import React, { useState, useEffect } from 'react';
import classes from './SavedMessage.module.css';

const SavedMessage = props => {
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 5 seconds set the show value to false
      setShow(false);
    }, 3500);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return (
      <>
        <div
          style={{ transform: 'translateY(-100vh)', opacity: '0' }}
          className={classes.SavedMessage}
        >
          <p>Your changes were saved</p>
          {props.children}
        </div>
      </>
    );
  }

  // If show is true this will be returned
  return (
    <>
      {/*translateY(-100vh)*/}
      <div style={{ transform: 'translateY(0)', opacity: '1' }} className={classes.SavedMessage}>
        <p>Your changes were saved</p>
        {props.children}
      </div>
    </>
  );
};

export default SavedMessage;
