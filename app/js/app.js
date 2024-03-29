document.addEventListener("DOMContentLoaded", function () {
  initheaderMenuHandler();
  initDropDownHandler();
  initSliderProject();
  initProductSlider();
  initPromoProductSlider();
  initPhonePhotoValidation();
  initEmailPhotoValidation();
  initPhoneCalc();
  clickOutsideShowViewed();
  aboutSpilerToggle();
  headerAnimateHandler();
  catalogSearchHandler();
  examplePopupTab();
  examplePopupImgHandler();
  const initStickyCostHandler = new InitSticky();
  const initFilter = new CatalogFilter();
  const initSelect = new CatalogSelect();
  mpParallaxInit();
  dataPickerInit();
});

const mpParallaxInit = () => {
  const parallaxSelector = document.querySelector(".js--mp-bg-parallax");
  if (!parallaxSelector) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(parallaxSelector, {
    y: `${innerHeight / 2}`,
    ease: "none",
    scrollTrigger: {
      trigger: parallaxSelector,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};
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
    if (widthScreen <= "992" && !this.isStickyInit) {
      this.stickyElementSelector.sticky({
        topSpacing: 57,
        widthFromWrapper: false,
        responsiveWidth: true,
        zIndex: 10,
      });
      this.isStickyInit = true;
    } else if (widthScreen > 992) {
      this.stickyElementSelector.unstick();
      this.isStickyInit = false;
    }
  }
}

const initPhoneCalc = () => {
  const phoneInput = document.querySelector(".js--phone-calc");
  if (!phoneInput) {
    return;
  }
  Inputmask({ mask: "+7(999)999-99-99" }).mask(phoneInput);
};

const initPhonePhotoValidation = () => {
  const phoneSelector = document.querySelector(".js--photo-phone");
  if (!phoneSelector) {
    return;
  }
  Inputmask({ mask: "+7(999)999-99-99" }).mask(phoneSelector);
  phoneSelector.oninput = (e) => {
    const rawVal = getRawTelNumber(e.target.value);
    if (isValidPhoneNumber(rawVal)) {
      document.querySelector(".js--btn-get-photo").disabled = false;
    } else {
      document.querySelector(".js--btn-get-photo").disabled = true;
    }
  };
};

const initEmailPhotoValidation = () => {
  const emailSelector = document.querySelector(".js--photo-email");
  if (!emailSelector) {
    return;
  }
  emailSelector.oninput = (e) => {
    if (isValidEmail(e.target.value)) {
      document.querySelector(".js--btn-get-photo-email").disabled = false;
    } else {
      document.querySelector(".js--btn-get-photo-email").disabled = true;
    }
  };
};

const isValidEmail = (value) => {
  var reg = /^[^\@]+@.*\.[a-z]{2,6}$/i;
  return reg.test(value);
};

const isValidPhoneNumber = (value) => {
  if (value.length === 12) {
    return true;
  }
  return false;
};

const getRawTelNumber = (val) => {
  return val
    .replace(/-/g, "")
    .replace(/_/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "");
};

const initheaderMenuHandler = () => {
  $(".js--header-dropdown-item").on("mouseenter", function (event) {
    const allItems = $(".js--header-dropdown-item");
    const imgId = $(event.currentTarget).attr("data-hov-img-id");
    const wrapper = $(".main-header-dropdown");
    allItems.addClass("no-hover");
    $(event.currentTarget).removeClass("no-hover");
    wrapper.addClass("active");
    $(".main-header-dropdown-bg").removeClass("show");
    $(`#hov${imgId}`).addClass("show");
  });

  $(".js--header-dropdown-item").on("mouseleave", function (event) {
    const wrapper = $(".main-header-dropdown");
    const allItems = $(".js--header-dropdown-item");
    allItems.removeClass("no-hover");
    $(".main-header-dropdown-bg").removeClass("show");
    wrapper.removeClass("active");
  });
};

const onToggleSpoilerPricin = (el) => {
  const spoilerParent = $(el).parents(".js--spoiler-pricing-parent");
  if ($(el).hasClass("mp-pricin-btn--opened")) {
    $(el).addClass("mp-pricin-btn--close");
  } else {
    $(el).removeClass("mp-pricin-btn--close");
  }
  $(el).toggleClass("mp-pricin-btn--opened");
  spoilerParent.toggleClass("mp-pricin-item--opened");
};

const onShowCalculationPopup = (id, type, nameVal = "") => {
  onTogglePopUp(id);
  const inputNameMap = {
    product: "js--order-name-product",
    stone: "js--order-name-stone",
  };
  $(`.${inputNameMap[type]}`).val(nameVal);
};

const onShowProjectPopUp = (id) => {
  onTogglePopUp(id);
  let initProjectPopup = null;
  initProjectPopup = new ProjectPopup();
};

const onTogglePopUp = (id) => {
  $(`#${id}`).toggleClass("show");
  $("body").toggleClass("body--no-scroll");
};
const onChangePopUp = (closeId, openId) => {
  $(`#${closeId}`).removeClass("show");
  $("body").toggleClass("body--no-scroll");
  onTogglePopUp(openId);
};
const onToggleMobileMenu = () => {
  $(".main-header-nav").toggleClass("show");
  $(".main-header").toggleClass("opened");
  $("body").toggleClass("body--no-scroll");
};

class ProjectPopup {
  constructor() {
    this.popupNavBtn = ".js--project-popup-nav";
    this.popupNavBtnSelector = $(this.popupNavBtn);
    this.spopupNavBtnChecked = $(`${this.popupNavBtn}:checked`);
    this.sliderNavSelector = $(".js--project-popup-nav-slider");
    this.sliderProjectSelector = $(".js--project-popup-main-slider");
    this.closeBtnSelector = $(".js--project-popups-close");
    this.init();
  }
  init() {
    this.initNavSlider();
    this.navbuttonHandler();
    const activeProjectId = this.spopupNavBtnChecked.data("project-id");
    this.selectProject(activeProjectId);
    this.closeHandler();
  }

  navbuttonHandler() {
    this.popupNavBtnSelector.on("change", (event) => {
      const activeProjectId = $(event.target).data("project-id");
      this.sliderProjectSelector.slick("unslick");
      this.selectProject(activeProjectId);
    });
  }

  closeHandler() {
    this.closeBtnSelector.on("click", () => {
      this.sliderNavSelector.slick("unslick");
      this.sliderProjectSelector.slick("unslick");
      $(`#popupProject`).removeClass("show");
      $("body").removeClass("body--no-scroll");
    });
  }

  selectProject(pgId) {
    $(".js--project-popup-project.show").removeClass("show");
    $(`#${pgId}`).addClass("show");
    this.initProjectSlider();
  }

  initNavSlider() {
    this.sliderNavSelector.not(".slick-initialized").slick({
      dots: false,
      slidesToScroll: 1,
      infinite: true,
      variableWidth: true,
      arrows: true,
      focusOnSelect: true,
      centerMode: true,
      prevArrow: $(".slider-arrow-project--prew"),
      nextArrow: $(".slider-arrow-project--next"),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  }

  initProjectSlider() {
    this.sliderProjectSelector.on(
      "init reInit afterChange",
      function (event, slick, currentSlide, nextSlide) {
        const widthScreen = $(window).width();
        if (widthScreen > "992") {
          $(".product-card-slider-info").text(``);
          return;
        }
        const currentSlideNum = (currentSlide ? currentSlide : 0) + 1;
        $(".project-popup-main-slide-page-counter").text(
          `${currentSlideNum} из ${slick.$slides.length}`
        );
      }
    );

    this.sliderProjectSelector.not(".slick-initialized").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true,
      fade: true,
      customPaging: function (slider, i) {
        const thumb = $(slider.$slides[i]).data("image");
        return `<div style="background-image: url('${thumb}');" class="project-popup-main-pagin"></div>`;
      },
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: false,
            arrows: true,
          },
        },
      ],
    });
  }
}

