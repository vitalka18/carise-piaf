(function() {
    $('.js-ring-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });
    
    $('.js-slider-main').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false
    });

    $('.animated').addClass("hidden-opacity").viewportChecker({
        classToAdd: 'visible ',
        offset: 100,
        callbackFunction: function(elem, action){
            var attr = elem.find('.js-viewport-checker').attr('id');
            if(attr) {
                $('.navigation-menu a').removeClass('active');
                $('.navigation-menu a[href="#' + attr + '"]').addClass('active');
            }
            
        }
    });

    var $menu = $(".nav-inner"),
        topPosition = $menu.offset().top * 1.5;
    $(window).scroll(function(){
      if ( $(this).scrollTop() > topPosition ){
        $menu.addClass('base-bg__position_fixed animated slideInDown');
      } else if($(this).scrollTop() <=topPosition ) {
          $menu.removeClass("base-bg__position_fixed animated slideInDown");
      }
    });//scroll
    
    $( ".modal" ).each(function(index) {
        $(this).on('show.bs.modal', function (e) {
            var open = $(this).attr('data-easein');

            if(open == 'shake') {
                $('.modal-dialog').velocity('callout.' + open);
            } else if(open == 'pulse') {
                $('.modal-dialog').velocity('callout.' + open);
            } else if(open == 'tada') {
                $('.modal-dialog').velocity('callout.' + open);
            } else if(open == 'flash') {
                $('.modal-dialog').velocity('callout.' + open);
            }  else if(open == 'bounce') {
                $('.modal-dialog').velocity('callout.' + open);
            } else if(open == 'swing') {
                $('.modal-dialog').velocity('callout.' + open);
            }else {
                $('.modal-dialog').velocity('transition.' + open);
            }    
        }); 
    });
}());

/**
 * Automatically executed if DOM is ready
 */
$(function() {
    $('a[href*="#"]').anchor({
        transitionDuration : 1200
    });
});

/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies    jQuery v1.5.0 http://jquery.com
 * @author          Cornel Boppart <cornel@bopp-art.com>
 * @copyright       Author
 
 * @version     1.0.5 (02/11/2014)
 */

;(function ($) {
    
    window.anchor = {
        
        /**
         * Default settings
         *
         */
        settings: {
            transitionDuration: 2000,
            transitionTimingFunction: 'swing',
            labels: {
                error: 'Couldn\'t find any section'
            }
        },

        /**
         * Initializes the plugin
         *
         * @param   {object}    options The plugin options (Merged with default settings)
         * @return  {object}    this    The current element itself
         */
        init: function (options) {
            // Apply merged settings to the current object
            $(this).data('settings', $.extend(anchor.settings, options));

            return this.each(function () {
                var $this = $(this);

                $this.unbind('click').click(function (event) {
                    event.preventDefault();
                    anchor.jumpTo(
                        anchor.getTopOffsetPosition($this),
                        $this.data('settings')
                    );
                });
            });
        },

        /**
         * Gets the top offset position
         *
         * @param   {object}    $object             The root object to get sections position from
         * @return  {int}       topOffsetPosition   The top offset position
         */
        getTopOffsetPosition: function ($object) {
            $('.navigation-menu a').removeClass('active');
            $object.addClass('active');
            var href = $object.attr('href'),
                $section = $($(href).get(0)),
                documentHeight = $(document).height(),
                browserHeight = $(window).height();

            if (!$section || $section.length < 1) {
                throw new ReferenceError(anchor.settings.labels.error);
            }

            if (($section.offset().top + browserHeight) > documentHeight) {
                return documentHeight - browserHeight;
            } else {
                return $section.offset().top;
            }
        },
        
        /**
         * Jumps to the specific position
         *
         * @param   {int}       topOffsetPosition   The top offset position
         * @param   {object}    settings            The object specific settings
         * @return  {void}
         */
        jumpTo: function (topOffsetPosition, settings) {
            var $viewport = $('html, body');

            $viewport.animate(
                {scrollTop: topOffsetPosition - 70},
                settings.transitionDuration,
                settings.transitionTimingFunction
            );

                // Stop the animation immediately, if a user manually scrolls during the animation.
            $viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
                if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
                    $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
                }
            });
        }

    };

    $.fn.anchor = function (method) {
            // Method calling logic
        if (anchor[method]) {
            return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return anchor.init.apply(this, arguments);
        } else {
            return $.error('Method ' + method + ' does not exist on jQuery.anchor');
        }
    };

})(jQuery);