ymaps.ready(()=> {
	const myMap = new ymaps.Map('map', {
		center: [54.737008, 55.990249],
		zoom: 15
	}, {
		searchControlProvider: 'yandex#search'
	}),

	MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
	),

	myPlacemark = new ymaps.Placemark([54.739872, 55.982514], {
	}, {
		iconLayout: 'default#image',
		iconImageHref: '../img/contacts/label-map.svg',
		iconImageSize: [51, 62],
		iconImageOffset: [5, 38]
	});

	myMap.behaviors.disable('scrollZoom');
	myMap.controls.remove("searchControl");
	myMap.controls.remove("geolocationControl");
	myMap.controls.remove("fullscreenControl");
	myMap.controls.remove("trafficControl");
	myMap.controls.remove("typeSelector");
	myMap.controls.remove("urlerControl");

	myMap.geoObjects
	.add(myPlacemark);
});
