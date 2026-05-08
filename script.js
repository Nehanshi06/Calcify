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
const discountSection = document.getElementById('discountSection');

const originalPrice = document.getElementById('originalPrice');
const discountPercent = document.getElementById('discountPercent');

const birthYear = document.getElementById('birthYear');
const birthMonth = document.getElementById('birthMonth');
const birthDay = document.getElementById('birthDay');

const toYear = document.getElementById('toYear');
const toMonth = document.getElementById('toMonth');
const toDay = document.getElementById('toDay');

let currentInput = '';
let currentConverter = '';


// ==========================
// ALLOW ONLY NUMBERS
// ==========================

inputValue?.addEventListener('input', () => {

    inputValue.value = inputValue.value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1');
});


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
    CAD: { name: 'Canadian Dollar', symbol: 'C$', rate: 1.38 }
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
    originalPrice.value = '';
discountPercent.value = '';
inputValue.parentElement.style.display = 'flex';

    convertResult.innerText = 'Result:';

    document.getElementById('ageSection').style.display = 'none';
document.getElementById('inputContainer').style.display = 'flex';

discountSection.style.display = 'none';

fromUnit.parentElement.style.display = 'flex';
toUnit.parentElement.style.display = 'flex';
document.querySelector('.arrow-center').style.display = 'flex';

    // AGE

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

            return;

        case 'length':
            options = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Inch', 'Foot'];
            break;

        case 'mass':
            options = ['Gram', 'Kilogram', 'Pound', 'Ounce'];
            break;

        case 'area':
            options = ['Square Meter', 'Square Kilometer', 'Acre'];
            break;

        case 'volume':
            options = ['Liter', 'Milliliter', 'Gallon'];
            break;

        case 'temperature':
            options = ['Celsius', 'Fahrenheit', 'Kelvin'];
            break;

        case 'speed':
            options = ['Km/h', 'Mph', 'm/s'];
            break;

        case 'time':
            options = ['Seconds', 'Minutes', 'Hours', 'Days'];
            break;

        case 'data':
            options = ['Byte', 'KB', 'MB', 'GB'];
            break;

        case 'numeral':
            options = ['Decimal', 'Binary'];
            break;

        case 'discount':

    converterTitle.innerText = 'Discount Calculator';

    discountSection.style.display = 'flex';

    inputValue.parentElement.style.display = 'none';

    fromUnit.parentElement.style.display = 'none';
    toUnit.parentElement.style.display = 'none';
    document.querySelector('.arrow-center').style.display = 'none';

    return;
    }

    options.forEach(option => {

        fromUnit.add(new Option(option, option));
        toUnit.add(new Option(option, option));
    });

    if (options.length > 1) {

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

            days += 30;
        }

        if (months < 0) {

            age--;
            months += 12;
        }

        convertResult.innerText =
            `Age: ${age} Years ${months} Months ${days} Days`;

        return;
    }

    // DISCOUNT

if (currentConverter === 'discount') {

    const original = parseFloat(originalPrice.value);
    const discount = parseFloat(discountPercent.value);

    if (isNaN(original) || isNaN(discount)) {

        convertResult.innerText = 'Enter valid values';
        return;
    }

    const savedAmount = (original * discount) / 100;

    const finalPrice = original - savedAmount;

    convertResult.innerHTML =
        `
        Final Price: ₹${finalPrice.toFixed(2)}
        <br>
        <span style="font-size:16px;color:#ffffff;">
            You Save ₹${savedAmount.toFixed(2)}
        </span>
        `;

    return;
}

    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {

        convertResult.innerText = 'Enter valid number';
        return;
    }

    let resultValue = 0;

    // CURRENCY

    if (currentConverter === 'currency') {

        const fromRate =
            WORLD_CURRENCIES[fromUnit.value].rate;

        const toRate =
            WORLD_CURRENCIES[toUnit.value].rate;

        resultValue = (value / fromRate) * toRate;

        convertResult.innerText =
            `${WORLD_CURRENCIES[fromUnit.value].symbol}${value} = ${WORLD_CURRENCIES[toUnit.value].symbol}${resultValue.toFixed(2)}`;

        return;
    }

    // LENGTH

    if (currentConverter === 'length') {

        const factors = {
            Meter: 1,
            Kilometer: 1000,
            Centimeter: 0.01,
            Millimeter: 0.001,
            Inch: 0.0254,
            Foot: 0.3048
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // MASS

    if (currentConverter === 'mass') {

        const factors = {
            Gram: 1,
            Kilogram: 1000,
            Pound: 453.592,
            Ounce: 28.3495
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // AREA

    if (currentConverter === 'area') {

        const factors = {
            'Square Meter': 1,
            'Square Kilometer': 1000000,
            Acre: 4046.86
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // VOLUME

    if (currentConverter === 'volume') {

        const factors = {
            Liter: 1,
            Milliliter: 0.001,
            Gallon: 3.78541
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // TEMPERATURE

    if (currentConverter === 'temperature') {

        if (fromUnit.value === 'Celsius' &&
            toUnit.value === 'Fahrenheit') {

            resultValue = (value * 9 / 5) + 32;
        }

        else if (fromUnit.value === 'Fahrenheit' &&
            toUnit.value === 'Celsius') {

            resultValue = (value - 32) * 5 / 9;
        }

        else if (fromUnit.value === 'Celsius' &&
            toUnit.value === 'Kelvin') {

            resultValue = value + 273.15;
        }

        else if (fromUnit.value === 'Kelvin' &&
            toUnit.value === 'Celsius') {

            resultValue = value - 273.15;
        }

        else {

            resultValue = value;
        }
    }

    // SPEED

    if (currentConverter === 'speed') {

        const factors = {
            'Km/h': 1,
            'Mph': 1.60934,
            'm/s': 3.6
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // TIME

    if (currentConverter === 'time') {

        const factors = {
            Seconds: 1,
            Minutes: 60,
            Hours: 3600,
            Days: 86400
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // DATA

    if (currentConverter === 'data') {

        const factors = {
            Byte: 1,
            KB: 1024,
            MB: 1048576,
            GB: 1073741824
        };

        resultValue =
            value *
            factors[fromUnit.value] /
            factors[toUnit.value];
    }

    // NUMERAL

    if (currentConverter === 'numeral') {

        if (fromUnit.value === 'Decimal' &&
            toUnit.value === 'Binary') {

            resultValue = parseInt(value).toString(2);
        }

        else if (fromUnit.value === 'Binary' &&
            toUnit.value === 'Decimal') {

            resultValue = parseInt(value, 2);
        }

        else {

            resultValue = value;
        }

        convertResult.innerText =
            `Result: ${resultValue}`;

        return;
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

birthYear?.addEventListener('change', updateBirthDayOptions);
birthMonth?.addEventListener('change', updateBirthDayOptions);

toYear?.addEventListener('change', updateToDayOptions);
toMonth?.addEventListener('change', updateToDayOptions);