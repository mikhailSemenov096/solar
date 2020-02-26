// Состояния и валидация полей
class Inputs {
	constructor() {
		this.parentClass = 'field-wrap';
		this.inputClass = 'field-wrap__input';
		this.activeClass = 'field-wrap_active';
		this.errorClass = 'field-wrap_error';
	}

	removeErrorClass(e) {
		const fieldWrap = e.target.closest(`.${this.parentClass}`);

		if (fieldWrap) {
			if (fieldWrap.classList.contains(this.errorClass)) {
				fieldWrap.classList.remove(this.errorClass);
			}
		}
	}

	focusActions() {
		const addActiveClass = (e)=> {
			if (!e.target.classList.contains(this.inputClass)) return;

			e.target.closest(`.${this.parentClass}`).classList.add(this.activeClass);
		}

		document.addEventListener('focusin', addActiveClass);
	}

	blurActions() {
		const removeActiveClass = (e)=> {
			if (!e.target.classList.contains(this.inputClass)) return;

			if (e.target.value == '') {
				e.target.closest(`.${this.parentClass}`).classList.remove(this.activeClass);
			}
		}

		document.addEventListener('focusout', removeActiveClass);
	}

	inputActions() {
		const eventsInput = (e)=> {
			this.removeErrorClass(e);

			const nameAttr = e.target.getAttribute('name');

			if (nameAttr === 'phone') {
				this.formattingPhone(e);
			}

			if (nameAttr === 'name') {
				this.formattingName(e);
			}
		}

		document.addEventListener('input', eventsInput);
	}

	errorValidate(input, text, type) {
		const fieldWrap = input.closest('.field-wrap');
		const errorText = fieldWrap.querySelector('.field-wrap__text-error');

		if (type) {
			fieldWrap.classList.add('field-wrap_error');
			errorText.textContent = text;
		} else {
			fieldWrap.classList.remove('field-wrap_error');
			errorText.textContent = '';
		}

	}

	validateEmail(input) {
		const emailReg = /^([0-9a-zа-я.-_]+)@([0-9a-zа-я.-]+)\.([a-zа-я]{2,})$/iu;
		const emailTest = emailReg.test(input.value);

		if (emailTest === false) {
			this.errorValidate(input, 'Неверный формат email', true);
		}

		return emailTest;
	}

	validatePhone(input) {
		if (input.value.length < 18) {
			let text;

			if (input.value.length === 0) {
				text = 'Укажите, пожалуйста, Ваш номер телефона';
			} else {
				text = 'Неверный формат телефона';
			}

			this.errorValidate(input, text, true);

			return false;
		} 
	}

	validateName(input) {
		if (input.value.length === 0) {
			this.errorValidate(input, 'Укажите, пожалуйста, Ваше имя', true);
			return false;
		}
	}

	validateInput(inputs) {
		const result = [];
		const lengthInput = inputs.length;

		const changeValidateType = (validateType, input)=> {
			if (validateType(input) !== false) result.push(true);
		}	

		for (let i = 0; i < lengthInput; i++) {
			const nameAttr = inputs[i].getAttribute('name');

			switch (nameAttr) {
				case 'name':
					changeValidateType(this.validateName.bind(this), inputs[i]);
					break;

				case 'phone':
					changeValidateType(this.validatePhone.bind(this), inputs[i]);
					break;

				case 'email':
					changeValidateType(this.validateEmail.bind(this), inputs[i]);
					break;
			}
		}

		if (result.length != lengthInput) {
			return false;
		} else {
			return true;
		}
	}

	formattingPhone(e) {
		const num = e.target.value.replace('+7', '').replace(/\D/g, '').split(/(?=.)/);
		const numLength = num.length;

	    if (numLength >= 0) {
	    	if (e.inputType === 'insertFromPaste') {
	    		num.splice(0, 1, '+7');
	    	} else {
	    		num.splice(0, 0, '+7');
	    	}
	  	}

	    if (numLength >= 1) {
	    	num.splice(1, 0, ' (');
	    }

	    if (numLength >= 4) {
	    	num.splice(5, 0, ') ');
	    }

	    if (numLength >= 7) {
	    	num.splice(9, 0, '-');
	    }

	    if (numLength >= 9) {
	    	num.splice(12, 0, '-');
	    }

	    if (numLength >= 1 && num[2] == '') {
	    	num.splice(0, num.length);
	    }

	    if (numLength >= 11) {
	    	num.splice(15, num.length - 15);
	    }

	    e.target.value = num.join('');
	}

	formattingName(e) {
		const valueArr = e.target.value.replace(/[^A-zА-я ]/g, '').split(' ');

		for (let i = 0; i < valueArr.length; i++) {
			valueArr[i] = valueArr[i].charAt(0).toUpperCase() + valueArr[i].slice(1).toLowerCase();
		}

		e.target.value = valueArr.join(' ');
	}

	init() {
		this.focusActions();
		this.blurActions();
		this.inputActions();
	}
}

export const inputsGroup = new Inputs();