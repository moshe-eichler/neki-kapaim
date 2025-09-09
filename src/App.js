import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calculator, User, Briefcase, Building, Users, DollarSign, CheckCircle, Home, Settings, FileText } from 'lucide-react';
import questionnaireConfig from './questionnaireConfig';

const App = () => {
  const config = questionnaireConfig;
  const [currentQuestionId, setCurrentQuestionId] = useState(config.startQuestion);
  const [answers, setAnswers] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);
  const [navigationHistory, setNavigationHistory] = useState([config.startQuestion]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isGeneralPhase, setIsGeneralPhase] = useState(false);
  const [pathCompletion, setPathCompletion] = useState(0);

  const iconMap = {
    User, Briefcase, Building, Users, DollarSign, CheckCircle, Home, Settings, FileText
  };

  const questions = config.questions;
  const currentQuestion = questions[currentQuestionId];
  const generalQuestions = config.generalQuestions;

  // Calculate total questions for progress bar
  const getTotalQuestionsForPath = () => {
    if (!selectedPath) return Object.keys(questions).length;
    const pathTotal = config.paths[selectedPath]?.totalQuestions || 0;
    return pathTotal + generalQuestions.totalQuestions;
  };

  const totalQuestions = getTotalQuestionsForPath();
  const currentQuestionNumber = currentIndex + 1;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const isGeneralQuestion = () => generalQuestions.questions.includes(currentQuestionId);

  // Debt calculation function
  const calculateDebtForQuestion = (questionId, value, allAnswers) => {
    const question = questions[questionId];
    if (!question?.debtCalculation) return 0;

    const calc = question.debtCalculation;
    let debt = 0;

    switch (calc.type) {
      case 'simple':
        const option = question.options?.find(opt => opt.value === value);
        debt = option?.amount || (typeof value === 'number' ? value * (calc.amount || 0) : 0);
        break;

      case 'formula':
        let formula = calc.formula || '';
        formula = formula.replace(/years|clients|commissionRate/g, value.toString());
        const prevTotal = calculateTotalDebt(allAnswers, questionId);
        formula = formula.replace(/previousAmount|previousTotal/g, prevTotal.toString());
        try {
          debt = eval(formula) || 0; // TODO: Replace eval with mathjs in production
        } catch (e) {
          console.error('Formula error:', e);
          debt = 0;
        }
        break;

      case 'client_based':
      case 'experience_service':
      case 'business_maturity':
      case 'commission_based':
      case 'broker_experience_based':
      case 'age_based':
      case 'expenses_based':
        let baseDebt = 0;
        calc.conditions?.forEach(condition => {
          try {
            if (eval(condition.if.replace('clients|years|expenses|commissionRate', value.toString()))) {
              const thenValue = eval(condition.then) || 0;
              baseDebt += thenValue;
            }
          } catch (e) {
            console.error('Condition error:', e);
          }
        });
        debt = baseDebt;
        break;

      default:
        debt = 0;
    }

    const globals = config.processingRules.debtCalculationEngine.globalMultipliers || {};
    Object.values(globals).forEach(multiplier => {
      debt *= multiplier;
    });

    return Math.round(debt);
  };

  const calculateTotalDebt = (allAnswers, excludeQuestionId = null) => {
    let debt = 0;
    Object.keys(allAnswers).forEach(questionId => {
      if (questionId === excludeQuestionId) return;
      const answer = allAnswers[questionId];
      if (questions[questionId]) {
        debt += calculateDebtForQuestion(questionId, answer, allAnswers);
      }
    });
    return debt;
  };

  useEffect(() => {
    setTotalDebt(calculateTotalDebt(answers));
  }, [answers]);

  // Handle answer submission
  const handleAnswer = (value) => {
    if (!validateAnswer(value)) return;

    const newAnswers = { ...answers, [currentQuestionId]: value };
    setAnswers(newAnswers);

    if (currentQuestionId === 'occupation') {
      const selectedOption = currentQuestion.options?.find(opt => opt.value === value);
      setSelectedPath(selectedOption?.metadata?.path || null);
      console.log('Selected Path:', selectedOption?.metadata?.path);
    }

    let nextQuestionId = null;
    if (currentQuestion.type === 'multiple') {
      const selectedOption = currentQuestion.options?.find(opt => opt.value === value);
      nextQuestionId = selectedOption?.nextQuestion || currentQuestion.nextQuestion;
    } else {
      nextQuestionId = currentQuestion.nextQuestion;
    }

    console.log('Current Question:', currentQuestionId, 'Next Question:', nextQuestionId, 'Is General Phase:', isGeneralPhase);

    if (!nextQuestionId && selectedPath && !isGeneralPhase) {
      const pathQuestions = config.paths[selectedPath]?.questions || [];
      const pathAnswered = pathQuestions.every(q => newAnswers[q]);
      console.log('Path Questions:', pathQuestions, 'Answered:', pathAnswered);

      if (pathAnswered) {
        setIsGeneralPhase(true);
        setPathCompletion(pathQuestions.length);
        nextQuestionId = generalQuestions.questions[0];
        console.log('Moving to general phase, first question:', nextQuestionId);
      } else {
        const unanswered = pathQuestions.find(q => !newAnswers[q]);
        if (unanswered) {
          nextQuestionId = unanswered;
          console.log('Found unanswered path question:', nextQuestionId);
        }
      }
    } else if (isGeneralPhase && currentQuestionId === generalQuestions.questions[generalQuestions.questions.length - 1]) {
      nextQuestionId = null;
      console.log('End of general questions, completing questionnaire');
    }

    if (nextQuestionId && questions[nextQuestionId]) {
      const newHistory = [...navigationHistory.slice(0, currentIndex + 1), nextQuestionId];
      setNavigationHistory(newHistory);
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestionId(nextQuestionId);
    } else if (!nextQuestionId && isGeneralPhase) {
      console.log('Questionnaire completed');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentQuestionId(navigationHistory[newIndex]);

      const newAnswers = { ...answers };
      for (let i = newIndex + 1; i < navigationHistory.length; i++) {
        delete newAnswers[navigationHistory[i]];
      }
      setAnswers(newAnswers);
      setNavigationHistory(navigationHistory.slice(0, newIndex + 1));

      if (newIndex < (config.paths[selectedPath]?.totalQuestions || 0)) {
        setIsGeneralPhase(false);
      }
    }
  };

  const goForward = () => {
    const currentAnswer = answers[currentQuestionId];
    if (!currentAnswer || !validateAnswer(currentAnswer)) return;
    handleAnswer(currentAnswer);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = answers[currentQuestionId] && (currentQuestion.nextQuestion || (!isGeneralPhase && selectedPath && !config.paths[selectedPath]?.questions.every(q => answers[q])) || (isGeneralPhase && currentQuestionId !== generalQuestions.questions[generalQuestions.questions.length - 1]));
  const isCompleted = answers[currentQuestionId] && !currentQuestion.nextQuestion && isGeneralPhase && currentQuestionId === generalQuestions.questions[generalQuestions.questions.length - 1];

  const validateAnswer = (value) => {
    if (!value || !currentQuestion.validation) return true;
    const validation = currentQuestion.validation;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return false;
    if (validation.min !== undefined && numValue < validation.min) return false;
    if (validation.max !== undefined && numValue > validation.max) return false;
    if (validation.customRules) {
      return validation.customRules.every(rule => {
        try {
          return eval(rule.rule.replace('value', numValue.toString()));
        } catch (e) {
          console.error('Validation rule error:', e);
          return false;
        }
      });
    }
    return true;
  };

  const IconComponent = iconMap[currentQuestion.icon] || User;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">שאלון חישוב חובות</h1>
          <p className="text-gray-600">מלא את השאלון כדי לקבל הערכת החובות שלך</p>
          {selectedPath && <p className="text-sm text-indigo-600 mt-2">מסלול: {selectedPath} {isGeneralPhase ? '(שאלות כלליות)' : ''}</p>}
        </div>

        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">התקדמות</span>
            <span className="text-sm font-medium text-indigo-600">
              שאלה {currentQuestionNumber} מתוך {totalQuestions} ({Math.round(progress)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {navigationHistory.map((qId, index) => (
              <span
                key={qId}
                className={`px-2 py-1 rounded ${index === currentIndex
                  ? 'bg-indigo-100 text-indigo-800 font-medium'
                  : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {questions[qId]?.question.substring(0, 15)}...
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border-r-4 border-red-500">
          <div className="flex items-center">
            <Calculator className="text-red-500 ml-3" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">סה״כ חוב משוער</h3>
              <p className="text-2xl font-bold text-red-600">₪{totalDebt.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {currentQuestion && (
          <div className="bg-white rounded-xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <IconComponent className="text-indigo-600 ml-3" size={28} />
              <h2 className="text-xl font-semibold text-gray-800">
                {currentQuestion.question}
                {currentQuestion.subtitle && <p className="text-sm text-gray-600 mt-1">{currentQuestion.subtitle}</p>}
              </h2>
            </div>

            {answers[currentQuestionId] && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-700">תשובה נוכחית: </span>
                <strong className="text-green-800">
                  {currentQuestion.type === 'multiple'
                    ? currentQuestion.options?.find(opt => opt.value === answers[currentQuestionId])?.label
                    : answers[currentQuestionId]
                  }
                </strong>
              </div>
            )}

            {!validateAnswer(answers[currentQuestionId]) && answers[currentQuestionId] && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-sm text-red-700">שגיאת ולידציה - אנא תקן</span>
              </div>
            )}

            {currentQuestion.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    disabled={currentQuestion.required && !validateAnswer(option.value)}
                    className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 group ${answers[currentQuestionId] === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                      } ${!validateAnswer(option.value) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-800 font-medium">{option.label}</span>
                        {option.description && <p className="text-sm text-gray-500">{option.description}</p>}
                        {option.amount && (
                          <span className="block text-sm text-red-500 mt-1">
                            +₪{option.amount.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <ChevronLeft className={`${answers[currentQuestionId] === option.value
                        ? 'text-green-500'
                        : 'text-gray-400 group-hover:text-indigo-500'
                        }`} size={20} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'input' && (
              <div className="space-y-4">
                <input
                  type={currentQuestion.inputType || 'text'}
                  placeholder="הכנס את התשובה..."
                  value={answers[currentQuestionId] || ''}
                  className={`w-full p-4 rounded-xl border-2 ${!validateAnswer(answers[currentQuestionId]) ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
                    } focus:outline-none text-right text-lg`}
                  onChange={(e) => {
                    const newVal = currentQuestion.inputType === 'number' ? parseFloat(e.target.value) : e.target.value;
                    if (!isNaN(newVal) || typeof newVal === 'string') {
                      handleAnswer(newVal);
                    }
                  }}
                />
                <p className="text-sm text-gray-500">לחץ Enter או שנה כדי לעדכן</p>

                {currentQuestion.debtCalculation?.description && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm text-blue-700">
                      💡 {currentQuestion.debtCalculation.description}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
              <button
                onClick={goBack}
                disabled={!canGoBack}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${canGoBack
                  ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  : 'text-gray-300 cursor-not-allowed'
                  }`}
              >
                <ChevronRight size={20} className="ml-2" />
                שאלה קודמת
              </button>

              {canGoForward && (
                <button
                  onClick={goForward}
                  disabled={!validateAnswer(answers[currentQuestionId])}
                  className="flex items-center px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 disabled:opacity-50"
                >
                  שאלה הבאה
                  <ChevronLeft size={20} className="mr-2" />
                </button>
              )}
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="text-green-600 mx-auto mb-3" size={48} />
            <h3 className="text-xl font-semibold text-green-800 mb-2">השאלון הושלם!</h3>
            <p className="text-green-700 mb-4">
              הסכום הכולל שאתה חייב הוא: <strong>₪{totalDebt.toLocaleString()}</strong>
            </p>

            <div className="text-right bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">סיכום התשובות:</h4>
              <div className="space-y-2 text-sm">
                {navigationHistory.map(qId => {
                  const q = questions[qId];
                  const ans = answers[qId];
                  return (
                    <div key={qId} className="flex justify-between">
                      <span className="text-gray-600">
                        {q.type === 'multiple'
                          ? q.options?.find(opt => opt.value === ans)?.label
                          : ans
                        }
                      </span>
                      <span className="font-medium">{q.question}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {config.uiConfiguration.messages.dynamic_messages.low_debt && totalDebt < 1000 && (
              <p className="text-green-600 mt-4">{config.uiConfiguration.messages.dynamic_messages.low_debt}</p>
            )}
            {config.uiConfiguration.messages.dynamic_messages.high_debt && totalDebt > 5000 && (
              <p className="text-red-600 mt-4">{config.uiConfiguration.messages.dynamic_messages.high_debt}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
