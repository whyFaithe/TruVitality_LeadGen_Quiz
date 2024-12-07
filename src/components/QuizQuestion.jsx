import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizQuestion = ({ questionNum, numOfQuestions, question, options, onSelect, selectedOption }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption); // Initialize with selected option

  const handleOptionClick = (option) => {
    setLocalSelectedOption(option.value);
  };

  const handleContinue = () => {
    if (localSelectedOption) {
      onSelect(localSelectedOption);
    }
  };

  return (
    <div className="quiz-content">
      <h2 className="quiz-title">{question}</h2>
       {questionNum === 1 && (
          <p className="quiz-disclaimer">
            Find your perfect ashwagandha product with this 5-question quiz!
          </p>
        )}
        
      <div className="quiz-options">
        {options.map((option, index) => (
          <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={index}
              className={`quiz-option ${localSelectedOption === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={question}
              value={option.value}
              checked={localSelectedOption === option.value}
              onChange={() => handleOptionClick(option)}
            />
            <div className="option-content">
              <p className="icon">{option.icon}</p>
              <p className="label">{option.label}</p>
            </div>
          </motion.label>
        ))}
      </div>
      <div className="quiz-btn-container">
  
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`quiz-continue-btn ${localSelectedOption && "active"}`} 
            onClick={handleContinue}
          >
            
            {localSelectedOption !== null && questionNum !== numOfQuestions? 
                "Continue"
                : "Get My Results!"
            }
            <i className="fa-solid fa-arrow-right"></i>
          </motion.button>
       
        
      </div>
    </div>
  );
};

export default QuizQuestion;
