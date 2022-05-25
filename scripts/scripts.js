var Main = (function (module) {
    return module
})(Main || {});

Main.Functions = (function (module) {

    module.Init = () => {
        Main.Functions.InitFadeIn();
        Main.Functions.InitTextAnimation();
        Main.Functions.InitBlinkingCursor();
    };

    module.InitFadeIn = () => {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $('.js_fade').each(function () {
                /* Check the location of each desired element */
              
                // var objectBottom = $(this).offset().top + $(this).outerHeight();               
                var objectBottom = $(this).offset().top + 200;

                /* If the element is completely within bounds of the window, fade it in */
                if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                    if ($(this).hasClass("js_fade_active") === false) {
                        $(this).addClass("js_fade_active");
                    }
                }
            });
        }).scroll(); //invoke scroll-handler on page-load
    };

    module.InitTextAnimation = () => {
        var TxtRotate = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
          };
          
          TxtRotate.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
          
            if (this.isDeleting) {
              this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
              this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            var seasonClass = "";

            if (fullTxt.toLowerCase().includes("spring")) {
              seasonClass = "spring";
            } else if (fullTxt.toLowerCase().includes("summer")) {
              seasonClass = "summer";
            } else if (fullTxt.toLowerCase().includes("autumn")) {
              seasonClass = "autumn";
            } else if (fullTxt.toLowerCase().includes("winter")) {
              seasonClass = "winter";
            }

            this.el.innerHTML = `<span class="wrap text-gradient-${seasonClass}">`+this.txt+'</span>';
          
            var that = this;
            var delta = 300 - Math.random() * 100;
          
            if (this.isDeleting) { delta /= 2; }
          
            if (!this.isDeleting && this.txt === fullTxt) {
              delta = this.period;
              this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
              this.isDeleting = false;
              this.loopNum++;
              delta = 500;
            }
          
            setTimeout(function() {
              that.tick();
            }, delta);
          };
          
          window.onload = function() {
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i=0; i<elements.length; i++) {
              var toRotate = elements[i].getAttribute('data-rotate');
              var period = elements[i].getAttribute('data-period');
              if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
              }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
            document.body.appendChild(css);
          };
    };

    module.InitBlinkingCursor = () => {
      let cursor = true;
      let speed = 500;

      setInterval(() => {
        if(cursor) {
          document.getElementById('span_BlinkingCursor').style.opacity = 0;
          cursor = false;
        }else {
          document.getElementById('span_BlinkingCursor').style.opacity = 1;
          cursor = true;
        }
      }, speed);
    }

    return module;
})(Main.Functions || {});