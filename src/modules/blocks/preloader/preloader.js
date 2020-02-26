import {smoothly} from '../../../resources/scripts/smoothly.js';

export const preloaderAction = (preloader, nameClass, preloaderCallback)=> {
	setTimeout(()=> {
		smoothly.transitionNone(preloader, nameClass, preloaderCallback);
	}, 500)
}
