import React from 'react';
import classes from './Logo.module.css';
import messageLogo from '../../assets/Hafod-logo.png';

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={messageLogo} alt="logo" />
    </div>
  );
};

export default Logo;
