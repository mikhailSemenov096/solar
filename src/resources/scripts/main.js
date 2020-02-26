import '../../modules/sections/contacts/map.js';
import WOW from 'wow.js';
import {smoothly} from '../../resources/scripts/smoothly.js';
import {bodyActions} from '../../resources/scripts/bodyActions.js';
import {mainSlider} from '../../modules/sections/main-screen/main-screen.js';
import {commentsSlider} from '../../modules/sections/comments/comments.js';
import {workersSlider} from '../../modules/sections/workers/workers.js';
import {mobileMenu} from '../../modules/blocks/mobile-menu/mobile-menu.js';
import {Navbar} from '../../modules/blocks/navbar/navbar.js';
import {modal} from '../../modules/blocks/modal/modal.js';
import {statistic} from '../../modules/sections/statistic/statistic.js';
import {DropBlock} from '../../modules/blocks/drop-block/drop-block.js';
import {headerActions} from '../../modules/sections/header/header.js';
import {preloaderAction} from '../../modules/blocks/preloader/preloader.js';
import {inputsGroup} from '../../modules/blocks/inputs-group/inputs-group.js';
import {submitFormActions} from '../../modules/blocks/form/form.js';

document.addEventListener('DOMContentLoaded', function() {
	bodyActions.hidden();
	headerActions.init();
	mobileMenu.init();
	statistic.init();
	modal.init();
	inputsGroup.init();
	submitFormActions();

	const wow = new WOW({
		callback: (box)=> {
			if (box.classList.contains('statistic__count')) {
				statistic.animate(box);
			}
		},
	})

	bodyActions.bodyHiddenCallback = (scrollBarWidth, currentScroll, resolve)=> {
		// Т.к. body становится фиксированным и величина прокрутки равна 0,
		// то здесь вызываются функции зависящие от этой величины,
		// запоминаем currentScroll и передаем в эти функции
		headerActions.toggleFixHeader(currentScroll, resolve);
	},

	bodyActions.bodyScrollCallback = (scrollBarWidth, currentScroll, resolve)=> {
		headerActions.toggleFixHeader(undefined, resolve);
	}

	window.addEventListener('load', ()=> {

		const preloaderClose = ()=> {
			const preloader = document.querySelector('.preloader-page');
			const preloaderCallback = ()=> {
				document.body.removeChild(preloader);
				bodyActions.scroll();

				wow.init();
				// headerActions.init();
			};

			preloaderAction(preloader, 'smoothly-show', preloaderCallback);
		}

		preloaderClose();

	});
});
