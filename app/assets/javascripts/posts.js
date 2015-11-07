$(document).ready(function() {
    var wrapper = $('.screen_wrapper');
    $(function () {
        var window_height = $(window).height(),
            content_height = window_height - 200;
        $('.screen_wrapper').height(content_height);
    });

    $(window).resize(function () {
        var window_height = $(window).height(),
            content_height = window_height - 300;
        wrapper.height(content_height);
        wrapper.stop().animate({
            scrollTop: wrapper[0].scrollHeight
        }, 1600);

    });

    wrapper.stop().animate({
        scrollTop: wrapper[0].scrollHeight
    }, 1600);

});