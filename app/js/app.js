document.addEventListener('DOMContentLoaded', function () {
  initheaderMenuHandler();
  initDropDownHandler();
  initSliderProject();
  initPrductSlider();
  initPromoProductSlider();
  $('#phone').mask('(999) 999-99-99');
});

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
  $('.js--product-card-slider').slick({
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
    customPaging: function (slider, i) {
      const thumb = $(slider.$slides[i]).data('image');
      return `<div style="background-image: url('${thumb}');" class="product-card-slider-pagin"></div>`;
    },
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
