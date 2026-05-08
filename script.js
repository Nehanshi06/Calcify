// ==========================
// CALCIFY - COMPLETE SCRIPT
// ==========================

const expression = document.getElementById('expression');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');

const inputValue = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');

const converterTitle = document.getElementById('converterTitle');
const convertResult = document.getElementById('convertResult');

const birthYear = document.getElementById('birthYear');
const birthMonth = document.getElementById('birthMonth');
const birthDay = document.getElementById('birthDay');

const toYear = document.getElementById('toYear');
const toMonth = document.getElementById('toMonth');
const toDay = document.getElementById('toDay');

let currentInput = '';
let currentConverter = '';


// ==========================
// WORLD CURRENCIES
// ==========================

const WORLD_CURRENCIES = {
    USD: { name: 'US Dollar', symbol: '$', rate: 1 },
    EUR: { name: 'Euro', symbol: '€', rate: 0.92 },
    GBP: { name: 'British Pound', symbol: '£', rate: 0.79 },
    INR: { name: 'Indian Rupee', symbol: '₹', rate: 83.5 },
    JPY: { name: 'Japanese Yen', symbol: '¥', rate: 150 },
    AUD: { name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
    CAD: { name: 'Canadian Dollar', symbol: 'C$', rate: 1.38 },
    CHF: { name: 'Swiss Franc', symbol: 'CHF', rate: 0.88 },
    CNY: { name: 'Chinese Yuan', symbol: '¥', rate: 7.2 },
    SGD: { name: 'Singapore Dollar', symbol: 'S$', rate: 1.35 },
    HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.8 },
    KRW: { name: 'South Korean Won', symbol: '₩', rate: 1350 },
    SEK: { name: 'Swedish Krona', symbol: 'kr', rate: 10.5 },
    NOK: { name: 'Norwegian Krone', symbol: 'kr', rate: 10.8 },
    NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.65 },
    MXN: { name: 'Mexican Peso', symbol: '$', rate: 20 },
    BRL: { name: 'Brazilian Real', symbol: 'R$', rate: 5.6 },
    RUB: { name: 'Russian Ruble', symbol: '₽', rate: 95 },
    ZAR: { name: 'South African Rand', symbol: 'R', rate: 18.5 },
    TRY: { name: 'Turkish Lira', symbol: '₺', rate: 34 },
    AED: { name: 'UAE Dirham', symbol: 'د.إ', rate: 3.67 },
    SAR: { name: 'Saudi Riyal', symbol: 'ر.س', rate: 3.75 },
    PKR: { name: 'Pakistani Rupee', symbol: '₨', rate: 278 }
};


// ==========================
// AGE DROPDOWNS
// ==========================

function populateAgeDropdowns() {

    const today = new Date();
    const currentYear = today.getFullYear();

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];

    birthYear.innerHTML = '';
    toYear.innerHTML = '';

    for (let year = currentYear + 5; year >= 1950; year--) {

        birthYear.add(new Option(year, year));
        toYear.add(new Option(year, year));
    }

    birthMonth.innerHTML = '';
    toMonth.innerHTML = '';

    months.forEach((month, index) => {

        birthMonth.add(new Option(month, index + 1));
        toMonth.add(new Option(month, index + 1));
    });

    updateBirthDayOptions();
    updateToDayOptions();

    birthYear.value = currentYear - 25;

    toYear.value = currentYear;
    toMonth.value = today.getMonth() + 1;
    toDay.value = today.getDate();
}

function updateBirthDayOptions() {

    const year = parseInt(birthYear.value);
    const month = parseInt(birthMonth.value);

    const days = new Date(year, month, 0).getDate();

    birthDay.innerHTML = '';

    for (let i = 1; i <= days; i++) {
        birthDay.add(new Option(i, i));
    }
}

function updateToDayOptions() {

    const year = parseInt(toYear.value);
    const month = parseInt(toMonth.value);

    const days = new Date(year, month, 0).getDate();

    toDay.innerHTML = '';

    for (let i = 1; i <= days; i++) {
        toDay.add(new Option(i, i));
    }
}

