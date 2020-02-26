import {helper} from '../../resources/scripts/helper.js';
import {headerActions} from '../../modules/sections/header/header.js'

class BodyActions {
	constructor(options) {
		this.selectorBodyHidden = options.selectorBodyHidden ? options.selectorBodyHidden : false;
		this.bodyHiddenElems = null;
		this.scrollBar = null;
		this.currentScroll = null;
		this.resolveHidden = false;

		this.bodyHiddenCallback = options.bodyHiddenCallback;
		this.bodyScrollCallback = options.bodyScrollCallback;
	}

	hidden() {
		if (this.resolveHidden) return;

		this.scrollBar = this.scrollBarWidth();
		this.currentScroll = window.pageYOffset;

		document.body.classList.add('body_hidden');
		document.body.style.paddingRight = this.scrollBar + 'px';
		document.body.style.top = -this.currentScroll + 'px';

		if (this.selectorBodyHidden) {
			this.bodyHiddenElems = document.querySelectorAll(`.${this.selectorBodyHidden}`);

			for (let i = 0; i < this.bodyHiddenElems.length; i++) {
				this.bodyHiddenElems[i].style.width = `calc(100% - ${this.scrollBar}px)`;
			}
		}

		this.resolveHidden = true;

		if (this.bodyHiddenCallback !== void 0) {
			this.bodyHiddenCallback(this.scrollBar, this.currentScroll, this.resolveHidden);
		}
	}

	scroll() {
		document.body.style.paddingRight = '';
		document.body.classList.remove('body_hidden');
		document.body.style.top = '';
		window.scrollTo(0, this.currentScroll);

		for (let i = 0; i < this.bodyHiddenElems.length; i++) {
			this.bodyHiddenElems[i].style.width = '';
		}

		this.resolveHidden = false;

		if (this.bodyScrollCallback !== void 0) {
			this.bodyScrollCallback(this.scrollBar, this.currentScroll, this.resolveHidden);
		}
	}

	animate(points) {
		const animateOptions = {
			duration: points.duration,
			timing: (timeFraction)=> {
				return 1 - Math.pow(1 - timeFraction, 2);
			},
			draw: (progress)=> {
				let result = (points.to - points.from) * progress + points.from;
				scrollTo(0, result);
			}
		}

		helper.animate(animateOptions);
	}

	scrollBarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}
}

export const bodyActions = new BodyActions({
	selectorBodyHidden: 'body-hidden-elem', // Наименование класса, присваемого элементам с position: fixed
});
