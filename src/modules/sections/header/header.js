import {smoothly} from '../../../resources/scripts/smoothly.js';
import {helper} from '../../../resources/scripts/helper.js';
import {bodyActions} from '../../../resources/scripts/bodyActions.js';
import {Navbar} from '../../blocks/navbar/navbar.js'

class HeaderActions {

	constructor() {
		this.header = document.querySelector('.header');
		this.bodyHiddenActive = null;
	}

	// Вызывается при блокировке body и при скролле
	toggleFixHeader(currentScroll, bodyHidden) {
		if (bodyHidden === true || bodyHidden === false) {
			this.bodyHiddenActive = bodyHidden;
		}

		const fixedHeader = (curScroll)=> {
			if (curScroll > 0) {
				this.header.classList.add('header_active');
			} else {
				this.header.classList.remove('header_active');
			}
		}

		if (this.bodyHiddenActive && currentScroll !== undefined) {
			fixedHeader(currentScroll);
		} else if (!this.bodyHiddenActive && currentScroll === undefined) {
			fixedHeader(window.pageYOffset);
		} else {
			return;
		}
	}

	// Здесь создается клон хэдера и добавляется на страницу, чтобы компенсировать пустое пространство
	createCloneHeader() {
		this.cloneHeader = document.createElement('div');
		this.cloneHeader.className = 'header-clone header';
		this.cloneHeader.id = 'header-clone';
		this.cloneHeader.innerHTML = this.header.innerHTML;
		this.header.before(this.cloneHeader);

		const removeIdClone = (()=> {
			const elemsId = this.cloneHeader.querySelectorAll('[id]');

			if (elemsId.length === 0) return;

			for (let i = 0; i < elemsId.length; i++) {
				elemsId[i].removeAttribute('id');
			}
		})();
	}

	bodyAnimateTop() {
		this.header.addEventListener('click', (e)=> {

			if (!e.target.classList.contains('header__logo')) return;

			e.preventDefault();

			if (window.pageYOffset !== 0) {
				bodyActions.animate({to: 0, from: window.pageYOffset, duration: 700});
			}
		});
	}

	init() {
		this.createCloneHeader();
		this.bodyAnimateTop();
		window.addEventListener('scroll', ()=> {
			this.toggleFixHeader();
		});

		const navbar = new Navbar({
			elements: {
				parrent: this.header.querySelector('.header__navbar')
			},
			type: 'horizontal',
			duration: 700,
			animateEvents: ()=> {
				this.header.querySelector('.header__navbar').addEventListener('click', (e)=> {
					navbar.initAnimation(e);
				});
			}
		});

		navbar.init();
	}
}

export const headerActions = new HeaderActions();

