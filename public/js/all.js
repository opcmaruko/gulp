'use strict';

$(document).ready(function () {
    var showSkill = false;
    // $('.scrollTop').click(function(e) {
    //     e.preventDefault();
    //     var target = $(this).attr('href');
    //     var targetPos = $(target).offset();
    //     $('body').animate({
    //         scrollTop: targetPos
    //     }, 1000);
    // });
    $('.scrollTop').click(function () {
        var target = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(target).offset().top - 150
        }, 1000);
    }); //代表一個完整的執行區塊

    $(document).ready(function () {
        $('.dranimated').addClass('fadeIn');
    });

    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();

        $('.scrollTop').each(function () {
            var target = $(this).attr('href');
            var targetPos = $(target).offset();
            var targetHeight = $(target).outerHeight();
            if (targetPos - 1 <= scrollPos && targetPos + targetHeight > scrollPos) {
                $('.scrollTop').removeClass('active');
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        $('.nav').each(function () {
            if (scrollPos >= 680) {
                // console.log(scrollPos)
                $('.nav').removeClass('bg');
                $(this).addClass('bg');
            } else {
                $(this).removeClass('bg');
            }
        });

        // var skillTop = $('#skills').position();
        // if (skillTop <= (scrollPos + windowHeight / 2 + 100) && !showSkill) {
        //     showSkill = true;
        //     $('#skills .progress-bar').each(function() {
        //         var thisValue = $(this).data('progress');
        //         $(this).css('width', thisValue + '%');
        //     })
        // }

        $('.animated').each(function () {
            var thisPos = $(this).offset().top;
            if (thisPos <= scrollPos + windowHeight - 300) {
                $(this).addClass('fadeIn');
            }
        });
        $('.dr2animated').each(function () {
            var thisPos = $(this).offset().top;
            if (thisPos <= scrollPos + windowHeight - 300) {
                $(this).addClass('fadeIn');
            }
        });
        $('#profiles').css('background-position-y', -(scrollPos / 2) + 'px');
        $('#header-ele').css('transform', 'translateY(' + scrollPos / 2 + 'px)');
    });
});
'use strict';

var newfn2 = function newfn2() {
    console.log('LOVE');
};

newfn2();
//# sourceMappingURL=all.js.map
