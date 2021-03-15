document.addEventListener('DOMContentLoaded', function () {
  initheaderMenuHandler();
  initDropDownHandler();
  initSliderProject();
  initPrductSlider();
  initPromoProductSlider();
  initPhonePhotoValidation();
  initEmailPhotoValidation();
  initPhoneCalc();
  clickOutsideShowViewed();
  aboutSpilerToggle();
  const initStickyCostHandler = new InitSticky();
});

class InitSticky {
  constructor() {
      this.isStickyInit = false;
      this.screenWidth = $(window).width();
      this.stickyElementSelector = $("#stickyMobile");
      this.windowResizeHandler();
  }
  windowResizeHandler() {
    $(window)
    .ready(this.initStickyCost(this.screenWidth))
    .resize(() => {
      this.screenWidth = $(window).width();
      this.initStickyCost(this.screenWidth);
    });
  }

  initStickyCost(widthScreen) {
    if (widthScreen <= '992' && !this.isStickyInit) {
      this.stickyElementSelector.sticky({
        topSpacing:57,
        widthFromWrapper: false,
        responsiveWidth: true,
        zIndex: 10
      });
      this.isStickyInit = true;
    } else if (widthScreen > 992) {
      this.stickyElementSelector.unstick();
      this.isStickyInit = false;
    }
  }
}
const initPhoneCalc = () => {
  const phoneInput = document.querySelector('.js--phone-calc');
  if (!phoneInput) {
    return
  }
  Inputmask({ mask: '+7(999)999-99-99' }).mask(phoneInput);
}
const initPhonePhotoValidation = () => {
  const phoneSelector = document.querySelector('.js--photo-phone');
  if (!phoneSelector) {
    return
  }
  Inputmask({ mask: '+7(999)999-99-99' }).mask(phoneSelector);
  phoneSelector.oninput = (e) => {
    const rawVal = getRawTelNumber(e.target.value);
    if (isValidPhoneNumber(rawVal)) {
      document.querySelector('.js--btn-get-photo').disabled = false;
    } else {
      document.querySelector('.js--btn-get-photo').disabled = true;
    }
  }
}

const initEmailPhotoValidation = () => {
  const emailSelector = document.querySelector('.js--photo-email');
  if (!emailSelector) {
    return
  }
  emailSelector.oninput = (e) => {
    if (isValidEmail(e.target.value)) {
      document.querySelector('.js--btn-get-photo-email').disabled = false;
    } else {
      document.querySelector('.js--btn-get-photo-email').disabled = true;
    }
  }
}

const isValidEmail = (value) => {
  var reg = /^[^\@]+@.*\.[a-z]{2,6}$/i;
  return reg.test(value);
}

const isValidPhoneNumber = (value) => {
  if (value.length === 12) {
    return true;
  }
  return false;
}

const getRawTelNumber = (val) => {
  return val
    .replace(/-/g, '')
    .replace(/_/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
}

const initheaderMenuHandler = () => {
  $('.js--header-dropdown-item').on('mouseenter', function (event) {
    const imgId = $(event.currentTarget).attr('data-hov-img-id');
    const wrapper = $('.main-header-dropdown');
    wrapper.addClass('active');
    $('.main-header-dropdown-bg').removeClass('show');
    $(`#hov${imgId}`).addClass('show');
  });

  $('.js--header-dropdown-item').on('mouseleave', function (event) {
    const wrapper = $('.main-header-dropdown');
    $('.main-header-dropdown-bg').removeClass('show');
    wrapper.removeClass('active');
  });
};
const onToggleSpoilerPricin = (el) => {
  const spoilerParent = $(el).parents('.js--spoiler-pricing-parent');
  $(el).toggleClass('mp-pricin-btn--opened');
  spoilerParent.toggleClass('mp-pricin-item--opened');
};

const onShowProjectPopUp = (id) => {
  onTogglePopUp(id);
  initProjectPopupSlider();
};

const onTogglePopUp = (id) => {
  $(`#${id}`).toggleClass('show');
  $('body').toggleClass('body--no-scroll');
};

const onToggleMobileMenu = () => {
  $('.main-header-nav').toggleClass('show');
  $('.main-header').toggleClass('opened');
  $('body').toggleClass('body--no-scroll');
};

const initProjectPopupSlider = () => {
  $('.js--project-popup-nav-slider').slick({
    dots: false,
    slidesToScroll: 1,
    infinite: true,
    variableWidth: true,
    arrows: true,
    prevArrow: $('.slider-arrow-project--prew'),
    nextArrow: $('.slider-arrow-project--next'),
  });
  $('.js--project-popup-main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    fade: true,
    customPaging: function (slider, i) {
      const thumb = $(slider.$slides[i]).data('image');
      return `<div style="background-image: url('${thumb}');" class="project-popup-main-pagin"></div>`;
    },
  });
};

