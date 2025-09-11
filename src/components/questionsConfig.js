// questionsConfig.js - Questions configuration file
export const questionsConfig = {
    // Initial occupation question
    occupation: {
        id: 'occupation',
        text: 'במה אני עוסק',
        icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/occupation.png',
        type: 'single-choice',
        options: [
            { value: 'tent-dweller', text: 'יושב אוהל', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/tent-dweller.png' },
            { value: 'employee', text: 'שכיר', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/employee.png' },
            { value: 'business-owner', text: 'בעל עסק', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/business-owner.png' }
        ]
    },

    // Tent dweller path
    'tent-dweller': {
        scholarship: {
            id: 'scholarship',
            section: 'יושב אוהל',
            text: 'האם הינך מקבל מילגת כולל?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'scholarship-hours',
            nextNo: 'general-questions'
        },
        'scholarship-hours': {
            id: 'scholarship-hours',
            section: 'יושב אוהל',
            text: 'האם גובה המילגה מותנה בשמירת הזמנים?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'scholarship-accuracy',
            nextNo: 'general-questions'
        },
        'scholarship-accuracy': {
            id: 'scholarship-accuracy',
            section: 'יושב אוהל',
            text: 'האם יתכן שלא מילאת באופן מדויק את רישום הזמנים וקיבלת בגין כך מילגה מוגדלת?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            amount: 240,
            nextYes: 'general-questions',
            nextNo: 'general-questions'
        }
    },

    // Employee path
    employee: {
        'works-with-clients': {
            id: 'works-with-clients',
            section: 'שכיר',
            text: 'האם הנך עובד מול לקוחות?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/clients.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'client-errors',
            nextNo: 'hourly-work'
        },
        'client-errors': {
            id: 'client-errors',
            section: 'שכיר',
            text: 'האם יתכן שטעות שלך גרמה ללקוח לשלם יותר או לקבל פחות?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/error.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'error-frequency',
            nextNo: 'hourly-work'
        },
        'error-frequency': {
            id: 'error-frequency',
            section: 'שכיר',
            text: 'אחת לכמה זמן היה הדבר הזה עלול לקרות בשנה החולפת?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/frequency.png',
            type: 'single-choice',
            options: [
                { value: 365, text: 'אחת ליום', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/daily.png' },
                { value: 52, text: 'אחת לשבוע', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/weekly.png' },
                { value: 26, text: 'אחת לשבועיים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/biweekly.png' },
                { value: 12, text: 'אחת לחודש', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/monthly.png' },
                { value: 2, text: 'אחת לחצי שנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/halfyear.png' },
                { value: 1, text: 'אחת לשנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yearly.png' }
            ],
            next: 'damage-amount'
        },
        'damage-amount': {
            id: 'damage-amount',
            section: 'שכיר',
            text: 'בכמה הינך משער את היקף הנזק ללקוח באם הדבר אכן קרה?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/damage.png',
            type: 'single-choice',
            options: [
                { value: 10, text: '10 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount10.png' },
                { value: 50, text: '50 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount50.png' },
                { value: 100, text: '100 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount100.png' },
                { value: 500, text: '500 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount500.png' },
                { value: 1000, text: '1,000 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount1000.png' },
                { value: 5000, text: '5,000 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount5000.png' },
                { value: 10000, text: '10,000 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount10000.png' }
            ],
            calculation: 'multiply-previous',
            next: 'hourly-work'
        },
        'hourly-work': {
            id: 'hourly-work',
            section: 'שכיר',
            text: 'האם הנך עובד לפי שעות, או מחוייב לסך שעות?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/hourly.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'time-accuracy',
            nextNo: 'work-faithfulness'
        },
        'time-accuracy': {
            id: 'time-accuracy',
            section: 'שכיר',
            text: 'האם רישום השעות שלך מדויק?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/time-accuracy.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'work-faithfulness',
            nextNo: 'time-inaccuracy-damage'
        },
        'time-inaccuracy-damage': {
            id: 'time-inaccuracy-damage',
            section: 'שכיר',
            text: 'האם יתכן שחוסר הדיוק שלך גרם בלא יודעין לנזק למעסיק?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/damage.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'inaccuracy-percentage',
            nextNo: 'work-faithfulness'
        },
        'inaccuracy-percentage': {
            id: 'inaccuracy-percentage',
            section: 'שכיר',
            text: 'כמה אחוזים מרישום הזמן שלך סובל מחוסר דיוק?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/percentage.png',
            type: 'single-choice',
            options: [
                { value: 5, text: '5%', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/percent5.png' },
                { value: 10, text: '10%', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/percent10.png' },
                { value: 20, text: '20%', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/percent20.png' },
                { value: 50, text: '50%', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/percent50.png' }
            ],
            next: 'single-inaccuracy-cost'
        },
        'single-inaccuracy-cost': {
            id: 'single-inaccuracy-cost',
            section: 'שכיר',
            text: 'בכמה הנך מעריך את משמעות מקרה של אי-דיוק בודד עבור המעסיק שלך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/cost.png',
            type: 'single-choice',
            options: [
                { value: 5, text: '5 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount5.png' },
                { value: 10, text: '10 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount10.png' },
                { value: 20, text: '20 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount20.png' }
            ],
            next: 'time-registration-frequency'
        },
        'time-registration-frequency': {
            id: 'time-registration-frequency',
            section: 'שכיר',
            text: 'באיזו תדירות הנך אמור לבצע רישום זמן?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/frequency.png',
            type: 'single-choice',
            options: [
                { value: 240, text: 'שעתי (240 פעמים בחודש)', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/hourly.png' },
                { value: 22, text: 'יומי (22 ימי עבודה בחודש)', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/daily.png' },
                { value: 4, text: 'שבועי', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/weekly.png' },
                { value: 1, text: 'חודשי', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/monthly.png' }
            ],
            calculation: 'complex-time-calculation',
            next: 'work-faithfulness'
        },
        'work-faithfulness': {
            id: 'work-faithfulness',
            section: 'שכיר',
            text: 'האם זכור לך מקרה בו לא מילאת את תפקידך באמונה ונגרם נזק או מניעת רווח למעסיק שלך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/faithfulness.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'faithfulness-damage-amount',
            nextNo: 'general-questions'
        },
        'faithfulness-damage-amount': {
            id: 'faithfulness-damage-amount',
            section: 'שכיר',
            text: 'בכמה כסף הנך מעריך את משמעות הנזק עבור המעסיק?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/damage.png',
            type: 'single-choice',
            options: [
                { value: 10, text: '10 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount10.png' },
                { value: 100, text: '100 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount100.png' },
                { value: 500, text: '500 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount500.png' },
                { value: 1000, text: '1,000 ש"ח', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount1000.png' }
            ],
            next: 'faithfulness-frequency'
        },
        'faithfulness-frequency': {
            id: 'faithfulness-frequency',
            section: 'שכיר',
            text: 'האם אתה חושש שהדבר אירע יותר מפעם אחת בשנה?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/frequency.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'faithfulness-times-per-year',
            nextNo: 'general-questions'
        },
        'faithfulness-times-per-year': {
            id: 'faithfulness-times-per-year',
            section: 'שכיר',
            text: 'כמה פעמים בשנה הנך חושש שהדבר קרה?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/times.png',
            type: 'single-choice',
            options: [
                { value: 2, text: 'פעמיים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/two.png' },
                { value: 3, text: '3 פעמים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/three.png' }
            ],
            calculation: 'multiply-previous',
            next: 'general-questions'
        }
    },

    // Business owner path
    'business-owner': {
        'business-type': {
            id: 'business-type',
            section: 'בעל עסק',
            text: 'איזה סוג עסק נמצא בבעלותך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/business.png',
            type: 'single-choice',
            options: [
                { value: 'service-provider', text: 'נותן שירות', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/service.png' },
                { value: 'product-seller', text: 'מוכר מוצרים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/product.png' },
                { value: 'broker', text: 'עסקי תיווך', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/broker.png' }
            ],
            next: 'general-questions'
        }
    },

    // General questions (common to all paths)
    'general-questions': {
        'small-loans': {
            id: 'small-loans',
            text: 'האם הנך לווה לפעמים סכומים קטנים מחבר, שכן, או קרוב משפחה?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/loan.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'loan-amount',
            nextNo: 'neighbor-borrowing'
        },
        'loan-amount': {
            id: 'loan-amount',
            text: 'איזה סכום קטן אתה עשוי ללוות לפעמים?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/money.png',
            type: 'single-choice',
            options: [
                { value: 100, text: '100', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount100.png' },
                { value: 200, text: '200', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount200.png' },
                { value: 400, text: '400', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/amount400.png' }
            ],
            next: 'loan-frequency'
        },
        'loan-frequency': {
            id: 'loan-frequency',
            text: 'באיזו תדירות זה יכול לקרות?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/frequency.png',
            type: 'single-choice',
            options: [
                { value: 52, text: 'אחת לשבוע', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/weekly.png' },
                { value: 12, text: 'אחת לחודש', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/monthly.png' },
                { value: 6, text: 'אחת לחודשיים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/bimonthly.png' },
                { value: 2, text: 'אחת לחצי שנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/halfyear.png' },
                { value: 1, text: 'אחת לשנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yearly.png' }
            ],
            next: 'loan-recording'
        },
        'loan-recording': {
            id: 'loan-recording',
            text: 'האם הנך נוהג לרשום את ההלוואות האלו בפנקס?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/notebook.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'neighbor-borrowing',
            nextNo: 'loan-return-certainty'
        },
        'loan-return-certainty': {
            id: 'loan-return-certainty',
            text: 'האם אתה בטוח ב-100% שבכל הפעמים שלווית זכרת להחזיר?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/certainty.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'neighbor-borrowing',
            nextNo: 'neighbor-borrowing',
            calculation: 'loan-calculation' // (amount * frequency) / 3
        },
        'neighbor-borrowing': {
            id: 'neighbor-borrowing',
            text: 'האם אתה או ילדיך נוהגים ללוות מוצרים משכנים במידת הצורך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/neighbor.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'neighbor-frequency',
            nextNo: 'mikveh'
        },
        'neighbor-frequency': {
            id: 'neighbor-frequency',
            text: 'באיזו תדירות זה יכול לקרות?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/frequency.png',
            type: 'single-choice',
            options: [
                { value: 104, text: 'פעמיים בשבוע', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/biweekly.png' },
                { value: 52, text: 'אחת לשבוע', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/weekly.png' },
                { value: 12, text: 'אחת לחודש', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/monthly.png' },
                { value: 6, text: 'אחת לחודשיים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/bimonthly.png' },
                { value: 2, text: 'אחת לחצי שנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/halfyear.png' },
                { value: 1, text: 'אחת לשנה', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yearly.png' }
            ],
            next: 'neighbor-recording'
        },
        'neighbor-recording': {
            id: 'neighbor-recording',
            text: 'האם הנך נוהג לרשום הלוואות אלו?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/notebook.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'mikveh',
            nextNo: 'mikveh',
            calculation: 'neighbor-calculation' // (frequency * 10) / 3
        },
        mikveh: {
            id: 'mikveh',
            text: 'האם אתה נוהג לטבול במקווה?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/mikveh.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'mikveh-payment',
            nextNo: 'smoking'
        },
        'mikveh-payment': {
            id: 'mikveh-payment',
            text: 'האם סביר שאתה נכנס לפעמים בלי לשלם?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/payment.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'mikveh-shabbat',
            nextNo: 'mikveh-shabbat',
            amount: 70 // 7 * 10
        },
        'mikveh-shabbat': {
            id: 'mikveh-shabbat',
            text: 'האם נכנסת בשבת למקווה במקום זר ולא שילמת אחרי שבת?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/shabbat.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'smoking',
            nextNo: 'smoking',
            amount: 15
        },
        smoking: {
            id: 'smoking',
            text: 'האם אתה מעשן?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/smoking.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'cigarette-requests',
            nextNo: 'car-ownership'
        },
        'cigarette-requests': {
            id: 'cigarette-requests',
            text: 'האם הנך מבקש לפעמים סיגריות מאחרים?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/cigarette.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'car-ownership',
            nextNo: 'car-ownership',
            amount: 30
        },
        'car-ownership': {
            id: 'car-ownership',
            text: 'האם הנך בעל רכב?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/car.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'car-damage',
            nextNo: 'general-miscellaneous'
        },
        'car-damage': {
            id: 'car-damage',
            text: 'האם אירע לך פעם שפגעת ברכב חונה ולא שילמת?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/car-damage.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'parking-damage',
            nextNo: 'parking-damage',
            amount: 700
        },
        'parking-damage': {
            id: 'parking-damage',
            text: 'האם יתכן שלקחת חניה של מישהו וגרמת לו נזק או עיכוב?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/parking.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'mud-splashing',
            nextNo: 'mud-splashing',
            amount: 50
        },
        'mud-splashing': {
            id: 'mud-splashing',
            text: 'האם יתכן שבנסיעה בימות הגשמים התזת מים ובוץ על עוברי אורח והיזקת למלבושיהם?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/rain.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'general-miscellaneous',
            nextNo: 'general-miscellaneous',
            amount: 100
        },
        'general-miscellaneous': {
            id: 'general-miscellaneous',
            text: 'האם יתכן שביצעת רכישה במכולת ושכחת לשלם על אחד המוצרים?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/shopping.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'family-damage',
            nextNo: 'family-damage',
            amount: 7
        },
        'family-damage': {
            id: 'family-damage',
            text: 'האם יתכן שאחד מילדיך ביצע נזק לרכוש כלשהו ולא סיפר לך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/family.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'forgotten-item',
            nextNo: 'forgotten-item',
            amount: 50
        },
        'forgotten-item': {
            id: 'forgotten-item',
            text: 'האם יתכן שמישהו מסר לך חפץ למסור למישהו והחפץ נשכח אצלך?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/item.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'books-possession',
            nextNo: 'books-possession',
            amount: 25
        },
        'books-possession': {
            id: 'books-possession',
            text: 'האם קיימים תחת ידך ספרים שאינם שלך ואינך יודע מי בעליהם?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/books.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'books-count',
            nextNo: 'final-question'
        },
        'books-count': {
            id: 'books-count',
            text: 'בכמה ספרים מדובר?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book-count.png',
            type: 'single-choice',
            options: [
                { value: 15, text: 'ספר אחד', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book1.png' },
                { value: 37.5, text: '2-3 ספרים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book2-3.png' },
                { value: 150, text: 'כ-10 ספרים', icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/book10.png' }
            ],
            next: 'final-question'
        },
        'final-question': {
            id: 'final-question',
            text: 'האם יתכן כי הזמנת תור לרופא / איש מקצוע / נותן שירות, ולא הופעת, מבלי להודיע מראש?',
            icon: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/appointment.png',
            type: 'yes-no',
            // iconYes: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/yes.png',
            // iconNo: 'https://raw.githubusercontent.com/moshe-eichler/neki-kapaim/refs/heads/update/src/static/icons/no.png',
            nextYes: 'summary',
            nextNo: 'summary',
            amount: 50
        }
    }
};