document.addEventListener("DOMContentLoaded", function() {
    initExponentiation();
    initPromo();
    initCreditCalculator();
});

// Validation for Exponentiation
function validateInput(value) {
    if (!value || value.trim() === '') {
        return {isValid: false, message: "Пожалуйста, сначала заполните все поля"};
    }

    const num = Number(value);

    if (isNaN(num)) {
        return {isValid: false, message: "Пожалуйста, введите число"};
    }

    return {isValid: true, value: num};
}

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

            // Function Execution
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

            // Проверка ввода данных 
            // Получение даты рождения пользователя
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

            // Расчёт возраста и проверка максимальной суммы
            const age = calculateAge(birthDate);

            if (isNaN(age)) {
                showResult('Ошибка при расчете возраста', 'error');
                return;
            }

            const creditInfo = getMaxCreditAmount(age);

            if (!creditInfo.approved) {
                showResult(creditInfo.message, 'error');
                amountGroup.style.display = 'none';
                loanAmountInput.disabled = true;
                loanAmountInput.value = '';
                return;
            }

            // Отображение поля для ввода суммы
            amountGroup.style.display = 'block';
            loanAmountInput.disabled = false;
            showResult(creditInfo.message, 'success');

            if (loanAmountInput.value) {
                checkLoanAmount(loanAmountInput.value, creditInfo.maxAmount);
            }
        });

        // Расчёт суммы после ввода
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

    // Функция расчёта возраста
    function calculateAge(birthDate) {
        if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
            return NaN;
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Если день рождения ещё не был в этом году
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Функция определения максимальной суммы кредита
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

    // Функция округления до ближайшего числа, кратного 1000
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

    // Функция проверки введённой суммы кредита
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

    // Функция отображения результата
    function showResult(message, type) {
        resultCredit.textContent = message;
        resultCredit.className = `result ${type}`;
        resultCredit.style.display = 'block';
    }
}