const initSliderProject = () => {
  if ($.fn.slick != undefined) {
    var $slider = $('.js--mp-project-mobile');
    function showSliderScreen($widthScreen) {
      if ($widthScreen <= '992') {
        if (!$slider.hasClass('slick-initialized')) {
          $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            speed: 200,
            autoplay: false,
            centerMode: true,
            centerPadding: '18px',
          });
        }
      } else {
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }
      }
    }
    var widthScreen = $(window).width();
    $(window)
      .ready(showSliderScreen(widthScreen))
      .resize(function () {
        var widthScreen = $(window).width();
        showSliderScreen(widthScreen);
      });
  }
};
const initPrductSlider = () => {
  const productSlider = $('.js--product-card-slider');
  productSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  const widthScreen = $(window).width();
    if ( widthScreen > '992' ){
      $('.product-card-slider-info').text(``);
      return
    } 
    const currentSlideNum = (currentSlide ? currentSlide : 0) + 1;
    $('.product-card-slider-info').text(`${currentSlideNum} из ${slick.$slides.length}`);
  });
  productSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    fade: true,
    customPaging: function (slider, i) {
      const thumb = $(slider.$slides[i]).data('image');
      return `<div style="background-image: url('${thumb}');" class="product-card-slider-pagin"></div>`;
    },
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
          fade: false,
        },
      },
    ],
  });
};

const initPromoProductSlider = () => {
  $('.js--product-promo-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    prevArrow: $('.slider-arrow-product--prew'),
    nextArrow: $('.slider-arrow-product--next'),
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
  });
};

const initDropDownHandler = () => {
  dropDownClickHandler();
  clickSelectOutsideDropDown();
};

const dropDownClickHandler = () => {
  $('.js--dd-btn').on('click', function (event) {
    const parent = $(this).parents('.js--dd-parent');
    if ($(this).hasClass('opened')) {
      parent.toggleClass('opened');
      $(this).toggleClass('opened');
    } else {
      $('.js--dd-parent.opened').removeClass('opened');
      $('.js--dd-btn.opened').removeClass('opened');
      parent.toggleClass('opened');
      $(this).toggleClass('opened');
    }
  });
};

const clickSelectOutsideDropDown = () => {
  $(document).on('click', function (e) {
    if (!$(e.target).closest($('.js--dd-parent.opened')).length) {
      $('.js--dd-parent.opened').removeClass('opened');
      $('.js--dd-btn.opened').removeClass('opened');
    }
  });
};

const onShowViewed = (el) => {
    $(el).toggleClass('active');
    $('.js--viewed-inner-parent').toggleClass('opened');
}

const clickOutsideShowViewed = () => {
  $(document).on('click', function (e) {
    if (!$(e.target).closest($('.js--viewed-inner-parent.opened')).length) {
      $('.js--viewed-inner-parent.opened').removeClass('opened');
      $('.btn--header-panel.active').removeClass('active');
    }
  });
};

const aboutSpilerToggle = () => {
  $('.js--about-spoiler').on('click', function (event) {
    $(this).toggleClass('opened');
    $(this).siblings('.about-base-text--feature').slideToggle(200);
  });
}