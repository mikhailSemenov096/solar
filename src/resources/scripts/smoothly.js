import {helper} from '../../resources/scripts/helper.js';

class Smoothly {
	constructor (options) {}

	transitionBlock(elem, nameClass, callback) {
		elem.classList.add(nameClass);
		elem.classList.add('active');
		elem.clientWidth;
		elem.classList.remove('box-hidden');

		this.transitionEnd(elem, nameClass, ()=> {
			if (callback !== undefined) callback();
		});
	}

	transitionNone(elem, nameClass, callback) {
		elem.classList.add(nameClass);
		elem.classList.add('box-hidden');

		this.transitionEnd(elem, nameClass, ()=> {
			elem.classList.remove('active');
			if (callback !== undefined) callback();
		});
	}

	transitionEnd(box, nameClass, callback) {
		const completeAnim = (elem, resolve)=> resolve();

		const elemAnimate = ()=> {
			return new Promise((resolve, reject)=> {
	 			box.addEventListener('transitionend', (e)=> {
	 				if (e.target !== e.currentTarget) return false;
	 				completeAnim(e.currentTarget, resolve);
	 			});
			});
		}

		elemAnimate().then((e)=> {
			box.removeEventListener('transitionend', completeAnim);
			if (nameClass !== null) box.classList.remove(nameClass);
			callback();
		});
	}

	slideIn(elem) {
		if (!elem.classList.contains('slide-in') && !elem.classList.contains('slide-out')) {
			elem.style.display = 'block';
			const currentHeight = elem.clientHeight + 'px';
			elem.style.display = '';
			elem.style.height = currentHeight;
		}

		this.transitionBlock(elem, 'slide-in', ()=> {
			elem.style = '';
		});
	}

	slideOut(elem) {

		if (!elem.classList.contains('slide-in') && !elem.classList.contains('slide-out')) {
			elem.style.height = elem.clientHeight + 'px';
		}

		elem.clientWidth;
		this.transitionNone(elem, 'slide-out', ()=> {
			elem.style = '';
		});
	}

	nextElem(options) {
		if (options.current.parentElement !== options.next.parentElement) {
			options.current.parentElement.appendChild(options.next);
		}

		// По типу выбираем способ смены элементов
		switch (options.type) {
			// Элементы меняются плавно, следующий элемент появляется после того, как исчезнет текущий
			case 'next-delay':
				this.transitionNone(options.current, options.nameClasses.leave, ()=> {
					this.transitionBlock(options.next, options.nameClasses.enter);
				});
				break;
			// Элементы меняются плавно и одновременно
			case 'next-no-delay':
				if (!this.resolveChangeElem) return false;

				options.next.classList.add('next-elem');

				this.transitionNone(options.current, options.nameClasses.leave);
				this.transitionBlock(options.next, options.nameClasses.enter, ()=> {
					this.resolveChangeElem = true;
					options.next.classList.remove('next-elem');
				});

				this.resolveChangeElem = false;

				break;
			// Анимируется только следующий элемент, текущий просто скрывается
			case 'next-smoothly':
				options.current.classList.add('box-hidden');
				if (options.current.classList.contains(options.nameClasses.enter)) {
					options.current.classList.remove(options.nameClasses.enter);
				}

				this.transitionBlock(options.next, options.nameClasses.enter);
				break;
			// Обычные табы
			default:
				options.current.classList.add('box-hidden');
				options.next.classList.remove('box-hidden');
				break;
		}



	}
}

export const smoothly = new Smoothly();
