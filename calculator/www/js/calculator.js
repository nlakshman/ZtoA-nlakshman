var display = "0";
var error = false;
var result = 0;
var operations = [];
var pendingOperation = '';
var CALCULATOR_NUMBER_OF_DIGITS = 8;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidLength(n) {
	var strN = "" + n;
	return (strN.length <= CALCULATOR_NUMBER_OF_DIGITS);
}
function digit(d) {
	if (error) {
		return;
	}
	display = (display == 0) ? d : "" + display + d;
	updateDisplay();
}

function clr() {
	error = false;
	operations.length = 0;
	display = "0";
	result = 0;
	pendingOperation = '';
	updateDisplay();
}

function updateDisplay() {
	if (error || !isNumber(display) || !isValidLength(display)) {
		display = "ERROR";
		error = true;
	} else if (display.indexOf('\.') >= 0) {
		var out = parseFloat(display).toFixed(2);
		if (isValidLength(out)) {
			display = out;
		} else {
			display = "ERROR";
			error = true;
		}
	}	
	var x = document.getElementById("result");
	x.innerHTML = display;
	console.log(error, result, pendingOperation, operations, display);
}

function computeOperations(lastNum) {
	if (error) {
		return NaN;
	}
	if (operations.length > 0) {
		operations.push(lastNum);
		var i;
		var result = 0;
		var operation = '';
		for (i = 0;i < operations.length;i ++) {
			var currentOperand = operations[i];
			console.log("/", i, result, operation, currentOperand)
			if (isNumber(currentOperand)) {
				currentOperand = parseFloat(currentOperand);
				if (operation == '') {
					result = currentOperand;
				} else if (operation == '*') {
					result = result * currentOperand;
				} else if (operation == '\/') {
					if (currentOperand == 0) {
						return NaN;
					}
					result = result / currentOperand;
				}
			} else if (currentOperand == '*' || currentOperand == '/') {
				operation = currentOperand;
			} 
		}
		operations.length = 0;
		if (isNumber(result)) {
			var test = "" + result;
			if (test.indexOf('\.') > 0) {
				var out = "" + parseFloat(result).toFixed(2);
				if (isValidLength(out)) {
					return out;
				} else {
					return NaN;
				}
			} else if (isValidLength(result)) {
				return result;
			} else {
				return NaN;
			}
		}
		return NaN;
	} else {
		return lastNum;
	}
}

function add() {
	if (error || pendingOperation != '') {
		return;
	}
	pendingOperation = '+';
	var lastDisplay = parseFloat(display);
	result = computeOperations(lastDisplay);
	console.log("add", result, lastDisplay, isNumber(result), isValidLength(result));
	if (!isNumber(result) || !isValidLength(result)) {
		error = true;
	} else {
		display = "0";
	}
	updateDisplay();
}

function subtract() {
	if (error || pendingOperation != '') {
		return;
	}
	pendingOperation = '-';
	var lastDisplay = parseFloat(display);
	result = computeOperations(lastDisplay);
	if (!isNumber(result) || !isValidLength(result)) {
		error = true;
	} else {
		display = "0";
	}
	updateDisplay();
}

function multiply() {
	if (error) {
		return;
	}
	var lastDisplay = parseFloat(display);
	operations.push(lastDisplay);
	operations.push('*');
	display = "0";
	updateDisplay();
}

function divide() {
	if (error) {
		return;
	}
	var lastDisplay = parseFloat(display);
	operations.push(lastDisplay);
	operations.push('/');
	display = "0";
	updateDisplay();
}

function equals() {
	if (error) {
		return;
	}
	var lastDisplay = parseFloat(display);
	var lastOperand = computeOperations(lastDisplay);
	if (pendingOperation == '+') {
		pendingOperation = '';
		result = result + lastOperand;		
	} else if (pendingOperation == '-') {
		pendingOperation = '';
		result = result - lastOperand;
	} else {
		result = lastOperand;
	}
	if (!isNumber(result) || !isValidLength(result)) {
		error = true;
	} else {
		display = "" + result;
	}
	updateDisplay();
}

function calculatorInitialize() {
	updateDisplay();
}