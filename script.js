// script.js
const expression = document.getElementById('expression');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');
const inputValue = document.getElementById('inputValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const converterTitle = document.getElementById('converterTitle');
const convertResult = document.getElementById('convertResult');

let currentInput = '';
let currentConverter = '';

function appendValue(value) {
    currentInput = currentInput === '0' ? value : currentInput + value;
    expression.innerText = currentInput;
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
        let finalInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        const answer = eval(finalInput);
        result.innerText = answer;
        
        const li = document.createElement('li');
        li.innerText = `${currentInput} = ${answer}`;
        historyList.prepend(li);
        historyList.scrollTop = 0;
    } catch (error) {
        result.innerText = 'Error';
    }
}

function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active-tab');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tab + 'Tab').classList.add('active-tab');
    document.querySelectorAll('.tab-btn')[['calculator', 'converter', 'history'].indexOf(tab)].classList.add('active');
}

function openConverter(type) {
    currentConverter = type;
    
    // Remove active class from all converter items
    document.querySelectorAll('.converter-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.currentTarget.classList.add('active');
    
    converterTitle.innerText = type.charAt(0).toUpperCase() + type.slice(1) + ' Converter';
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    let options = [];
    
    switch(type) {
        case 'currency':
            options = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'];
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
        case 'discount':
            options = ['Percentage', 'Amount'];
            break;
        case 'numeral':
            options = ['Decimal', 'Binary', 'Hexadecimal', 'Octal'];
            break;
        case 'bmi':
            options = ['Height(cm)', 'Weight(kg)'];
            break;
        case 'gst':
            options = ['5%', '12%', '18%', '28%'];
            break;
    }
    
    options.forEach(option => {
        const opt1 = new Option(option, option);
        const opt2 = new Option(option, option);
        fromUnit.add(opt1);
        toUnit.add(opt2);
    });
    
    // Clear result
    convertResult.innerText = 'Result: ';
    inputValue.value = '';
    inputValue.focus();
}

function convertNow() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value) || value <= 0) {
        convertResult.innerText = 'Result: Enter valid positive number';
        return;
    }
    
    const from = fromUnit.value;
    const to = toUnit.value;
    let resultValue = value;
    
    // Currency (2026 rates)
    if (currentConverter === 'currency') {
        const rates = { 
            USD: 1, 
            EUR: 0.92, 
            GBP: 0.79, 
            INR: 83.5, 
            JPY: 150, 
            AUD: 1.52 
        };
        resultValue = (value * rates[from]) / rates[to];
    }
    // Length
    else if (currentConverter === 'length') {
        const factors = { 
            Meter: 1, 
            Kilometer: 0.001, 
            Centimeter: 100, 
            Millimeter: 1000, 
            Inch: 39.3701, 
            Foot: 3.28084, 
            Yard: 1.09361 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Mass
    else if (currentConverter === 'mass') {
        const factors = { 
            Gram: 1, 
            Kilogram: 0.001, 
            Pound: 0.00220462, 
            Ounce: 0.03527396, 
            Ton: 0.000001 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Area
    else if (currentConverter === 'area') {
        const factors = { 
            'Square Meter': 1, 
            'Square Kilometer': 0.000001, 
            Hectare: 0.0001, 
            Acre: 0.000247105, 
            'Square Foot': 10.7639 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Volume
    else if (currentConverter === 'volume') {
        const factors = { 
            Liter: 1, 
            Milliliter: 1000, 
            'Gallon(US)': 0.264172, 
            Pint: 2.11338, 
            'Cubic Meter': 0.001 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Temperature
    else if (currentConverter === 'temperature') {
        if (from === 'Celsius' && to === 'Fahrenheit') resultValue = (value * 9/5) + 32;
        else if (from === 'Fahrenheit' && to === 'Celsius') resultValue = (value - 32) * 5/9;
        else if (from === 'Celsius' && to === 'Kelvin') resultValue = value + 273.15;
        else if (from === 'Kelvin' && to === 'Celsius') resultValue = value - 273.15;
        else if (from === 'Fahrenheit' && to === 'Kelvin') resultValue = ((value - 32) * 5/9) + 273.15;
        else if (from === 'Kelvin' && to === 'Fahrenheit') resultValue = ((value - 273.15) * 9/5) + 32;
    }
    // Speed
    else if (currentConverter === 'speed') {
        const factors = { 
            'Km/h': 1, 
            Mph: 0.621371, 
            'm/s': 0.277778, 
            Knot: 0.539957 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Time
    else if (currentConverter === 'time') {
        const factors = { 
            Seconds: 1, 
            Minutes: 60, 
            Hours: 3600, 
            Days: 86400, 
            Weeks: 604800 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Data
    else if (currentConverter === 'data') {
        const factors = { 
            Byte: 1, 
            KB: 1024, 
            MB: 1048576, 
            GB: 1073741824, 
            TB: 1099511627776 
        };
        resultValue = value * factors[from] / factors[to];
    }
    // Discount
    else if (currentConverter === 'discount') {
        if (from === 'Percentage') {
            resultValue = value / 100;
        } else {
            resultValue = value * 100;
        }
    }
    // Numeral (basic decimal conversion)
    else if (currentConverter === 'numeral') {
        if (from === 'Decimal' && to === 'Binary') {
            resultValue = Math.floor(value).toString(2);
        } else if (from === 'Binary' && to === 'Decimal') {
            resultValue = parseInt(value.toString(2), 2);
        } else if (from === 'Decimal' && to === 'Hexadecimal') {
            resultValue = Math.floor(value).toString(16).toUpperCase();
        } else if (from === 'Hexadecimal' && to === 'Decimal') {
            resultValue = parseInt(value.toString(16), 16);
        }
    }
    // BMI
    else if (currentConverter === 'bmi') {
        const height = value / 100; // cm to meters
        const weight = parseFloat(to.replace('Weight(kg)', '70')) || 70;
        resultValue = weight / (height * height);
        convertResult.innerText = `BMI: ${resultValue.toFixed(2)}`;
        return;
    }
    // GST India rates
    else if (currentConverter === 'gst') {
        const rate = parseFloat(from.replace('%', '')) / 100;
        resultValue = value * rate;
    }
    
    convertResult.innerText = `Result: ${isNaN(resultValue) ? 'Invalid' : resultValue.toLocaleString(undefined, {maximumFractionDigits: 6})}`;
}

// Initialize
openConverter('currency');