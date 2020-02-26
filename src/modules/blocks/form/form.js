import {inputsGroup} from '../inputs-group/inputs-group.js';
import {modal} from '../modal/modal.js';

export const submitFormActions = ()=> {
	const popupSuccess = document.querySelector('.popup-success');

	const successFormActions = (e, inputs, agreeInput)=> {
		e.target.reset();

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].closest('.field-wrap').classList.remove('field-wrap_active');
		}

		agreeInput.setAttribute('checked', true);

		if (e.target.closest('.popup')) {
			// Вызываем метод nextModal, чтобы в случае успеха закрыть окно с формой и открыть окно успеха
			modal.nextModal({
				current: e.target.closest('.popup'),
				next: popupSuccess,
				nameClasses: {
					enter: 'popup_enter-to',
					leave: 'popup_leave-to'
				},
				type: 'next-delay'
			});

		} else {
			modal.show(popupSuccess);
		}
	}

	const submitForm = (e)=> {
		if (!e.target.classList.contains('form')) return;
		e.preventDefault();

		const inputsBlock = e.target.querySelector('.form__inputs-block');
		const inputs = inputsBlock.querySelectorAll('.field-wrap__input_req');
		const agreeInput = e.target.querySelector('.check-field__input');

		if (inputsGroup.validateInput(inputs) === false || agreeInput.checked === false) return;

		const formData = new FormData(e.target);

		fetch('mail.php', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			successFormActions(e, inputs, agreeInput);
		})
		.catch(error => {
			alert('Произошла ошибка на сервере')
		});
	}

	document.addEventListener('submit', submitForm);
}
