//Định nghĩa Validator
function Validator(options) {

    //Thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    //Lấy element của form
    var formElement = document.querySelector(options.form)

    if(formElement) {
        //Khi submit
        formElement.onsubmit = function(e) {
            e.preventDefault()

            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                validate(inputElement, rule)
            })
        }

        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                //Khi blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                //Khi bắt đầu nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

//Định nghĩa rules
Validator.isRequired = function(selector, message) {
    return {
        selector:selector,
        test: function(value) {
            return value.trim() ? undefined : message||'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector:selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message||'Trường này phải là email'
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector:selector,
        test: function(value) {
            return value.length >= min ? undefined : message||`Mật khẩu phải có ít nhất ${min} ký tự`
        }
    }
}

Validator.isConfimed = function(selector, getConfirmValue, message) {
    return {
        selector:selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message||'Giá trị nhập vào không chính xác'
        }
    }
}