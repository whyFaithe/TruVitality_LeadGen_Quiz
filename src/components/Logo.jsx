import React from 'react';

const Logo = ({ logo }) => {
  return logo ? <img className="quiz-logo" src={logo} alt="Quiz Logo" /> : null;
};

export default Logo;