const initSliderProject = () => {
  if ($.fn.slick != undefined) {
    var $slider = $(".js--mp-project-mobile");
    function showSliderScreen($widthScreen) {
      if ($widthScreen <= "992") {
        if (!$slider.hasClass("slick-initialized")) {
          $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: false,
            speed: 200,
            autoplay: false,
            centerMode: true,
            centerPadding: "18px",
          });
        }
      } else {
        if ($slider.hasClass("slick-initialized")) {
          $slider.slick("unslick");
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

const initProductSlider = () => {
  const productSlider = $(".js--product-card-slider");
  productSlider.on(
    "init reInit afterChange",
    function (event, slick, currentSlide, nextSlide) {
      const widthScreen = $(window).width();
      if (widthScreen > "992") {
        $(".product-card-slider-info").text(``);
        return;
      }
      const currentSlideNum = (currentSlide ? currentSlide : 0) + 1;
      $(".product-card-slider-info").text(
        `${currentSlideNum} из ${slick.$slides.length}`
      );
    }
  );
  productSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: true,
    fade: true,
    customPaging: function (slider, i) {
      const thumb = $(slider.$slides[i]).data("image");
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
  $(".js--product-promo-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    prevArrow: $(".slider-arrow-product--prew"),
    nextArrow: $(".slider-arrow-product--next"),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
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
  $(".js--dd-btn").on("click", function (event) {
    const parent = $(this).parents(".js--dd-parent");
    if ($(this).hasClass("opened")) {
      parent.toggleClass("opened");
      $(this).toggleClass("opened");
    } else {
      $(".js--dd-parent.opened").removeClass("opened");
      $(".js--dd-btn.opened").removeClass("opened");
      parent.toggleClass("opened");
      $(this).toggleClass("opened");
    }
  });
};

const clickSelectOutsideDropDown = () => {
  $(document).on("click", function (e) {
    if (!$(e.target).closest($(".js--dd-parent.opened")).length) {
      $(".js--dd-parent.opened").removeClass("opened");
      $(".js--dd-btn.opened").removeClass("opened");
    }
  });
};

const onShowViewed = (el) => {
  $(el).toggleClass("active");
  $(".js--viewed-inner-parent").toggleClass("opened");
};

const clickOutsideShowViewed = () => {
  $(document).on("click", function (e) {
    if (!$(e.target).closest($(".js--viewed-inner-parent.opened")).length) {
      $(".js--viewed-inner-parent.opened").removeClass("opened");
      $(".btn--header-panel.active").removeClass("active");
    }
  });
};

const aboutSpilerToggle = () => {
  $(".js--about-spoiler").on("click", function (event) {
    $(this).toggleClass("opened");
    $(this).siblings(".about-base-text--feature").slideToggle(200);
  });
};

class CatalogFilter {
  constructor() {
    this.filterItemsArr = {
      filterStone: [],
      filterColor: [],
      filterCountry: [],
      filterUsage: [],
    };
    this.filterItemsInput = {
      costStart: "",
      costEnd: "",
    };
    this.checkBoxClass = ".js--filter-checkbox";
    this.checkBoxSelectors = document.querySelectorAll(this.checkBoxClass);
    this.inputCostSelector = document.querySelectorAll(
      ".js--filter-cost-input"
    );
    this.inputInnerClass = ".js--dd-input-inner";
    this.inputsInnerSelector = document.querySelectorAll(this.inputInnerClass);
    this.claerFilterBtnsSelector = document.querySelectorAll(
      ".js--dd-clear-filter"
    );
    this.claerFilterCostSelector = document.querySelector(
      ".js--dd-clear-cost-filter"
    );
    this.clearAllFilterSelector = document.querySelector(
      ".js--clear-all-filter"
    );
    this.mobileApplySelector = document.querySelector(".js--apply-filter");
    this.popupSelector = document.querySelector("#catalogFilterPopup");
    this.mainMenuSelector = document.querySelector(".main-header");
    this.init();
  }

  init() {
    if (!this.checkBoxSelectors.length) {
      return;
    }
    this.checkBoxHandler();
    this.inputCostHandler();
    this.clearFilterHandler();
    this.clearFilterCostHandler();
    this.clearAllFiltersHandler();
    this.applyFilterHandler();
  }

  checkBoxHandler() {
    for (let i = 0; i < this.checkBoxSelectors.length; i++) {
      this.checkBoxSelectors[i].addEventListener("change", (event) => {
        const content = event.target.value;
        const filterId = event.target.dataset.filterId;

        if (this.filterItemsArr[filterId].includes(content)) {
          this.filterItemsArr[filterId] = this.filterItemsArr[filterId].filter(
            (item) => item !== content
          );
        } else {
          this.filterItemsArr[filterId].push(content);
        }
        this.changeStateItem(event.target, this.filterItemsArr[filterId]);
      });
    }
  }

  inputCostHandler() {
    for (let i = 0; i < this.inputCostSelector.length; i++) {
      this.inputCostSelector[i].addEventListener("input", (event) => {
        const content = event.target.value;
        const filterId = event.target.dataset.filterId;
        const parentEl = event.target.closest(".js--dd-parent");
        const inputInner = document.querySelector(
          `${this.inputInnerClass}[data-filter-id="${filterId}"]`
        );
        const inputStart = document.querySelector(
          `.js--filter-cost-input[data-filter-id="costStart"]`
        );
        const inputInnerStart = document.querySelector(
          `${this.inputInnerClass}[data-filter-id="costStart"]`
        );

        inputInner.innerHTML = content;
        this.filterItemsInput[filterId] = content;
        if (!inputStart.value && filterId === "costEnd") {
          inputInnerStart.innerHTML = 0;
          this.filterItemsInput.costStart = 0;
        }
        this.showAllFiltersClearBtn();
        if (content.length) {
          parentEl.classList.add("active");
        } else {
          parentEl.classList.remove("active");
        }
      });
    }
  }

  checkEmptyFilters() {
    let isEmpty = true;
    Object.keys(this.filterItemsArr).forEach((key) => {
      if (this.filterItemsArr[key].length) {
        isEmpty = false;
      }
    });
    Object.keys(this.filterItemsInput).forEach((key) => {
      if (this.filterItemsInput[key]) {
        isEmpty = false;
      }
    });
    return isEmpty;
  }

  changeStateItem(el, filterItem) {
    const parentEl = el.closest(".js--dd-parent");
    const contentEl = parentEl.querySelector(".js--dd-selected-inner");
    const filterType = el.dataset.filterType;
    if (filterItem.length) {
      parentEl.classList.add("active");
      if (filterType === "quantity") {
        contentEl.innerHTML = filterItem.length;
      } else {
        contentEl.innerHTML = filterItem.join(", ");
      }
    } else {
      parentEl.classList.remove("active");
      contentEl.innerHTML = "";
    }
    this.showAllFiltersClearBtn();
  }

  showAllFiltersClearBtn() {
    if (this.checkEmptyFilters()) {
      this.clearAllFilterSelector.classList.remove("show");
      this.mobileApplySelector.disabled = true;
    } else {
      this.clearAllFilterSelector.classList.add("show");
      this.mobileApplySelector.disabled = false;
    }
  }

  clearFilterCostHandler() {
    this.claerFilterCostSelector.addEventListener(
      "click",
      this.clearFilterCost.bind(this)
    );
  }

  clearFilterHandler() {
    for (let i = 0; i < this.claerFilterBtnsSelector.length; i++) {
      this.claerFilterBtnsSelector[i].addEventListener(
        "click",
        this.clearFilter.bind(this)
      );
    }
  }

  clearAllFiltersHandler() {
    this.clearAllFilterSelector.addEventListener(
      "click",
      this.clearAllFilters.bind(this)
    );
  }

  clearFilter(evt) {
    const el = evt.target;
    const filterItemId = el.dataset.filterId;
    let filterItem = this.filterItemsArr[filterItemId];
    for (let i = 0; i < filterItem.length; i++) {
      for (let j = 0; j < this.checkBoxSelectors.length; j++) {
        if (this.checkBoxSelectors[j].value === filterItem[i]) {
          this.checkBoxSelectors[j].checked = false;
        }
      }
    }
    filterItem.splice(0, filterItem.length);
    this.changeStateItem(el, filterItem);
  }

  clearAllFilters(evt) {
    const parentEl = document.querySelectorAll(".js--dd-parent");
    const contentEl = document.querySelectorAll(".js--dd-selected-inner");
    const allCheckBox = this.checkBoxSelectors;
    evt.target.classList.remove("show");
    Object.keys(this.filterItemsArr).forEach((key) => {
      this.filterItemsArr[key].splice(0, this.filterItemsArr[key].length);
    });
    for (let i = 0; i < parentEl.length; i++) {
      parentEl[i].classList.remove("active");
    }
    for (let i = 0; i < contentEl.length; i++) {
      contentEl[i].innerHTML = "";
    }
    for (let i = 0; i < allCheckBox.length; i++) {
      allCheckBox[i].checked = false;
    }
    this.clearFilterCost();
    this.mobileApplySelector.disabled = true;
  }

  clearFilterCost() {
    this.claerFilterCostSelector
      .closest(".js--dd-parent")
      .classList.remove("active");
    for (let i = 0; i < this.inputCostSelector.length; i++) {
      this.inputCostSelector[i].value = "";
    }
    for (let i = 0; i < this.inputsInnerSelector.length; i++) {
      this.inputsInnerSelector[i].innerHTML = "";
    }
    this.filterItemsInput.costStart = "";
    this.filterItemsInput.costEnd = "";
  }

  applyFilterHandler() {
    this.mobileApplySelector.addEventListener("click", (event) => {
      this.togglePopup();
    });
  }

  togglePopup() {
    this.popupSelector.classList.toggle("show");
    this.mainMenuSelector.classList.toggle("hide");
    $("body").toggleClass("body--no-scroll");
  }
}

class CatalogSelect {
  constructor() {
    this.selectItemSelectors = document.querySelectorAll(".js--btn-select");

    this.init();
  }

  init() {
    this.selectItemHandler();
  }

  selectItemHandler() {
    for (let i = 0; i < this.selectItemSelectors.length; i++) {
      this.selectItemSelectors[i].addEventListener("click", this.selectItem);
    }
  }

  selectItem(evt) {
    const parent = this.closest(".js--dd-parent");
    const content = this.children[0];
    const cloneEl = content.cloneNode(true);
    const inner = parent.querySelector(".js--dd-select-inner");
    inner.innerHTML = "";
    inner.appendChild(cloneEl);
    parent.classList.add("active");
    parent.classList.remove("opened");
  }
}

const onToggleFilterPopUp = () => {
  document.querySelector("#catalogFilterPopup").classList.toggle("show");
  document.querySelector(".main-header").classList.toggle("hide");
  $("body").toggleClass("body--no-scroll");
};

const headerAnimateHandler = () => {
  const headerEl = $(".js--header-animate");
  let wScroll = $(window).scrollTop();
  const checkWindowScroll = () => {
    wScroll = $(window).scrollTop();
    if (wScroll >= 1) {
      headerEl.addClass("animate");
    } else {
      headerEl.removeClass("animate");
    }
  };
  if (headerEl) {
    checkWindowScroll();
    $(window).scroll(checkWindowScroll);
  }
};

const catalogSearchHandler = () => {
  const input = document.querySelector(".js--seacrh-input");
  const wrapper = document.querySelector(".js--seacrh-input-wrapper");
  if (!input) {
    return;
  }
  input.oninput = (e) => {
    const val = e.target.value;
    if (val.length >= 3) {
      wrapper.classList.add("opened");
    } else {
      wrapper.classList.remove("opened");
    }
  };
  $(document).on("click", function (e) {
    if (!$(e.target).closest($(".js--seacrh-input-wrapper.opened")).length) {
      $(".js--seacrh-input-wrapper.opened").removeClass("opened");
    }
  });
};

const examplePopupTab = () => {
  $(".js--example-tab-input").on("change", function (event) {
    const widthScreen = $(window).width();
    const element = $(event.target);
    const activeItem = $(`#${element.data("tab-id")}`);
    const prevActive = $(".js--example-img.show");
    if (widthScreen > "992") {
      prevActive.removeClass("show");
      activeItem.addClass("show");
    } else {
      const imgSrc = $(activeItem).children("img").attr("src");
      const imgSrcWP = $(activeItem)
        .children("source[type='image/webp']")
        .attr("srcset");
      examplePopupImgFancyOpen(imgSrc, imgSrcWP);
    }
  });
};

const onToggleExample = (id, tabId) => {
  onTogglePopUp(id);
  const allInput = document.querySelectorAll(".js--example-tab-input");
  const activeInput = document.querySelector(`[data-tab-id=${tabId}]`);
  const activeTab = document.querySelector(`#${tabId}`);
  const prevActive = document.querySelector(".js--example-img.show");

  for (let i = 0; i < allInput.length; i++) {
    allInput[i].checked = false;
  }
  activeInput.checked = true;
  prevActive.classList.remove("show");
  activeTab.classList.add("show");
};
const examplePopupImgHandler = () => {
  $(".js--example-img").on("click", function () {
    const imgSrc = $(this).children("img").attr("src");
    const imgSrcWP = $(this)
      .children("source[type='image/webp']")
      .attr("srcset");
    examplePopupImgFancyOpen(imgSrc, imgSrcWP);
  });
};

const examplePopupImgFancyOpen = (src, webP) => {
  $.fancybox.open(
    `<picture class="calculation-fancy-example-img">
      <source srcset="${webP}" type="image/webp">
      <img src="${src}">
    </picture>`
  );
};

const dataPickerInit = () => {
  $.datepicker.regional["ru"] = {
    prevText: "",
    nextText: "",
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    dayNames: [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ],
    dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    dateFormat: "dd-mm-yy",
    showButtonPanel: true,
    closeText: "",
  };
  $.datepicker.setDefaults($.datepicker.regional["ru"]);
  $(".js--data-picker")
    .datepicker({
      beforeShow: function (input, inst) {
        setTimeout(function () {
          inst.dpDiv.css({
            top:
              document.querySelector(".js--data-picker").getBoundingClientRect()
                .top - 278,
            left: document
              .querySelector(".js--data-picker")
              .getBoundingClientRect().left,
          });
        }, 0);
      },
    })
    .datepicker("setDate", new Date());
};
