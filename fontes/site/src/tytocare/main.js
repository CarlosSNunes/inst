/*! CarePlus-TytoCare v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */

/* scripts do site */
$((function(){

    AOS.init();

    //Menu Hamburger
    $('.hamburger').on('click', (function(){
        $(this).toggleClass('active');
        $('header').toggleClass('mobile-oppened');
        $('.menu-mobile').toggleClass('active');
    }));

    $('.menu-mobile .nav-link').on('click', (function(){
        $('.hamburger').click();
    }))

    $(".scroll").on('click',(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 150);
    }));

    $(".scroll-mobile").on('click',(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - 100
        }, 150);
    }));

    $('#mainMenu .nav-link').on('click', (function () {
        $('.active').toggleClass('active');
        $(this).toggleClass('active');
    }))
    var year = new Date().getFullYear();
    $(".ano").html(year);

    $(window).scroll((function () {
        if ($(window).scrollTop() > 1000) {
            $('.back').addClass('show');
        }
        else {
            $('.back').removeClass('show');
        }
    }));
}))