import React from 'react';

const ProgressBar = ({ finishedQuestions, totalQuestions }) => {
  const progressPercentage = (finishedQuestions / totalQuestions) * 100;
  return (
    <div className="quiz-progress">
      <div className="quiz-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
