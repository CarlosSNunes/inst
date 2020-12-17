
$(document).ready(function(){

    //--SCROLL EASE
	$(".scroll").click(function (event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
        }, 800);
    });
    
    $(".scroll-mobile").click(function (event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
        }, 800);
        if($('#menuMobile').is(':visible')){
            $('header').toggleClass('active');
        }
	});

    $("#menu-check").on('change',function(){
        $('header').toggleClass('active');
    })

    //bloqueia body com menu mobile aberto
    $('#menu-check').change(function(){
        if($(this).is(":checked")){
            $('body').addClass('blocked');
        }
        else{
            $('body').removeClass('blocked');
        }
    })

    
    // fixar e diminuir altura do menu no scroll
    $(window).scroll(function(){
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

    //Mostra back button
    $(window).scroll(function(){
        if ($(window).scrollTop() > 1000) {
            $('.back').addClass('show');
        }
        else {
            $('.back').removeClass('show');
        }
    });
    


    // animações de imagens
    AOS.init();
    
    //slider videos
    $('.slider-videos').slick({
        arrows: true,
        centerMode: true,
        centerPadding: '170px',
        slidesToShow: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '50px',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 575,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.slider-nav'
                }
            }
        ]
    });

    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-videos',
        dots: false,
        centerMode: true,
        centerPadding: '50px',
        infinite: true,
        focusOnSelect: true
    });
    
    
    //slider Aoio
    $('.slider-apoio').slick({
        arrows: true,
        dots: true,
        slidesToShow: 1,
        infinite: false
    });

    
    //Modal Video
    $('.abre-video').on('click', function(){
        var url = $(this).attr('param');
        $('#modalVideo').modal('show');
        $('#modalVideo').on('shown.bs.modal', function (e) {
            $('.embed-responsive-item').attr('src', url)
        })
        $('#modalVideo').on('hidden.bs.modal', function (e) {
            $('.embed-responsive-item').attr('src', '')
        })
    })
    

    //mascaras formulario
    $('.cel').mask('(00) 00000-0000');
    $('.tel').mask('(00) 0000-0000');


})
