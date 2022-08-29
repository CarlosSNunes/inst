$(document).ready(function () {
	AOS.init();

	let $window = $(window),
		$card = $('.grid-card'),
		$impactCard = $('.impact-group'),
		toggleSlick;

	toggleSlick = function () {
		if ($window.width() <= 820 && $card && $impactCard) {
			activatedSlickMobileCards($card);
			activatedSlickMobileImpacts($impactCard)
		}
	}

	$window.resize(toggleSlick);
	toggleSlick();

	$(".scroll").click(function (event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top - 100
		}, 800);
	});

	$(".scroll-mobile").click(function (event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
		}, 800);
		if ($('#menuMobile').is(':visible')) {
			$('header').toggleClass('active');
		}
	});

	$("#menu-check").on('change', function () {
		$('header').toggleClass('active');
	});

	//bloqueia body com menu mobile aberto
	$('#menu-check').change(function () {
		if ($(this).is(":checked")) {
			$('body').addClass('blocked');
		}
		else {
			$('body').removeClass('blocked');
		}
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() > 0) {
			$('header').addClass('sticky');
		}
		else {
			$('header').removeClass('sticky');
		}
	});

	if ($(window).scrollTop() > 0) {
		$('header').addClass('sticky');
	}
	else {
		$('header').removeClass('sticky');
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > 1000) {
			$('.back').addClass('show');
		}
		else {
			$('.back').removeClass('show');
		}
	});

	$('.abre-sitemap').on('click', function () {
		$(this).toggleClass('open');
		$('.sitemap-list').slideToggle();
	})

	function activatedSlickMobileCards(card) {
		$(card).not('.slick-initialized').slick({
			arrows: true,
			width: '320px',
			slidesToShow: 1,
			infinite: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						centerPadding: '100px',
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 992,
					settings: {
						centerPadding: '50px',
						slidesToShow: 2,
						width: '300px',
					}
				},
				{
					breakpoint: 768,
					settings: {
						centerPadding: '100px',
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 575,
					settings: {
						centerMode: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
					}
				}
			]
		});
	}

	function activatedSlickMobileImpacts(card) {
		const group = $('.impact-group .info');
		if (group) group.addClass('position-relative p-3 top-0 bottom-0 start-0 end-0');

		$(card).not('.slick-initialized').slick({
			arrows: true,
			width: '175px',
			slidesToShow: 2,
			infinite: false,
		});
	}
});

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
		.register('/inspetorfrau/serviceWorker.js')
		.then(function (registration) {
			console.log('ServiceWorker registration successful with scope:', registration.scope);
		}).catch(function (error) {
			console.log('ServiceWorker registration failed:', error);
		});
	})
}