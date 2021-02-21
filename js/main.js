$(document).ready(function () {
  // Header Scroll
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
      $("#header").addClass("fixed");
    } else {
      $("#header").removeClass("fixed");
    }
  });

  //counter
  let counterStarted = false;

  $(allInView);
  $(window).scroll(allInView);

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  function allInView() {
    if (isScrolledIntoView($("#counter")) && !counterStarted)
      $(".counter").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        counterStarted = true;
        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 4000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
  }

  // Fancybox
  $(".work-box").fancybox();

  // Flexslider
  $(".flexslider").flexslider({
    animation: "fade",
    directionNav: false,
  });

  // Page Scroll
  var sections = $("section");
  nav = $('nav[role="navigation"]');

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop();
    sections.each(function () {
      var top = $(this).offset().top - 76;
      bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("a").removeClass("active");
        nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
      }
    });
  });
  nav.find("a").on("click", function () {
    var $el = $(this);
    id = $el.attr("href");
    $("html, body").animate(
      {
        scrollTop: $(id).offset().top - 75,
      },
      500
    );
    return false;
  });

  // Mobile Navigation
  $(".nav-toggle").on("click", function () {
    $(this).toggleClass("close-nav");
    nav.toggleClass("open");
    return false;
  });
  nav.find("a").on("click", function () {
    $(".nav-toggle").toggleClass("close-nav");
    nav.toggleClass("open");
  });
});
