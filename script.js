// Each exercise has it's own function
// I made it so user can type inside each form,
// and then press the button to see the results.
// Each exercise may be changed in the way to log the result in console,
// but i thought, this way it's gonna be better.
document.addEventListener("DOMContentLoaded", function() {
    initExponentiation(); // 5.10.1
    initPromo(); // 5.10.2
    initAge(); // 5.10.3
    initAge2(); // 5.10.4
    initCreditCalculator(); // 5.10.5
});

// Validation for Exponentiation
function validateInput(value) {
    if (!value || value.trim() === '') {
        return {isValid: false, message: "Пожалуйста, заполните поле"};
    }

    const num = Number(value);

    if (isNaN(num)) {
        return {isValid: false, message: "Пожалуйста, введите число"};
    }

    return {isValid: true, value: num};
}

// 5.10.1
function initExponentiation() {
    const exponentiation = document.getElementById('expForm');
    const resultExp = document.getElementById('resultExp');

    if(exponentiation) {
        exponentiation.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get Form Data
            const inputNumber = document.getElementById('inputNumber').value;

            // Validation execution
            const validation = validateInput(inputNumber);

            if (!validation.isValid) {
                resultExp.textContent = validation.message;
                return;
            }
            
            // Function execution
            if (inputNumber !== null) {
                resultExp.textContent = `Квадрат числа = ${validation.value ** 2}; Куб числа = ${validation.value ** 3};`;
            }

            exponentiation.reset();
        })
    }
};

// 5.10.2
function initPromo() {
    const promoForm = document.getElementById('promoForm');
    const resultPromo = document.getElementById('resultPromo');

    if(promoForm) {
        promoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get Form Data
            const inputPromo = document.getElementById('inputPromo');
            const enteredCode = inputPromo.value;


            const validPromoCode = 'скидка';

            //Validation
            if (!enteredCode || enteredCode.trim() === '') {
                resultPromo.textContent = 'Пожалуйста, введите промокод';
                resultPromo.style.color = 'red';
                return;
            }

            if (enteredCode.toLowerCase() === validPromoCode.toLowerCase()) {
                resultPromo.textContent = "Промокод применён";
                resultPromo.style.color = "green";
            } else {
                resultPromo.textContent = "Промокод не работает";
                resultPromo.style.color = "red";
            }

            promoForm.reset();
        })
    }
};

// 5.10.3
function initAge() {
    const ageForm = document.getElementById('ageForm');
    const resultAge = document.getElementById('resultAge');

    if(ageForm) {
        ageForm.addEventListener('submit', function(e) {
            e.preventDefault();

            //Get Form Data
            const inputName = document.getElementById('inputName').value;
            const inputDate = document.getElementById('inputDate').value;
            const currentYear = 2026;

            // Validation
            const validationAge = validateInput(inputDate);

            if (!validationAge.isValid) {
                resultAge.textContent = validationAge.message;
                return;
            }
            if (!inputName || inputName.trim() === '') {
                resultAge.textContent = 'Пожалуйста, введите данные';
                resultAge.style.color = 'red';
                return;
            }            
            if (!inputDate || inputDate.trim() === '') {
                resultAge.textContent = 'Пожалуйста, введите данные';
                resultAge.style.color = 'red';
                return;
            }
            if (inputDate >= currentYear) {
                resultAge.textContent = 'Укажите действительный год рождения';
                resultAge.style.color = 'red';
                return;
            }
            
            // Function Executuion
            if (inputDate !== null) {
                resultAge.textContent = `${inputName}, возвраст - ${currentYear - inputDate}`;
                resultAge.style.color = 'black';
            }

            ageForm.reset();
        })
    }
};

// 5.10.4
function initAge2() {
    const ageForm2 = document.getElementById('ageForm2');
    const resultAge2 = document.getElementById('resultAge2');

    if(ageForm2) {
        ageForm2.addEventListener('submit', function(e) {
            e.preventDefault();

            //Get Form Data
            const inputName2 = document.getElementById('inputName2').value;
            const inputDate2 = document.getElementById('inputDate2').value;
            const currentYear = 2026;
            const userAge = currentYear - inputDate2;

            // Validation
            const validationAge2 = validateInput(inputDate2);

            if (!validationAge2.isValid) {
                resultAge2.textContent = validationAge2.message;
                return;
            }
            if (!inputName2 || inputName2.trim() === '') {
                resultAge2.textContent = 'Пожалуйста, введите данные';
                resultAge2.style.color = 'red';
                return;
            }            
            if (!inputDate2 || inputDate2.trim() === '') {
                resultAge2.textContent = 'Пожалуйста, введите данные';
                resultAge2.style.color = 'red';
                return;
            }
            if (inputDate2 >= currentYear) {
                resultAge2.textContent = 'Укажите действительный год рождения';
                resultAge2.style.color = 'red';
                return;
            }
            
            // Function Executuion
            let x = userAge % 10;

            if (x == 1) {
                resultAge2.textContent = `${inputName2}, возраст - ${userAge} год`;
                resultAge2.style.color = 'black';
            } else if (x > 1 && x < 5) {
                resultAge2.textContent = `${inputName2}, возраст - ${userAge} года`;
                resultAge2.style.color = 'black';
            } else {
                resultAge2.textContent = `${inputName2}, возраст - ${userAge} лет`;
                resultAge2.style.color = 'black';
            }
            // Для 11 лет пока не придумал условие

            ageForm2.reset();
        });
    }
};

