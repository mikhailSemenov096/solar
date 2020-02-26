import {smoothly} from '../../../resources/scripts/smoothly.js';
import {helper} from '../../../resources/scripts/helper.js';
import {bodyActions} from '../../../resources/scripts/bodyActions.js';

//Модальные окна
class Modal {
	constructor (options) {
		this.overlay = options.selectors.overlay;
		this.arrayModal = [];
	}

	show(modal) {
		const getIdProp = (el)=> {
			return el.id === modal.id;
		}

		const showModal = ()=> {
			const modalObj = {
				elem: this.appendPopup(modal, this.createOverlay(this.overlay)),
				id: modal.id,
				modals: [
					{
						elem: modal,
						active: true,
						classes: modal.className
					}
				]
			}

			if (this.arrayModal.length === 0) {
				bodyActions.hidden('body-hidden-elem');
			}

			this.arrayModal.push(modalObj);
			smoothly.transitionBlock(modal, 'popup_enter-to');
		}

		if (this.getAccordanceModal(this.arrayModal, getIdProp) === -1) {
			showModal();
		}
	}

	hide(modal) {
		const lastIndexModal = this.arrayModal.length - 1;

		const removeModals = ()=> {
			for (let i = 0; i < this.arrayModal[lastIndexModal].modals.length; i++) {
				const modalItem = this.arrayModal[lastIndexModal].modals[i];

				this.appendPopup(modalItem.elem, document.body);
				modalItem.elem.className = modalItem.classes;
			}

			this.arrayModal.splice(lastIndexModal, 1);
		}

		const hideCallback = ()=> {
			if (this.arrayModal[lastIndexModal] !== undefined) {
				this.removeOverlay(this.arrayModal[lastIndexModal].elem);
				removeModals();
			}

			if (this.arrayModal.length === 0) {
				bodyActions.scroll();
			}
		}

		smoothly.transitionNone(modal, 'popup_leave-to');
		smoothly.transitionNone(this.arrayModal[lastIndexModal].elem, 'smoothly-show', hideCallback);
	}

	showModalEvents() {
		document.addEventListener('click', (e)=> {
			if (!e.target.hasAttribute('data-modal')) return false;

			e.preventDefault();
			e.target.blur();

			const btnAttr = e.target.getAttribute('data-modal');

			this.modalActive = document.querySelector(`#${btnAttr}`);
			this.show(this.modalActive);
		});
	}

	closeModalEvents() {
		const elems = {
			startElem: null,
			endElem: null
		}

		const startEvent = (e)=> elems.startElem = e.target;
		const endEvent = (e)=> elems.endElem = e.target;

		document.addEventListener('mousedown', startEvent);
		document.addEventListener('touchstart', startEvent);
		document.addEventListener('mouseup', endEvent);
		document.addEventListener('touchend', endEvent);

		document.addEventListener('click', (e)=> {
			if (!e.target.classList.contains(this.overlay)) return false;
			if (elems.startElem === elems.endElem && elems.endElem.classList.contains(this.overlay)) {
				this.hide(this.getActiveModal().elem);
			}
		});

		document.addEventListener('click', (e)=> {
			if (!e.target.classList.contains('popup-close')) return false;
			this.hide(this.getActiveModal().elem);
		});

		document.addEventListener('keydown', (e)=> {
			if (this.arrayModal.length === 0) return false;

			if (e.key == 'Escape') {
				this.hide(this.getActiveModal().elem);
			}
		});
	}

	createOverlay(nameClassElem) {
		const overlay = document.createElement('div');

		overlay.className = `overlay ${nameClassElem} box-hidden`;
		// overlay.setAttribute('tabindex', '-1');
		document.body.appendChild(overlay);

		smoothly.transitionBlock(overlay, 'smoothly-show');

		return overlay;
	}

	removeOverlay(overlay) {
		document.body.removeChild(overlay);
	}

	appendPopup(modal, parent) {
		parent.appendChild(modal);

		return parent;
	}

	getActiveModal() {
		const modals = this.arrayModal[this.arrayModal.length - 1].modals;
		const getActiveProp = (el)=> {
			return el.active === true;
		}

		return modals[helper.getAccordanceElem(modals, getActiveProp)];
	}

	getAccordanceModal(array, getAccordance) {
		const indexActiveModal = array.indexOf(
			array.filter(el => getAccordance(el))[0]
		);

		return indexActiveModal;
	}

	nextModal(options) {
		const modals = this.arrayModal[this.arrayModal.length - 1].modals;
		// const options = {
		// 	current: e.target.closest('.popup'),
		// 	next: document.querySelector(`#${e.target.getAttribute('data-popup')}`),
		// 	nameClasses: {
		// 		enter: 'popup_enter-to',
		// 		leave: 'popup_leave-to'
		// 	},
		// 	type: 'next-delay'
		// }

		const getElemProp = (el)=> el.elem === options.next;

		if (helper.getAccordanceElem(modals, getElemProp) === -1) {
			modals.push({
				elem: options.next,
				active: false,
				classes: options.next.className
			})
		}

		this.getActiveModal().active = false;
		modals[helper.getAccordanceElem(modals, getElemProp)].active = true;

		smoothly.nextElem(options);
	}

	init() {
		this.showModalEvents();
		this.closeModalEvents();
	}
}

export const modal = new Modal({
	selectors: {
		overlay: 'overlay-modal'
	}
});