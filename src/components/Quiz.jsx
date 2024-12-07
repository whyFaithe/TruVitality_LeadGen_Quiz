import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import ProgressBar from './ProgressBar';
import QuizQuestion from './QuizQuestion';
import ResultsBlock from './ResultsBlock';
import imageLogo from '../images/TruVitality_logo_white.svg';
import imageA from '../images/moment_adaptogen_drink.jpg';
import imageB from '../images/L-Theanine_Alphawave_pill.jpg';
import imageC from '../images/sea_moss_supplement.jpg';
import imageD from '../images/Pure_Ashwa_pill.jpg';
import imageE from '../images/Ashwa_goli_gummy.webp';
import imageF from '../images/ashwa_chocolate_drink.jpg';

const LoadingIndicator = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Finding your perfect match...</p>
  </div>
);

const Quiz = () => {
  const [finishedQuestions, setFinishedQuestions] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const quizTrackRef = useRef(null);
  const panelRefs = useRef([]);

  const questions = [
    {
      id: 1,
      question: `Have you tried Ashwagandha before?`,
      options: [
        { icon: '😊', label: 'Yes and I would like to expand my horizons!', key: '', value: 'yes' },
        { icon: '🤔', label: `No, but I'm interested in trying it out.`, key: '', value: 'no' },
      ],
    },
    {
      id: 2,
      question: `What's your primary wellness goal?`,
      options: [
        { icon: '😌', label: 'Stress relief', key: 'goal', value: 'stress' },
        { icon: '🎯', label: 'Improved focus', key: 'goal', value: 'focus' },
        { icon: '⚡', label: 'Energy boost', key: 'goal', value: 'energy' },
        { icon: '🌿', label: 'Overall wellness', key: 'goal', value: 'wellness' },
      ],
    },
    {
      id: 3,
      question: 'How do you prefer to take your supplements?',
      options: [
        { icon: '🥤', label: 'As a drink', key: 'form', value: 'drink' },
        { icon: '💊', label: 'As a pill or capsule', key: 'form', value: 'supplement' },
        { icon: '🍬', label: 'As a gummy', key: 'form', value: 'gummy' },
      ],
    },
    {
      id: 4,
      question: 'Do you have any additional preferences?',
      options: [
        { icon: '🦠', label: 'Contains probiotics', key: 'extra', value: 'probiotics' },
        { icon: '🚀', label: 'Extra energy boost', key: 'extra', value: 'energy' },
        { icon: '🧘‍♂️', label: 'Promotes calmness', key: 'extra', value: 'calm' },
        { icon: '✅', label: 'No additional preferences', key: 'extra', value: 'none' },
      ],
    },
    {
      id: 5,
      question: 'Which is more important to you?',
      options: [
        { icon: '😋', label: 'Great taste', key: 'priority', value: 'taste' },
        { icon: '💪', label: 'High potency', key: 'priority', value: 'potency' },
        { icon: '⚖️', label: 'Balance of both', key: 'priority', value: 'balance' },
      ],
    },
  ];

  const products = [
    {
      id: 1,
      imageLink: imageA,
      productName: 'Moment Adaptogen Drink',
      leadSentence: 'Focus and stress relief with L-Theanine & Ashwagandha in a delicious drink form.',
      description: `Moment Adaptogen Drink combines the power of L-Theanine and Ashwagandha to provide focus and stress relief in a tasty, convenient drink. With zero added sugar and only 15-20 calories per serving, it's a guilt-free way to support your wellness goals.`,
      features: ['L-Theanine & Ashwagandha for Focus & Stress Relief', '0 Added Sugar, 15-20 Calories', '0 Alcohol 0 Caffeine'],
      affLink: 'https://amzn.to/3MvQG4y',
      form: 'drink',
      benefits: ['stress relief', 'focus', 'energy', 'wellness'],
    },
    {
      id: 2,
      imageLink: imageB,
      productName: 'Live Conscious KSM-66 Ashwagandha Supplement',
      leadSentence: 'ZenWell Everyday Stress Relief, Mood Support, Cognitive, Brain Health in capsule form.',
      description: 'Live Conscious KSM-66 Ashwagandha Supplement offers a powerful blend of Ashwagandha, L-Theanine, and AlphaWave for comprehensive support. This supplement is designed to help with stress relief, mood enhancement, and cognitive function.',
      features: ['Includes L-Theanine & AlphaWave', 'Great for stress relief and cognitive support', 'Potent supplement for daily wellness'],
      affLink: 'https://amzn.to/4gbSJZ6',
      form: 'supplement',
      benefits: ['stress relief', 'focus', 'wellness'],
    },
    {
      id: 3,
      imageLink: imageC,
      productName: 'Sea Moss & Black Seed Oil Supplement',
      leadSentence: 'A potent blend for energy, wellness, and immune support.',
      description: `This comprehensive supplement combines Sea Moss, Black Seed Oil, Ashwagandha, and other beneficial ingredients to support overall health and vitality. It's an excellent choice for those looking for a multi-faceted approach to wellness.`,
      features: ['3000mg Sea Moss, 2000mg Black Seed Oil, 1000mg Ashwagandha', 'Includes Turmeric, Bladderwrack, and more', 'Perfect for comprehensive health support'],
      affLink: 'https://amzn.to/3z0n508',
      form: 'supplement',
      benefits: ['energy', 'wellness'],
    },
    {
      id: 4,
      imageLink: imageD,
      productName: 'Pure Ashwagandha Supplement',
      leadSentence: 'A straightforward, potent Ashwagandha supplement for stress relief and wellness.',
      description: `For those who prefer a no-frills approach, this Pure Ashwagandha Supplement delivers a high-potency dose of Ashwagandha root extract. It's ideal for supporting stress management and overall health without any additional ingredients.`,
      features: ['High potency Ashwagandha root extract', 'Great for those who want pure Ashwagandha without additives', 'Supports stress management and overall health'],
      affLink: 'https://amzn.to/3XcYn4A',
      form: 'supplement',
      benefits: ['stress relief', 'wellness'],
    },
    {
      id: 5,
      imageLink: imageE,
      productName: 'Ashwa Gummies',
      leadSentence: 'Delicious gummies with KSM-66® Ashwagandha & Vitamin D for daily wellness.',
      description: 'Ashwa Gummies offer a tasty and convenient way to incorporate Ashwagandha into your daily routine. Featuring highly bioavailable KSM-66® Ashwagandha and Vitamin D, these gummies support overall wellness in a fun, chewable form.',
      features: ['Highly bioavailable KSM-66® Ashwagandha', 'Includes Vitamin D', 'Tasty and easy to consume'],
      affLink: 'https://goli.com/pages/goli-ashwagandha',
      form: 'gummy',
      benefits: ['wellness', 'stress relief'],
    },
    {
      id: 6,
      imageLink: imageF,
      productName: 'Chocolate Ashwagandha Powder with Probiotics',
      leadSentence: 'A tasty hot chocolate and smoothie mix with probiotics and Ashwagandha.',
      description: `Indulge in the benefits of Ashwagandha with this delicious Chocolate Ashwagandha Powder. Packed with probiotics and prebiotic fiber, it's perfect for those who want to support their gut health while enjoying the stress-relieving benefits of Ashwagandha.`,
      features: ['Organic Ashwagandha Root Extract & Cacao Powder', 'Includes prebiotic fiber for gut health', 'Versatile use in smoothies or as a hot chocolate'],
      affLink: 'https://amzn.to/3TfEicJ',
      form: 'drink',
      benefits: ['wellness', 'stress relief'],
    },
  ];

  const handleSelect = (key, value) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    setFinishedQuestions(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (finishedQuestions === questions.length) {
      finishQuiz();
    }
  }, [finishedQuestions]);

  const finishQuiz = () => {
    setIsLoading(true);
    const matches = findMatches();
    setMatchedProducts(matches);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const findMatches = () => {
  const productScores = products.map(product => {
    let score = 0;

    // Give a higher score if the form matches the selected form
    if (product.form === selectedOptions.form) {
      score += 5; // Increase this value to give more weight to the form match
    }

    // Add points for matching benefits
    score += product.benefits.filter(benefit => 
      benefit === selectedOptions.goal || 
      benefit === selectedOptions.extra
    ).length;

    return { ...product, score };
  });

  // Filter out products with a score of 0
  const filteredProductScores = productScores.filter(product => product.score > 0);
  
  // Sort by score descending
  filteredProductScores.sort((a, b) => b.score - a.score);
  
  return filteredProductScores;
};


  const handleFindAnotherMatch = () => {
    setCurrentMatchIndex((prevIndex) => (prevIndex + 1) % matchedProducts.length);
  };

  return (
    <div className="quiz-section">
      <div className="quiz-heading">
        <Logo logo={imageLogo} />
        {
          !showResults && finishedQuestions !== 0 &&
          (<ProgressBar finishedQuestions={finishedQuestions} totalQuestions={questions.length} />)
        }
      </div>
      <div className="quiz-container">
        {isLoading ? (
          <LoadingIndicator />
        ) : showResults ? (
          <div className="result-panel">
            <ResultsBlock 
              result={matchedProducts[currentMatchIndex]} 
              otherMatchClick={handleFindAnotherMatch}
            />  
          </div>
        ) : (
          <ul className="quiz-track" ref={quizTrackRef}>
            {questions.map((question, index) => (
              <li
                className="quiz-panel"
                key={question.id}
                ref={(el) => (panelRefs.current[index] = el)}
                style={{ display: index === finishedQuestions ? 'block' : 'none' }}
              >
                <QuizQuestion
                  numOfQuestions={questions.length}
                  questionNum={index + 1}
                  question={question.question}
                  options={question.options}
                  onSelect={(value) => {
                    const selectedOption = question.options.find(opt => opt.value === value);
                    if (selectedOption) {
                      handleSelect(selectedOption.key, selectedOption.value);
                    }
                  }}
                  selectedOption={selectedOptions[question.options[0].key]}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Quiz;