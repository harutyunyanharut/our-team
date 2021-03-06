$(window).on('load', function() {
    //svg points
    var config = {
        target: $(".svg-coord"),
        line: $(".svg-line"),
        delay: 40 // enter zero for live resizing
    };
    var drawBetweenObjects = {
        //cmake the line
        makeLine: function(line, point1, point2) {
            var className = point1.attr('id') + point2.attr('id');
            if ( className.includes("undefined") !== true ) { //error check
                $(line).clone().addClass('deleteMe').addClass(className).removeClass("original").insertAfter(line);
                //calculations (for legibility, these are separte vars)
                var x1 = point1.offset().left + (point1.width()/2);
                var y1 = point1.offset().top + (point1.height()/2);
                var x2 = point2.offset().left + (point2.width()/2);
                var y2 = point2.offset().top + (point2.height()/2);
                $("."+className).attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2); //svg attributes
            } else { console.error("undefined object") }
        },
        findLines: function(search) {
            $(".deleteMe").remove(); //remove last set of lines
            $(search).each(function(index, el){
                if ( search.eq(index + 1).length ) { //only do drawBetweenObject if there is another.
                    drawBetweenObjects.makeLine(config.line, $(this), search.eq(index + 1));   //args order - line, point1 and point2 - the next div.
                }
            });
        },
        init: function() {
            drawBetweenObjects.findLines( config.target );
            //give resizing time to happen
            var resizeId;
            $(window).resize(function() {
                clearTimeout(resizeId);
                if (config.delay !== 0) {
                    resizeId = setTimeout(doneResizing, config.delay);
                } else {
                    drawBetweenObjects.findLines( config.target );
                }
            });
            function doneResizing(){
                drawBetweenObjects.findLines( config.target );
            }
        }
    };

    drawBetweenObjects.init();

    //tab select
    $('.tab-btn').on('click touch', function () {
        var self = $(this),
            tabsArea = self.closest('.tabs-area'),
            dataTab = self.attr('data-tab');

        tabsArea
            .find('.tab-btn')
            .removeClass('active');

        self.addClass('active');

        tabsArea
            .addClass('tab-selected')
            .find('.tab')
            .removeClass('active');

        tabsArea
            .find(dataTab)
            .addClass('active');

        drawBetweenObjects.findLines( config.target );
    });


    //slider
    $('.slick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerPadding: '60px',
        infinite: true,
        arrows: true,
        swipeToSlide:true,
        nextArrow: '<span class="slick-next"></span>',
        prevArrow: '<span class="slick-prev"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
});
