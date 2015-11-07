$(document).ready(function() {

    $(function () {
        var window_height = $(window).height(),
            content_height = window_height - 200;
        $('.screen_wrapper').height(content_height);
    });

    $(window).resize(function () {
        var window_height = $(window).height(),
            content_height = window_height - 200;
        $('.screen_wrapper').height(content_height);
    });

    $('.screen_wrapper').stop().animate({
        scrollTop: $(".screen_wrapper")[0].scrollHeight
    }, 1600);

});