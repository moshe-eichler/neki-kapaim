const questionnaireConfig = {
    // שאלה התחלתית - בחירת מסלול
    startQuestion: 'occupation',

    // הגדרת מסלולים - כל מסלול כולל רשימת שאלות ספציפיות
    paths: {
        avrech: {
            questions: ['avrech_stipend', 'study_years'],
            totalQuestions: 2
        },
        employee: {
            questions: ['salary_range', 'work_years'],
            totalQuestions: 2
        },
        self_employed: {
            questions: ['business_type', 'service_details', 'client_count', 'service_years', 'product_details', 'monthly_revenue', 'business_years', 'broker_details', 'commission_rate', 'broker_experience'],
            totalQuestions: 10 // מסלול ארוך יותר, תלוי בבחירות פנימיות
        }
    },

    // שאלות כלליות - מופיעות אחרי כל מסלול
    generalQuestions: {
        questions: ['age', 'family_status', 'monthly_expenses'], // דוגמה לשאלות כלליות - ניתן להרחיב
        totalQuestions: 3
    },

    // שאלות - הגדרות מלאות
    questions: {
        // שאלת בחירת מסלול
        occupation: {
            id: 'occupation',
            question: 'מה אתה עוסק?',
            type: 'multiple',
            icon: 'User',
            required: true,
            options: [
                {
                    value: 'avrech',
                    label: 'אברך',
                    nextQuestion: 'avrech_stipend',
                    metadata: { path: 'avrech', riskLevel: 'low' }
                },
                {
                    value: 'employee',
                    label: 'שכיר',
                    nextQuestion: 'salary_range',
                    metadata: { path: 'employee', riskLevel: 'medium' }
                },
                {
                    value: 'self_employed',
                    label: 'עצמאי',
                    nextQuestion: 'business_type',
                    metadata: { path: 'self_employed', riskLevel: 'high' }
                }
            ]
        },

        // === מסלול אברך ===
        avrech_stipend: {
            id: 'avrech_stipend',
            question: 'איזה קולל אתה לומד?',
            type: 'multiple',
            icon: 'Building',
            required: true,
            options: [
                { value: 'main_kollel', label: 'קולל ראשי', amount: 2500, nextQuestion: 'study_years', metadata: { stability: 'high' } },
                { value: 'local_kollel', label: 'קולל מקומי', amount: 1800, nextQuestion: 'study_years', metadata: { stability: 'medium' } },
                { value: 'evening_kollel', label: 'קולל ערב', amount: 1200, nextQuestion: 'study_years', metadata: { stability: 'low' } }
            ],
            debtCalculation: {
                type: 'simple',
                formula: 'amount * 0.1', // 10% מהמלגה
                description: 'חישוב חוב ראשוני לפי סוג הקולל'
            }
        },

        study_years: {
            id: 'study_years',
            question: 'כמה שנים אתה לומד?',
            subtitle: 'ותק בלימודים משפיע על יציבות',
            type: 'input',
            inputType: 'number',
            icon: 'CheckCircle',
            required: true,
            validation: {
                min: 0,
                max: 50,
                step: 1,
                customRules: [{ rule: 'value > 0', message: 'חייב להיות לפחות שנה אחת' }]
            },
            nextQuestion: null, // סוף מסלול אברך - עובר לשאלות כלליות
            debtCalculation: {
                type: 'formula',
                formula: 'previousAmount * years * 0.1',
                variables: { previousAmount: 'fromPreviousQuestion' },
                description: '10% מהמלגה השנתית כחוב משוער'
            }
        },

        // === מסלול שכיר ===
        salary_range: {
            id: 'salary_range',
            question: 'איזה טווח משכורת?',
            type: 'multiple',
            icon: 'DollarSign',
            required: true,
            options: [
                { value: 'low', label: 'עד 8,000 ₪', amount: 500, nextQuestion: 'work_years', metadata: { volatility: 'low' } },
                { value: 'medium', label: '8,000-15,000 ₪', amount: 1200, nextQuestion: 'work_years', metadata: { volatility: 'medium' } },
                { value: 'high', label: 'מעל 15,000 ₪', amount: 2000, nextQuestion: 'work_years', metadata: { volatility: 'high' } }
            ],
            debtCalculation: {
                type: 'simple',
                amount: 'fromOption',
                description: 'חוב ראשוני לפי טווח משכורת'
            }
        },

        work_years: {
            id: 'work_years',
            question: 'כמה שנים אתה עובד?',
            subtitle: 'ותק בעבודה משפיע על יציבות',
            type: 'input',
            inputType: 'number',
            icon: 'Briefcase',
            required: true,
            validation: {
                min: 0,
                max: 40,
                step: 1
            },
            nextQuestion: null, // סוף מסלול שכיר - עובר לשאלות כלליות
            debtCalculation: {
                type: 'formula',
                formula: 'previousAmount * years * 0.05',
                variables: { previousAmount: 'fromPreviousQuestion' },
                description: '5% מהמשכורת השנתית כחוב משוער'
            }
        },

        // === מסלול עצמאי ===
        business_type: {
            id: 'business_type',
            question: 'איזה סוג עסק?',
            subtitle: 'סוג העסק קובע את אופן חישוב החוב והסיכונים',
            type: 'multiple',
            icon: 'Building',
            required: true,
            options: [
                {
                    value: 'service',
                    label: 'נותן שירות',
                    description: 'שירותים מקצועיים, ייעוץ, טיפולים',
                    nextQuestion: 'service_details',
                    metadata: {
                        riskLevel: 'medium',
                        volatility: 'low',
                        category: 'service-provider',
                        averageMargin: 0.7,
                        subPathLength: 2 // service_details + client_count + service_years = 3, but adjust
                    }
                },
                {
                    value: 'products',
                    label: 'מוכר מוצרים',
                    description: 'מסחר, קמעונאות, סיטונאות',
                    nextQuestion: 'product_details',
                    metadata: {
                        riskLevel: 'high',
                        volatility: 'high',
                        category: 'retail',
                        averageMargin: 0.3,
                        subPathLength: 2 // product_details + monthly_revenue + business_years = 3
                    }
                },
                {
                    value: 'broker',
                    label: 'מתווך',
                    description: 'תיווך נדל״ן, ביטוח, השקעות',
                    nextQuestion: 'broker_details',
                    metadata: {
                        riskLevel: 'very-high',
                        volatility: 'very-high',
                        category: 'commission-based',
                        seasonality: true,
                        subPathLength: 2 // broker_details + commission_rate + broker_experience = 3
                    }
                }
            ],
            messages: {
                help: 'בחר את הסוג העיקרי של העסק שלך',
                info: 'כל סוג עסק מחושב בצורה שונה בהתאם לסיכונים הייחודיים'
            }
        },

        // פרטי נותני שירות (תת-מסלול service)
        service_details: {
            id: 'service_details',
            question: 'איזה סוג שירות אתה נותן?',
            type: 'multiple',
            icon: 'Users',
            required: true,
            options: [
                { value: 'professional', label: 'שירות מקצועי (עו״ד, רו״ח, אדריכל)', nextQuestion: 'client_count', metadata: { stability: 'high' } },
                { value: 'technical', label: 'שירותים טכניים (מחשבים, תיקונים)', nextQuestion: 'client_count', metadata: { stability: 'medium' } },
                { value: 'personal', label: 'שירותים אישיים (מורה, מטפל)', nextQuestion: 'client_count', metadata: { stability: 'medium' } },
                { value: 'creative', label: 'שירותים יצירתיים (עיצוב, צילום)', nextQuestion: 'client_count', metadata: { stability: 'low' } }
            ]
        },

        client_count: {
            id: 'client_count',
            question: 'עם כמה לקוחות אתה עובד בממוצע?',
            subtitle: 'מספר לקוחות קבועים בחודש טיפוסי',
            type: 'input',
            inputType: 'number',
            icon: 'Users',
            required: true,
            nextQuestion: 'service_years',
            validation: {
                min: 1,
                max: 500,
                step: 1,
                customRules: [{ rule: 'value > 0', message: 'חייב להיות לפחות לקוח אחד' }]
            },
            debtCalculation: {
                type: 'client_based',
                formula: 'clients * clientValue * riskFactor * diversificationFactor',
                variables: {
                    clientValue: 150,
                    riskFactor: 'serviceType',
                    diversificationFactor: 'calculated'
                },
                conditions: [
                    { if: 'clients < 5', then: 'concentrationRisk = 1.5' },
                    { if: 'clients > 50', then: 'diversificationBonus = 0.8' },
                    { if: 'clients > 100', then: 'scaleBonus = 0.7' }
                ],
                description: 'חישוב לפי מספר לקוחות וסוג השירות'
            }
        },

        service_years: {
            id: 'service_years',
            question: 'כמה שנים אתה נותן שירותים?',
            subtitle: 'ותק בתחום משפיע על יציבות העסק',
            type: 'input',
            inputType: 'number',
            icon: 'CheckCircle',
            required: true,
            nextQuestion: null, // סוף תת-מסלול service - עובר לשאלות כלליות
            validation: {
                min: 0,
                max: 30,
                step: 1
            },
            debtCalculation: {
                type: 'experience_service',
                formula: 'previousTotal + (years * experienceBonus) - stabilityDiscount',
                variables: {
                    experienceBonus: 200,
                    stabilityDiscount: 'calculated'
                },
                conditions: [
                    { if: 'years > 5', then: 'stabilityDiscount = years * 50' },
                    { if: 'years < 1', then: 'newBusinessRisk = 500' },
                    { if: 'years > 15', then: 'veteranBonus = 1000' }
                ]
            }
        },

        // פרטי מוכרי מוצרים (תת-מסלול products)
        product_details: {
            id: 'product_details',
            question: 'איזה סוג מוצרים אתה מוכר?',
            type: 'multiple',
            icon: 'Building',
            required: true,
            options: [
                { value: 'food', label: 'מזון ומשקאות', nextQuestion: 'monthly_revenue', metadata: { margin: 0.2, volatility: 'low' } },
                { value: 'fashion', label: 'אופנה ובגדים', nextQuestion: 'monthly_revenue', metadata: { margin: 0.4, volatility: 'high' } },
                { value: 'electronics', label: 'אלקטרוניקה', nextQuestion: 'monthly_revenue', metadata: { margin: 0.15, volatility: 'medium' } },
                { value: 'other', label: 'אחר', nextQuestion: 'monthly_revenue', metadata: { margin: 0.3, volatility: 'medium' } }
            ]
        },

        monthly_revenue: {
            id: 'monthly_revenue',
            question: 'מה המחזור החודשי הממוצע?',
            subtitle: 'מחזור ללא מע״מ בחודש טיפוסי',
            type: 'multiple',
            icon: 'DollarSign',
            required: true,
            options: [
                {
                    value: 'very_low',
                    label: 'עד 10,000 ₪',
                    amount: 400,
                    nextQuestion: 'business_years',
                    metadata: { scale: 'micro', riskMultiplier: 1.2 }
                },
                {
                    value: 'low',
                    label: '10,000-20,000 ₪',
                    amount: 800,
                    nextQuestion: 'business_years',
                    metadata: { scale: 'small', riskMultiplier: 1.0 }
                },
                {
                    value: 'medium',
                    label: '20,000-50,000 ₪',
                    amount: 2000,
                    nextQuestion: 'business_years',
                    metadata: { scale: 'medium', riskMultiplier: 0.9 }
                },
                {
                    value: 'high',
                    label: '50,000-100,000 ₪',
                    amount: 4000,
                    nextQuestion: 'business_years',
                    metadata: { scale: 'large', riskMultiplier: 0.8 }
                },
                {
                    value: 'very_high',
                    label: 'מעל 100,000 ₪',
                    amount: 7000,
                    nextQuestion: 'business_years',
                    metadata: { scale: 'enterprise', riskMultiplier: 0.7 }
                }
            ]
        },

        business_years: {
            id: 'business_years',
            question: 'כמה שנים העסק פעיל?',
            subtitle: 'ותק העסק משפיע על רמת הסיכון והיציבות',
            type: 'input',
            inputType: 'number',
            icon: 'Briefcase',
            required: true,
            nextQuestion: null, // סוף תת-מסלול products - עובר לשאלות כלליות
            validation: {
                min: 0,
                max: 50,
                step: 1
            },
            debtCalculation: {
                type: 'business_maturity',
                formula: 'baseAmount * years * maturityMultiplier * scaleBonus',
                variables: {
                    maturityMultiplier: 0.08,
                    scaleBonus: 'fromRevenue'
                },
                conditions: [
                    { if: 'years < 2', then: 'startupRisk = 1.5' },
                    { if: 'years > 10', then: 'establishedBonus = 0.7' },
                    { if: 'years > 20', then: 'veteranBusinessBonus = 0.5' }
                ]
            }
        },

        // פרטי מתווכים (תת-מסלול broker)
        broker_details: {
            id: 'broker_details',
            question: 'באיזה תחום אתה מתווך?',
            type: 'multiple',
            icon: 'DollarSign',
            required: true,
            options: [
                { value: 'real_estate', label: 'נדל״ן', nextQuestion: 'commission_rate', metadata: { volatility: 'very-high', avgDeal: 50000 } },
                { value: 'insurance', label: 'ביטוח', nextQuestion: 'commission_rate', metadata: { volatility: 'medium', avgDeal: 2000 } },
                { value: 'finance', label: 'השקעות ופיננסים', nextQuestion: 'commission_rate', metadata: { volatility: 'high', avgDeal: 10000 } },
                { value: 'business', label: 'תיווך עסקי', nextQuestion: 'commission_rate', metadata: { volatility: 'high', avgDeal: 25000 } }
            ]
        },

        commission_rate: {
            id: 'commission_rate',
            question: 'כמה עמלה אתה לוקח באחוזים?',
            subtitle: 'אחוז עמלה ממוצע מהעסקות',
            type: 'input',
            inputType: 'number',
            icon: 'DollarSign',
            required: true,
            nextQuestion: 'broker_experience',
            validation: {
                min: 0.1,
                max: 25,
                step: 0.1
            },
            debtCalculation: {
                type: 'commission_based',
                formula: 'commissionRate * avgDealSize * expectedDeals * volatilityRisk',
                variables: {
                    avgDealSize: 'fromBrokerType',
                    expectedDeals: 'calculated',
                    volatilityRisk: 1.8
                }
            }
        },

        broker_experience: {
            id: 'broker_experience',
            question: 'כמה שנות ניסיון יש לך בתיווך?',
            subtitle: 'ניסיון בתיווך משפיע על הצלחה ויציבות הכנסה',
            type: 'input',
            inputType: 'number',
            icon: 'CheckCircle',
            required: true,
            nextQuestion: null, // סוף תת-מסלול broker - עובר לשאלות כלליות
            validation: {
                min: 0,
                max: 40,
                step: 0.5
            },
            debtCalculation: {
                type: 'broker_experience_based',
                formula: 'previousTotal * experienceMultiplier + networkBonus - stabilityDiscount',
                variables: {
                    experienceMultiplier: 'graduated',
                    networkBonus: 'calculated',
                    stabilityDiscount: 'veteran'
                },
                conditions: [
                    { if: 'years < 1', then: 'newBrokerRisk = 3.0' },
                    { if: 'years > 3', then: 'networkBonus = years * 100' },
                    { if: 'years > 10', then: 'veteranStability = 0.6' },
                    { if: 'years > 20', then: 'masterBrokerBonus = 0.4' }
                ],
                description: 'חישוב מורכב המתחשב בתנודתיות גבוהה של עולם התיווך'
            }
        },

        // === שאלות כלליות ===
        age: {
            id: 'age',
            question: 'מה גילך?',
            type: 'input',
            inputType: 'number',
            icon: 'User',
            required: true,
            nextQuestion: 'family_status',
            validation: {
                min: 18,
                max: 100,
                step: 1
            },
            debtCalculation: {
                type: 'age_based',
                formula: 'baseDebt * ageFactor',
                description: 'התאמת חוב לפי גיל'
            }
        },

        family_status: {
            id: 'family_status',
            question: 'מה מצב משפחתי?',
            type: 'multiple',
            icon: 'Users',
            required: true,
            options: [
                { value: 'single', label: 'רווק', nextQuestion: 'monthly_expenses', metadata: { dependents: 0 } },
                { value: 'married', label: 'נשוי', nextQuestion: 'monthly_expenses', metadata: { dependents: 1 } },
                { value: 'family', label: 'משפחה עם ילדים', nextQuestion: 'monthly_expenses', metadata: { dependents: 3 } }
            ]
        },

        monthly_expenses: {
            id: 'monthly_expenses',
            question: 'מה ההוצאות החודשיות הממוצעות?',
            type: 'input',
            inputType: 'number',
            icon: 'DollarSign',
            required: true,
            nextQuestion: null, // סוף השאלון
            validation: {
                min: 0,
                max: 50000,
                step: 100
            },
            debtCalculation: {
                type: 'expenses_based',
                formula: 'expenses * 0.2', // 20% מההוצאות כחוב נוסף
                description: 'התאמת חוב להוצאות חודשיות'
            }
        }
    },

    // חוקי עיבוד מתקדמים (מהקובץ המקורי)
    processingRules: {
        answerProcessing: {
            autoConversions: {
                'text_to_number': ['study_years', 'work_years', 'client_count', 'age', 'monthly_expenses'],
                'trim_whitespace': 'all',
                'lowercase': ['business_type', 'occupation']
            },
            crossValidations: [
                {
                    rule: "if occupation=avrech and work_years>0 then warning='יש בעיה לוגית'",
                    message: "אברך לא יכול להיות גם עובד - אנא בדוק את התשובות"
                },
                {
                    rule: "if business_years > age-16 then warning='impossible'",
                    message: "מספר שנות עסק לא יכול להיות גדול מהגיל פחות 16"
                }
            ]
        },
        debtCalculationEngine: {
            customFunctions: {
                calculateRiskMultiplier: `
          function(answers) {
            let risk = 1.0;
            if (answers.occupation === 'self_employed' && answers.business_type === 'broker') risk *= 2.0;
            if (answers.business_years < 2) risk *= 1.5;
            if (answers.client_count < 5) risk *= 1.3;
            return Math.min(risk, 3.0);
          }
        `,
                calculateStabilityBonus: `
          function(answers) {
            let bonus = 0;
            const experience = answers.work_years || answers.business_years || answers.study_years || 0;
            if (experience > 5) bonus = experience * 50;
            if (experience > 15) bonus += 500;
            return bonus;
          }
        `,
                getSeasonalityFactor: `
          function(businessType, currentMonth) {
            const seasonalBusinesses = ['tourism', 'retail', 'broker'];
            if (seasonalBusinesses.includes(businessType)) {
              if ([12, 1, 2].includes(currentMonth)) return 0.8;
              if ([7, 8].includes(currentMonth)) return 1.3;
            }
            return 1.0;
          }
        `
            },
            globalMultipliers: {
                economic_climate: 1.1,
                inflation_factor: 1.05,
                risk_appetite: 0.9
            }
        }
    },

    // הגדרות תצוגה (מהקובץ המקורי, מקוצר)
    uiConfiguration: {
        messages: {
            welcome: "ברוכים הבאים לשאלון חישוב החובות המתקדם",
            completion: "כל הכבוד! סיימת את השאלון בהצלחה",
            error: "אירעה שגיאה. אנא נסה שוב או פנה לתמיכה",
            validation_failed: "יש לתקן את השדות המסומנים באדום",
            dynamic_messages: {
                high_debt: "החוב שחושב גבוה יחסית. כדאי לשקול ייעוץ פיננסי",
                low_debt: "החוב הנחזה נמוך יחסית - מצב טוב!",
                unstable_income: "הכנסה לא יציבה מגדילה את רמת הסיכון"
            }
        },
        behaviors: {
            showProgressBar: true,
            animateTransitions: true,
            saveProgressAutomatically: true,
            showValidationRealTime: true,
            highlightRequiredFields: true
        },
        resultsDisplay: {
            showBreakdown: true,
            showComparison: true,
            showRecommendations: true,
            allowExport: true,
            formats: {
                currency: 'ILS',
                numberFormat: 'he-IL',
                dateFormat: 'dd/MM/yyyy'
            }
        }
    },

    // מטריקות ואנליטיקה (מקוצר)
    analytics: {
        trackEvents: [
            'question_answered',
            'navigation_back',
            'navigation_forward',
            'questionnaire_completed',
            'questionnaire_abandoned',
            'validation_error'
        ],
        collectData: {
            completionTime: true,
            questionnaireFlow: true,
            mostCommonAnswers: true,
            abandonmentPoints: true,
            averageDebtByCategory: true
        }
    },

    // הגדרות אינטגרציה (מקוצר)
    integrations: {
        externalAPIs: {
            bankAPI: { enabled: false, endpoint: 'https://api.bank.example.com/debt-check', apiKey: 'YOUR_API_KEY' },
            creditBureau: { enabled: false, endpoint: 'https://api.creditbureau.co.il/check', timeout: 5000 }
        },
        dataExport: {
            formats: ['json', 'csv', 'pdf'],
            destinations: ['email', 'download', 'database'],
            scheduling: { enabled: false, frequency: 'daily' }
        }
    }
};

export default questionnaireConfig;