function getSelectedDate(yearSel, monthSel, daySel) {

    return new Date(
        parseInt(yearSel.value),
        parseInt(monthSel.value) - 1,
        parseInt(daySel.value)
    );
}


// ==========================
// CALCULATOR
// ==========================

function appendValue(value) {

    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = currentInput.slice(-1);

    // Prevent multiple operators
    if (operators.includes(value)) {

        if (currentInput === '') return;

        if (operators.includes(lastChar)) {

            currentInput =
                currentInput.slice(0, -1) + value;

        } else {

            currentInput += value;
        }

    } else {

        currentInput += value;
    }

    expression.innerText = currentInput || '0';
}

function clearDisplay() {

    currentInput = '';

    expression.innerText = '0';
    result.innerText = '0';
}

function deleteLast() {

    currentInput = currentInput.slice(0, -1);

    expression.innerText = currentInput || '0';
}

function calculate() {

    try {

        let finalInput = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        const answer = eval(finalInput);

        result.innerText = answer;

        const li = document.createElement('li');

        li.innerText = `${currentInput} = ${answer}`;

        historyList.prepend(li);

    } catch {

        result.innerText = 'Error';
    }
}


// ==========================
// TABS
// ==========================

function showTab(tab) {

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active-tab');
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (tab === 'calculator') {

        document.getElementById('calculatorTab')
            .classList.add('active-tab');

        document.querySelector('.tab-btn:nth-child(1)')
            .classList.add('active');

    } else if (tab === 'converter') {

        document.getElementById('converterGridTab')
            .classList.add('active-tab');

        document.querySelector('.tab-btn:nth-child(2)')
            .classList.add('active');

    } else {

        document.getElementById('historyTab')
            .classList.add('active-tab');

        document.querySelector('.tab-btn:nth-child(3)')
            .classList.add('active');
    }
}

function showConverterGrid() {

    document.getElementById('converterWorkspaceTab')
        .classList.remove('active-tab');

    document.getElementById('converterGridTab')
        .classList.add('active-tab');
}


// ==========================
// CLEAN SELECT TEXT
// ==========================

function getCleanUnitName(value) {

    if (WORLD_CURRENCIES[value]) {
        return value;
    }

    return value;
}


// ==========================
// OPEN CONVERTER
// ==========================

function openSpecificConverter(type) {

    currentConverter = type;

    document.getElementById('converterGridTab')
        .classList.remove('active-tab');

    document.getElementById('converterWorkspaceTab')
        .classList.add('active-tab');

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    inputValue.value = '';

    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('inputContainer').style.display = 'grid';

    if (type === 'age') {

        converterTitle.innerText = 'Age Calculator';

        document.getElementById('inputContainer').style.display = 'none';
        document.getElementById('ageSection').style.display = 'flex';

        populateAgeDropdowns();

        return;
    }

    converterTitle.innerText =
        type.charAt(0).toUpperCase() +
        type.slice(1) +
        ' Converter';

    let options = [];

    switch (type) {

        case 'currency':

            Object.keys(WORLD_CURRENCIES).forEach(code => {

                const displayText =
                    `${code} (${WORLD_CURRENCIES[code].name})`;

                fromUnit.add(new Option(displayText, code));
                toUnit.add(new Option(displayText, code));
            });

            fromUnit.value = 'USD';
            toUnit.value = 'INR';

            break;

        case 'length':
            options = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Inch', 'Foot', 'Yard'];
            break;

        case 'mass':
            options = ['Gram', 'Kilogram', 'Pound', 'Ounce', 'Ton'];
            break;

        case 'area':
            options = ['Square Meter', 'Square Kilometer', 'Hectare', 'Acre', 'Square Foot'];
            break;

        case 'volume':
            options = ['Liter', 'Milliliter', 'Gallon(US)', 'Pint', 'Cubic Meter'];
            break;

        case 'temperature':
            options = ['Celsius', 'Fahrenheit', 'Kelvin'];
            break;

        case 'speed':
            options = ['Km/h', 'Mph', 'm/s', 'Knot'];
            break;

        case 'time':
            options = ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks'];
            break;

        case 'data':
            options = ['Byte', 'KB', 'MB', 'GB', 'TB'];
            break;
    }

    options.forEach(option => {

        fromUnit.add(new Option(option, option));
        toUnit.add(new Option(option, option));
    });

    if (options.length > 0) {

        fromUnit.selectedIndex = 0;
        toUnit.selectedIndex = 1;
    }
}


