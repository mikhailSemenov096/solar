import {smoothly} from '../../../resources/scripts/smoothly.js';
import {bodyActions} from '../../../resources/scripts/bodyActions.js';
import {Navbar} from '../navbar/navbar.js';
import {modal} from '../modal/modal.js';

class MobileMenu {
	constructor() {
		this.overlayMobile = null;
		this.mobileMenu = document.querySelector('.mobile-menu');
	}

	show(e) {
		if (!e.target.closest('.header__btn-mob-menu')) return;

		bodyActions.hidden();
		this.overlayMobile = modal.createOverlay('overlay-mobile');
		this.mobileMenu.classList.add('mobile-menu_active');
	}

	close(e) {
		bodyActions.scroll();
		this.mobileMenu.classList.remove('mobile-menu_active');
		smoothly.transitionNone(this.overlayMobile, 'smoothly-show', ()=> {
			modal.removeOverlay(this.overlayMobile);
			this.overlayMobile = null;
		});	
	}

	showMenuEvents() {
		document.addEventListener('click', (e)=> {
			this.show(e);
		});
	}

	closeMenuEvents() {
		document.addEventListener('click', (e)=> {
			if (this.overlayMobile === null) return;
			if (e.target !== this.overlayMobile) return;
			
			this.close(e);
		})
	}

	init() {
		this.showMenuEvents();
		this.closeMenuEvents();

		const navbarMobile = new Navbar({
			elements: {
				parrent: this.mobileMenu
			},
			type: 'vertical',
			duration: 700,
			border: false,
			animateEvents: (e)=> {
				this.mobileMenu.addEventListener('click', (e)=> {
					if (!e.target.closest('.mobile-menu')) return;
					if (!e.target.classList.contains('navbar__link')) return;

					this.close(e);
					navbarMobile.initAnimation(e);
				});
			}
		});

		navbarMobile.init();
	}
}

export const mobileMenu = new MobileMenu();
