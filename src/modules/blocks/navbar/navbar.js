import {helper} from '../../../resources/scripts/helper.js';
import {bodyActions} from '../../../resources/scripts/bodyActions.js';
import {headerActions} from '../../sections/header/header.js';

export class Navbar {

	constructor(settings) {
		this.navbar = settings.elements.parrent;
		this.navLinks = this.navbar.querySelectorAll('.navbar__link');
		this.border = settings.border !== false ? this.navbar.querySelector('.navbar__border') : false;
		this.type = settings.type;
		this.duration = settings.duration;
		this.animateEvents = settings.animateEvents;

		this.resolveAnimate = true;

		this.scrollTarget = this.scrollTarget.bind(this);
		this.initScrollTarget = this.initScrollTarget.bind(this);
	}

	borderAnimate (target) {
		if (!this.border) return false

		if (target == null) {
			this.border.classList.add('navbar__border_hide');
			return false
		} else {
			this.border.classList.remove('navbar__border_hide');
		}

		const styles = {
			position: this.getCoordsElem(target).left - this.getCoordsElem(this.navbar).left,
			size: target.offsetWidth
		}

		if (this.type == 'horizontal') {
			this.border.style.transform = `translate3d(${styles.position}px, 0, 0)`;
			this.border.style.width = `${styles.size}px`;
		} else {
			styles.position = this.getCoordsElem(target).top - this.getCoordsElem(this.navbar).top;
			styles.size = target.offsetHeight;

			this.border.style.transform = `translate3d(0, ${styles.position}px, 0)`;
			this.border.style.height = `${styles.size}px`;
		}
	}

	getLimitPosition(elem) {
		const scrollTop = Math.round(window.pageYOffset + this.getHeaderActiveHeight());
		const section = document.querySelector(elem.getAttribute('href'));
		const sectionTop = Math.round(this.getCoordsElem(section).top + window.pageYOffset);
		const sectionBottom = sectionTop + section.offsetHeight;

		this.position = window.pageYOffset;

		return sectionTop <= scrollTop && sectionBottom > scrollTop;
	}

	scrollTarget() {
		const activeLink = this.navbar.querySelector('.navbar__link_active');
		const indexSection = [... this.navLinks].indexOf(
			[... this.navLinks].filter(el => this.getLimitPosition(el))[0]
			);

		if (activeLink) {
			activeLink.classList.remove('navbar__link_active');
		}

		if (indexSection < 0) {
			this.borderAnimate(null);
			return false
		} else {
			this.borderAnimate(this.navLinks[indexSection]);
			this.navLinks[indexSection].classList.add('navbar__link_active');
		}
	}

	getCoordsElem(elem) {
		const elemCoords = elem.getBoundingClientRect();

		return {
			top: elemCoords.top,
			left: elemCoords.left
		}
	}

	getHeaderActiveHeight() {
		const defaultHeader = document.querySelector('.header:not(.header-clone)');
		const cloneHeader = document.querySelector('.header-clone');

		const parseHeight = (header)=> +parseFloat(getComputedStyle(header).height).toFixed(2);
		const getCloneHeight = ()=> {
			cloneHeader.classList.add('header_active');
			const activeHeight = parseHeight(cloneHeader);
			cloneHeader.classList.remove('header_active');

			return activeHeight;
		}

		if (window.pageYOffset > 0) {
			this.headerActiveHeigth = parseHeight(defaultHeader);
		} else {
			this.headerActiveHeigth = getCloneHeight();
		}

		return this.headerActiveHeigth;
	}


	initAnimation(e) {
		if (e.target.classList.contains('navbar__link') == false) return false;
		if (this.resolveAnimate === false) return false;

		e.preventDefault();

		window.removeEventListener('scroll', this.initScrollTarget);

		const activeLink = this.navbar.querySelector('.navbar__link_active');
		const target = e.target.getAttribute('href');
		const section = document.querySelector(target);
		const controlPoint = Math.round(this.getCoordsElem(section).top + window.pageYOffset - this.getHeaderActiveHeight());

		if (activeLink) activeLink.classList.remove('navbar__link_active');
		e.target.classList.add('navbar__link_active');

		bodyActions.animate({to: controlPoint, from: window.pageYOffset, duration: this.duration})
		this.borderAnimate(e.target);

		setTimeout(()=> {
			window.addEventListener('scroll', this.initScrollTarget);
			this.resolveAnimate = true;
		}, this.duration)

		this.resolveAnimate = false;
	}
	
	initScrollTarget() {
		if(helper.isHidden(this.navbar) == false) {
			this.scrollTarget()
		};
	}

	init() {
		this.initScrollTarget();
		window.addEventListener('scroll', this.initScrollTarget);
		window.addEventListener('resize', this.initScrollTarget);
		this.animateEvents();
	}
}