// ==========================
// CONVERTER
// ==========================

function convertNow() {

    // AGE

    if (currentConverter === 'age') {

        const birthDate =
            getSelectedDate(birthYear, birthMonth, birthDay);

        const toDate =
            getSelectedDate(toYear, toMonth, toDay);

        if (birthDate >= toDate) {

            convertResult.innerText =
                'Birth date must be before To date';

            return;
        }

        let age =
            toDate.getFullYear() -
            birthDate.getFullYear();

        let months =
            toDate.getMonth() -
            birthDate.getMonth();

        let days =
            toDate.getDate() -
            birthDate.getDate();

        if (days < 0) {

            months--;

            days += new Date(
                toDate.getFullYear(),
                toDate.getMonth(),
                0
            ).getDate();
        }

        if (months < 0) {

            age--;
            months += 12;
        }

        convertResult.innerText =
            `Age: ${age} Years ${months} Months ${days} Days`;

        return;
    }

    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {

        convertResult.innerText =
            'Enter valid number';

        return;
    }

    let resultValue = 0;


    // ==========================
    // CURRENCY
    // ==========================

    if (currentConverter === 'currency') {

        const fromRate =
            WORLD_CURRENCIES[fromUnit.value].rate;

        const toRate =
            WORLD_CURRENCIES[toUnit.value].rate;

        resultValue = (value / fromRate) * toRate;

        convertResult.innerText =
            `${WORLD_CURRENCIES[fromUnit.value].symbol}${value.toLocaleString()} = ${WORLD_CURRENCIES[toUnit.value].symbol}${resultValue.toLocaleString(undefined, {
                maximumFractionDigits: 2
            })}`;

        return;
    }


    // ==========================
    // LENGTH
    // ==========================

    if (currentConverter === 'length') {

        const factors = {
            Meter: 1,
            Kilometer: 0.001,
            Centimeter: 100,
            Millimeter: 1000,
            Inch: 39.3701,
            Foot: 3.28084,
            Yard: 1.09361
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }


    // ==========================
    // MASS
    // ==========================

    if (currentConverter === 'mass') {

        const factors = {
            Gram: 1,
            Kilogram: 0.001,
            Pound: 0.00220462,
            Ounce: 0.035274,
            Ton: 0.000001
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }


    // ==========================
    // AREA
    // ==========================

    if (currentConverter === 'area') {

        const factors = {
            'Square Meter': 1,
            'Square Kilometer': 0.000001,
            Hectare: 0.0001,
            Acre: 0.000247105,
            'Square Foot': 10.7639
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }


    // ==========================
    // VOLUME
    // ==========================

    if (currentConverter === 'volume') {

        const factors = {
            Liter: 1,
            Milliliter: 1000,
            'Gallon(US)': 0.264172,
            Pint: 2.11338,
            'Cubic Meter': 0.001
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }


    // ==========================
    // TEMPERATURE
    // ==========================

    if (currentConverter === 'temperature') {

        const from = fromUnit.value;
        const to = toUnit.value;

        if (from === 'Celsius' && to === 'Fahrenheit') {
            resultValue = (value * 9 / 5) + 32;
        }
        else if (from === 'Fahrenheit' && to === 'Celsius') {
            resultValue = (value - 32) * 5 / 9;
        }
        else if (from === 'Celsius' && to === 'Kelvin') {
            resultValue = value + 273.15;
        }
        else if (from === 'Kelvin' && to === 'Celsius') {
            resultValue = value - 273.15;
        }
        else {
            resultValue = value;
        }
    }

    convertResult.innerText =
        `Result: ${parseFloat(resultValue).toLocaleString(undefined, {
            maximumFractionDigits: 6
        })}`;
}


// ==========================
// INIT
// ==========================

showTab('calculator');