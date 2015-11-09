$(document).ready(function() {
    var wrapper = $('.screen_wrapper');
    var last_id = $('#last_message_id').val();
    $(function () {
        var window_height = $(window).height(),
            content_height = window_height - 200;
        $('.screen_wrapper').height(content_height);
    });

    $(window).resize(function () {
        var window_height = $(window).height(),
            content_height = window_height - 200;
        wrapper.height(content_height);
        wrapper.stop().animate({
            scrollTop: wrapper[0].scrollHeight
        }, 1600);

    });

    wrapper.stop().animate({
        scrollTop: wrapper[0].scrollHeight
    }, 1600);

    var source = new EventSource('/message');
    source.addEventListener("new_message", function(event) {
        var data = JSON.parse(event.data);
        if (data.id !== last_id) {
            last_id = data.id;
            $("#table").find('tbody')
                .append($('<tr><td class="name_column"><h2 class="username shadow">' +
                    data.name +
                    '</h2><div class="timestamp"><i class="fa fa-clock-o"></i><strong>' +
                    data.created + '</strong></div></h2></td><td><div class="message bubble">' +
                    data.message_text + '</div></td></tr>')
            );
            wrapper.stop().animate({
                scrollTop: wrapper[0].scrollHeight
            }, 500);
        }
    });




    $(".submit").click(function() {
        var name = $(".name").val();
        var message = $(".message_text").val();
        $.ajax({
            url: '/posts/create',
            cache: false,
            data: {
                message: message,
                name: name
            },
            method: "POST"})
            .done(function (data) {
            })
    });
});