// 5.10.5
function initCreditCalculator() {
    const creditForm = document.getElementById('creditForm');
    const birthDateInput = document.getElementById('birthDate');
    const loanAmountInput = document.getElementById('loanAmount');
    const amountGroup = document.getElementById('amountGroup');
    const resultCredit = document.getElementById('resultCredit');

    if (creditForm) {
        creditForm.addEventListener('submit', function(e) {
            e.preventDefault();

            loanAmountInput.required = false;

            // Validation for input data
            // Get user birth date
            const birthDateValue = birthDateInput.value;

            if (!birthDateValue) {
                showResult('Пожалуйста, введите дату рождения', 'error');
                return;
            }
            
            const birthDate = new Date(birthDateValue);

            if (isNaN(birthDate.getTime())) {
                showResult('Пожалуйста, введите корректную дату рождения', 'error');
                return;
            }

            // Validation for user age calculation
            const age = calculateAge(birthDate);

            if (isNaN(age)) {
                showResult('Ошибка при расчете возраста', 'error');
                return;
            }
            
            // Validation of maximum amount
            const creditInfo = getMaxCreditAmount(age);

            if (!creditInfo.approved) {
                showResult(creditInfo.message, 'error');
                amountGroup.style.display = 'none';
                loanAmountInput.disabled = true;
                loanAmountInput.value = '';
                return;
            }

            // Showing input amount
            amountGroup.style.display = 'block';
            loanAmountInput.disabled = false;
            showResult(creditInfo.message, 'success');

            if (loanAmountInput.value) {
                checkLoanAmount(loanAmountInput.value, creditInfo.maxAmount);
            }
        });

        // Validation for input amount
        loanAmountInput.addEventListener('input', function() {
            if (!this.disabled && birthDateInput.value) {
                const birthDate = new Date(birthDateInput.value);

                if (!isNaN(birthDate.getTime())) {
                    const age = calculateAge(birthDate);
                    const creditInfo = getMaxCreditAmount(age);

                    if (creditInfo.approved && this.value) {
                        checkLoanAmount(this.value, creditInfo.maxAmount);
                    }
                }
            }
        });
    }

    // Age calculation function
    function calculateAge(birthDate) {
        if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
            return NaN;
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // If the birthday was not yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Function for max amount
    function getMaxCreditAmount(age) {
        if (isNaN(age)) {
            return {
                approved: false,
                message: 'Ошибка при расчете возраста'
            };
        }
        
        if (age < 18) {
            return {
                approved: false,
                message: `Вам ${age} лет. Кредит выдаётся лицам по достижении 18 лет.`
            };
        } else if (age >= 18 && age <= 21) {
            return {
                approved: true,
                maxAmount: 50000,
                message: `Вам ${age} лет. Мы можем вам выдать максимум 50 000`
            };
        } else if (age >= 22 && age <= 35) {
            return {
                approved: true,
                maxAmount: 400000,
                message: `Вам ${age} лет. Мы можем вам выдать максимум 400 000`
            };
        } else if (age >= 36 && age <= 65) {
            return {
                approved: true,
                maxAmount: 1000000,
                message: `Вам ${age} лет. Мы можем вам выдать максимум 1 000 000`
            };
        } else {
            return {
                approved: false,
                message: `Вам ${age} лет. Кредит доступен только до 65 лет.`
            };
        }
    }

    // Function for rounding numbers
    function roundToNearestThousand(amount,maxAmount) {
        amount = Number(amount);

        if (isNaN(amount) || amount <= 0) {
            return 1000;
        }

        let roundedAmount = Math.round(amount / 1000) * 1000;

        if (roundedAmount > maxAmount) {
            roundedAmount = Math.floor(maxAmount / 1000) * 1000;
        }

        if (roundedAmount < 1000) {
            roundedAmount = 1000;
        }

        return roundedAmount;
    }

    // Function for comparison input amount and max amount
    function checkLoanAmount(amount, maxAmount) {
        amount = Number(amount);

        if (isNaN(amount) || amount <= 0) {
            showResult('Введите корректную сумму', 'error');
            return false;
        }

        if (amount % 1000 !== 0) {
            const roundedAmount = roundToNearestThousand(amount, maxAmount);
            showResult(
                `Сумма должна быть кратна 1000. ` +
                `Возможно, вы имели в виду ${roundedAmount.toLocaleString()}?`,
                'error'    
            );
            return false;
        }

        if (amount > maxAmount) {
            const roundedAmount = roundToNearestThousand(amount, maxAmount);            
            showResult(
                `Сумма превышает максимальную (${maxAmount.toLocaleString()}). ` +
                `Максимальная доступная сумма: ${roundedAmount.toLocaleString()}`,
                'error'
            );
            return false;
        }

        showResult(`Кредит одобрен на сумму ${amount.toLocaleString()}`, 'success');
        return true;
    }

    // Result display function
    function showResult(message, type) {
        resultCredit.textContent = message;
        resultCredit.className = `result ${type}`;
        resultCredit.style.display = 'block';
    }
}