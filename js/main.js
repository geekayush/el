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

  // Drop a message
  $("#submit").on("click", function () {
    let message = $("textarea#message").val();
    if (message) {
      window.open("https://wa.me/+918005356490?text=" + message, "_blank");
    } else {
      $("#alert").removeClass("hide").addClass("show");
      setTimeout(function () {
        $("#alert").removeClass("show").addClass("hide");
      }, 3000);
    }
  });

  const blogList = $(".blogs");
  if (blogList.length) {
    $.getJSON("./data/blogs.json", function ({ data }) {
      data.forEach((blog, index) => {
        const { title, highlight, background } = blog;
        const block = `
        <a href="/blog#${index}">
          <div class="col-sm-12 col-md-10 col-md-offset-1 services service-box blog-card">
            <div class="custom-thumbnail" style="background-image: url(${background})"></div>
            <div class="services-content text-left">
              <h5>${title}</h5>
              ${highlight}
            </div>
          </div>
        </a>`;
        $("#blog-list").append(block);
      });
    }).fail(function () {
      console.log("An error has occurred.");
    });
  }

  const blog = $("#blog");
  if (blog.length) {
    $.getJSON("./data/blogs.json", function ({ data }) {
      const index = window.location.hash.substr(1);
      const { background, title, text } = data[index];
      const block = `
      <div class="container-fluid">
        <div class="blog-background" style="background-image: url(${background})"></div>
          <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
              <h2 class="blog-title">${title}</h2>
            </div>
          </div>  
          <div class="row">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
              ${text}
            </div>
          </div>
        </div>
      </div>`;
      $("#blog").append(block);
    }).fail(function () {
      console.log("An error has occurred.");
    });
  }
});
