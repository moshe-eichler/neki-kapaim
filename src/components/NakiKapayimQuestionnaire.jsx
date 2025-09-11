import React, { useState, useEffect } from 'react';
import { questionsConfig } from './questionsConfig';
import backgroundImg from '../static/background.jpg';
import logoImg from '../static/logo.png';

const NakiKapayimQuestionnaire = () => {
  const [currentPath, setCurrentPath] = useState('occupation');
  const [currentQuestion, setCurrentQuestion] = useState('occupation');
  const [answers, setAnswers] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [questionHistory, setQuestionHistory] = useState(['occupation']);
  const [answerDetails, setAnswerDetails] = useState([]);

  const getCurrentQuestionData = () => {
    if (currentQuestion === 'occupation') {
      return questionsConfig.occupation;
    }

    const pathQuestions = questionsConfig[currentPath];
    if (pathQuestions && pathQuestions[currentQuestion]) {
      return pathQuestions[currentQuestion];
    }

    const generalQuestions = questionsConfig['general-questions'];
    if (generalQuestions && generalQuestions[currentQuestion]) {
      return generalQuestions[currentQuestion];
    }

    return null;
  };

  const calculateAmount = (questionData, answer, previousAnswers = {}) => {
    if (questionData.amount && answer === 'yes') {
      return questionData.amount;
    }

    if (questionData.calculation) {
      switch (questionData.calculation) {
        case 'multiply-previous':
          const frequency = previousAnswers['error-frequency'] || previousAnswers['faithfulness-damage-amount'] || 1;
          const amount = typeof answer === 'number' ? answer : 0;
          return frequency * amount;

        case 'loan-calculation':
          const loanAmount = previousAnswers['loan-amount'] || 0;
          const loanFreq = previousAnswers['loan-frequency'] || 0;
          return Math.round((loanAmount * loanFreq) / 3);

        case 'neighbor-calculation':
          const neighborFreq = previousAnswers['neighbor-frequency'] || 0;
          return Math.round((neighborFreq * 10) / 3);

        case 'complex-time-calculation':
          const percentage = previousAnswers['inaccuracy-percentage'] || 0;
          const cost = previousAnswers['single-inaccuracy-cost'] || 0;
          const freq = typeof answer === 'number' ? answer : 0;
          return Math.round((percentage / 100) * cost * freq * 12); // Monthly calculation
      }
    }

    // if (typeof answer === 'number' && questionData.options && questionData.id != 'loan-frequency') {
    //   return answer;
    // }

    return 0;
  };

  const getQuestionText = (questionId) => {
    // Search in all question sections
    if (questionId === 'occupation') {
      return questionsConfig.occupation.text;
    }

    for (const [pathKey, pathQuestions] of Object.entries(questionsConfig)) {
      if (pathKey !== 'occupation' && pathQuestions[questionId]) {
        return pathQuestions[questionId].text;
      }
    }

    return questionId;
  };

  const getAnswerText = (questionId, answer) => {
    const questionData = getCurrentQuestionDataById(questionId);
    if (!questionData) return answer?.toString() || '';

    if (questionData.type === 'yes-no') {
      return answer === 'yes' ? 'כן' : 'לא';
    }

    if (questionData.options) {
      const option = questionData.options.find(opt => opt.value === answer);
      return option?.text || answer?.toString() || '';
    }

    return answer?.toString() || '';
  };

  const getCurrentQuestionDataById = (questionId) => {
    if (questionId === 'occupation') {
      return questionsConfig.occupation;
    }

    for (const [pathKey, pathQuestions] of Object.entries(questionsConfig)) {
      if (pathKey !== 'occupation' && pathQuestions[questionId]) {
        return pathQuestions[questionId];
      }
    }

    return null;
  };

  const handleAnswer = (answer) => {
    const questionData = getCurrentQuestionData();
    if (!questionData) return;

    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    // Calculate amount to add
    const amountToAdd = calculateAmount(questionData, answer, newAnswers);

    // Store answer details for summary
    const newAnswerDetails = [...answerDetails, {
      questionId: currentQuestion,
      questionText: questionData.text,
      answer: answer,
      answerText: getAnswerText(currentQuestion, answer),
      amount: amountToAdd
    }];
    setAnswerDetails(newAnswerDetails);

    if (amountToAdd > 0) {
      setTotalAmount(prev => prev + amountToAdd);
    }

    // Determine next question
    let nextQuestion = null;

    if (currentQuestion === 'occupation') {
      setCurrentPath(answer);
      const pathQuestions = questionsConfig[answer];
      nextQuestion = Object.keys(pathQuestions)[0];
    } else {
      if (questionData.type === 'yes-no') {
        nextQuestion = answer === 'yes' ? questionData.nextYes : questionData.nextNo;
      } else {
        nextQuestion = questionData.next;
      }

      // If we're in a path-specific section and the next question is general-questions,
      // move to general questions
      if (nextQuestion === 'general-questions') {
        setCurrentPath('general-questions');
        nextQuestion = 'small-loans';
      }

      // If we've reached the end
      if (nextQuestion === 'summary' || !nextQuestion) {
        setIsComplete(true);
        return;
      }
    }

    setCurrentQuestion(nextQuestion);
    setQuestionHistory(prev => [...prev, nextQuestion]);
  };

  const handleNext = () => {
    // Skip to next question without answering (if needed)
    const questionData = getCurrentQuestionData();
    if (!questionData) return;

    let nextQuestion = null;

    if (currentQuestion === 'occupation') {
      // Can't skip occupation question
      return;
    } else {
      if (questionData.type === 'yes-no') {
        nextQuestion = questionData.nextNo; // Default to "no" path
      } else {
        nextQuestion = questionData.next;
      }

      if (nextQuestion === 'general-questions') {
        setCurrentPath('general-questions');
        nextQuestion = 'small-loans';
      }

      if (nextQuestion === 'summary' || !nextQuestion) {
        setIsComplete(true);
        return;
      }
    }

    setCurrentQuestion(nextQuestion);
    setQuestionHistory(prev => [...prev, nextQuestion]);
  };

  const handleBack = () => {
    if (questionHistory.length <= 1) return;

    const newHistory = [...questionHistory];
    newHistory.pop(); // Remove current question
    const previousQuestion = newHistory[newHistory.length - 1];

    setQuestionHistory(newHistory);
    setCurrentQuestion(previousQuestion);

    // Remove the answer for the current question and its details
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);

    const newAnswerDetails = answerDetails.filter(detail => detail.questionId !== currentQuestion);
    setAnswerDetails(newAnswerDetails);

    // Recalculate total amount
    const newTotal = newAnswerDetails.reduce((sum, detail) => sum + detail.amount, 0);
    setTotalAmount(newTotal);
  };

  const handleFinishEarly = () => {
    setIsComplete(true);
  };

  const getProgress = () => {
    const totalQuestions = 25; // Approximate total questions
    return Math.min((questionHistory.length / totalQuestions) * 100, 100);
  };

  if (isComplete) {
    return (
      <div
        className="min-h-screen p-4"
        dir="rtl"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">סיכום השאלון</h2>
              <p className="text-gray-600">השאלון הושלם בהצלחה</p>
            </div>

            <div className="bg-teal-50 rounded-lg p-6 mb-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">הסכום הכולל להשבה:</p>
                <p className="text-4xl font-bold text-teal-600">{totalAmount.toLocaleString()} ש"ח</p>
              </div>
            </div>

            {/* Detailed Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">פירוט השאלות והתשובות:</h3>
              <div className="space-y-3">
                {answerDetails.map((detail, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{detail.questionText}</p>
                        <p className="text-sm text-teal-600">{detail.answerText}</p>
                      </div>
                      {detail.amount > 0 && (
                        <div className="text-sm font-semibold text-teal-700 mr-4">
                          +{detail.amount.toLocaleString()} ש"ח
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 mb-6">
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-2">שים לב!</p>
                <p className="mb-2">השאלון והסכומים הינם על פי השערה בלבד והם נועדו לסייע לך להגיע לחקר האמת.</p>
                <p className="mb-2">אין בדברים כדי להעיד על חוב כלשהו שלך.</p>
                <p>במידה והנך מעריך את התוצאות באופן שונה, עליך לשער את סכום ההשבה בעצמך.</p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={`https://ultra.kesherhk.info/external/paymentPage/317774?total=${totalAmount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors inline-block text-lg font-semibold"
              >
                עבור לתשלום - {totalAmount.toLocaleString()} ש"ח
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questionData = getCurrentQuestionData();
  if (!questionData) return null;

  return (
      <div
          className="min-h-screen p-4"
          dir="rtl"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
      >
        <div className="absolute top-4 left-4 w-60">
          <img src={logoImg} alt="Logo" className="w-full h-full" />
        </div>
        <div className="max-w-2xl mx-auto mt-[150px]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[50px] text-[#165965] font-[600] font-h1 mb-2">האם אני נקי כפיים?</h1>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">התקדמות</span>
                <span className="text-sm text-gray-600">שאלה {questionHistory.length} מתוך ~25</span>
                <span className="text-sm text-center text-gray-600 min-w-[50px]">{Math.round(getProgress())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{width: `${getProgress()}%`}}
                ></div>
              </div>
            </div>

            {/* Current Amount */}
            <div className="bg-teal-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">סכום נוכחי להשבה</p>
                <p className="text-2xl font-bold text-teal-600">{totalAmount.toLocaleString()} ש"ח</p>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center justify-end">
                {questionData.section && (
                    <h3 className="text-xl font-semibold text-[#b4cfd4]">
                      {questionData.section}
                    </h3>
                )}
                {questionData.icon && (
                    <img
                        src={questionData.icon}
                        alt="Question Icon"
                        className="w-8 h-8 mr-2 flex-shrink-0"
                    />
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center leading-relaxed flex items-center justify-center">
                {questionData.text}
              </h2>

              <div className="flex flex-wrap gap-3 justify-center">
                {questionData.type === 'yes-no' ? (
                    <>
                      <button
                          onClick={() => handleAnswer('yes')}
                          className="flex-1 min-w-[120px] max-w-[200px] p-4 text-right bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {questionData.iconYes ? (
                            <img
                                src={questionData.iconYes}
                                alt="Yes Icon"
                                className="w-6 h-6 mr-2 flex-shrink-0"
                            />
                        ) : (
                            <span className="text-2xl mr-2 flex-shrink-0">✅</span>
                        )}
                      </button>
                      <button
                          onClick={() => handleAnswer('no')}
                          className="flex-1 min-w-[120px] max-w-[200px] p-4 text-right bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {questionData.iconNo ? (
                            <img
                                src={questionData.iconNo}
                                alt="No Icon"
                                className="w-6 h-6 mr-2 flex-shrink-0"
                            />
                        ) : (
                            <span className="text-2xl mr-2 flex-shrink-0">❌</span>
                        )}
                      </button>
                    </>
                ) : (
                    questionData.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option.value)}
                            className="flex-1 min-w-[120px] max-w-[200px] p-4 text-right bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-lg transition-colors flex items-center justify-end"
                        >
                          {option.icon && (
                              <img
                                  src={option.icon}
                                  alt={`${option.text} Icon`}
                              />
                          )}
                          {/*{option.text}*/}
                        </button>
                    ))
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                  onClick={handleBack}
                  disabled={questionHistory.length <= 1}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                      questionHistory.length <= 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
              >
                חזור
              </button>

              <button
                  onClick={handleFinishEarly}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                סיים כעת
              </button>

              <button
                  onClick={handleNext}
                  disabled={currentQuestion === 'occupation'}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                      currentQuestion === 'occupation'
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
              >
                דלג
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NakiKapayimQuestionnaire;