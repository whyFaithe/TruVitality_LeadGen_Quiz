import React from 'react';
import { motion } from 'framer-motion';

const ResultsBlock = ({ result, otherMatchClick }) => {
  const { imageLink, 
         productName,
         leadSentence, 
         description, 
         affLink,
         features } = result;

  return (
    <div className="results-container">
      <div className="result-content">
        <h3 className="results-title">Your perfect match is...</h3>
        <h1 className="results-subtitle">{`The "${productName}"`}</h1>
        <img className="result-img" src={imageLink} alt={productName} />
        <p className="result-lead_sentence">{leadSentence}</p>
        <p className="result-description">{description}</p>
        <ul className="result-list">
          {features.map((feature, index) => (
            <li key={index}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="quiz-btn-container">
        <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          className="aff-btn" href={affLink}>
          Shop Your Match Now!
         </motion.a>
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="new-match-btn" 
            onClick={otherMatchClick}>
            <i className="fas fa-random"></i>
            Find Another Match
        </motion.button>
      </div>
    </div>
  );
};

export default ResultsBlock;

