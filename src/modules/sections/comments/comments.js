import Swiper from 'swiper';

const commentsSlider = new Swiper('.comments__slider',
	{
		loop: false,
		navigation: {
			nextEl: '.comments__btn-next',
			prevEl: '.comments__btn-prev'
		},
		pagination: {
			el: '.comments__dots',
			clickable: true
		},
		simulateTouch: false,
		spaceBetween: 30,
		slidesPerView: 2,
		breakpoints: {
			992: {
				slidesPerView: 1
			}
		}
	}
);

export {commentsSlider}

