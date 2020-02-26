import {helper} from '../../../resources/scripts/helper.js';

class Statistic {
	constructor() {
		this.progressCollection = document.querySelectorAll('.statistic__count');
		this.maxValue = 999;
	}

	getCountNum(progressParent) {
		const countNum = progressParent.querySelector('.statistic__count-num');
		const text = +countNum.textContent;

		// countNum.classList.add('statistic__count-num_show');

		return {
			elem: countNum,
			text: text
		}
	}

	getCircleLength(progressParent) {
		const circleSvg = progressParent.querySelector('.statistic__circle-prgs');
		const radius = +circleSvg.getAttribute('r');
		const circleLength = 2 * Math.PI * radius;

		return {
			elem: circleSvg,
			length: circleLength
		}
	}

	setCircleLength() {
		const zeroizeStroke = (progressParent)=> {
			const circle = this.getCircleLength(progressParent).elem;
			const circleLength = this.getCircleLength(progressParent).length;

			circle.setAttribute('stroke-dashoffset', circleLength);
			circle.setAttribute('stroke-dasharray', `${circleLength} ${circleLength}`);
		}

		this.iterationProgress(zeroizeStroke);
	}

	animate(progressParent) {

		// const progressAnimate = (progressParent)=> {
		const countCircle = this.getCircleLength(progressParent);
		const countNum = this.getCountNum(progressParent);

		const countAnimate = (progress)=> {
			countNum.elem.textContent = Math.ceil(countNum.text * progress);

			if (+countNum.elem.textContent > this.maxValue) {
				countNum.elem.textContent = `> ${this.maxValue}`
			};
		}

		const circleAnimate = (progress)=> {
			let result = (0 - countCircle.length) * progress + countCircle.length;

			countCircle.elem.setAttribute('stroke-dashoffset', result);
		}

		const animateOptions = {
			duration: 2000,
		  	timing: (timeFraction)=> {
		  		return 1 - Math.pow(1 - timeFraction, 2);
	  		},
		  	draw: (progress)=> {
		  		countAnimate(progress);
		  		circleAnimate(progress);
		  	}
		}

		helper.animate(animateOptions);
	}

	iterationProgress(iterationFunc) {
		for (let i = 0; i < this.progressCollection.length; i++) {
			iterationFunc(this.progressCollection[i])
		}
	}

	init() {
		this.setCircleLength();
	}

}

export const statistic = new Statistic();

