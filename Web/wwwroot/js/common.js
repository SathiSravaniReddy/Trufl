    $('#rowclick').click(function () {
        var $slider = $('.right-section');
        $slider.animate({
            right: parseInt($slider.css('right'), 10) == -320 ?
                0 : -320
        });
    });
