// Burger-menu
(function () {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  const menuLink = menu.querySelectorAll('.menu__link');
  const burger = document.querySelector('.burger-menu');
  const cart = document.querySelector('.header__cart');
  const cartImg = document.querySelector('.header__cart-img');

  // Клик по кнопке burger открывает или закрывает меню
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Открывает меню
  function openMenu() {
    menu.classList.add('active');
    burger.classList.add('active');
    cart.classList.add('active');
    cartImg.src = 'img/header-cart-mobile.png';
    disableScroll();
  }

  // Закрывает меню
  function closeMenu() {
    menu.classList.remove('active');
    burger.classList.remove('active');
    cart.classList.remove('active');
    cartImg.src = 'img/header-cart.png';
    enableScroll();
  }

  // Отключает scroll на body
  function disableScroll() {
    const paddingRightBody = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = paddingRightBody + 'px';
  }

  // Включает scroll на body
  function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // При клике по пункту меню с анкорной ссылкой закрывает меню
  menuLink.forEach(item => {
    item.addEventListener('click', () => {
      const url = new URL(item.href);
      if (url.hash) {
        closeMenu();
      }
    });
  });
})();

// Табы
function tabs(selector) {
  const tabs = document.querySelector(selector);
  if (!tabs) return;
  const buttons = tabs.querySelectorAll('.tabs__button');
  const contents = tabs.querySelectorAll('.tabs__content');
  const images = tabs.querySelectorAll('.section-price__body-img');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Удаляем класс active с кнопок и с контента
      buttons.forEach(item => {
        item.classList.remove('active');
      });
      contents.forEach(item => {
        item.classList.remove('active');
      });
      images.forEach(item => {
        item.classList.remove('active');
      });

      //   Находим элемент content по data атрибуту data-tabs
      const dataTabs = button.dataset.tabs;
      const tabsContent = tabs.querySelectorAll(`.${dataTabs}`);

      // Добавляем класс active кнопкам и контенту
      button.classList.add('active');
      tabsContent.forEach(item => {
        item.classList.add('active');
      });
    });
  });
}

tabs('.section-price__body');

// Scroll fixed
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
})();

// slider1==========================================================
const swiper1 = new Swiper('.slider1', {
  // Optional parameters
  // slidesPerView: 4,
  loop: true,
  spaceBetween: 0,

  //   grabCursor: true,
  // centeredSlides: true,
  //   slidesPerView: 'auto',

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    380: {
      slidesPerView: 1.35,
      spaceBetween: 25,
    },

    500: {
      slidesPerView: 1.8,
      spaceBetween: 25,
    },

    650: {
      slidesPerView: 2,
      spaceBetween: 25,
    },

    1251: {
      slidesPerView: 2.5,
      spaceBetween: 25,
    },

    1601: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1921: {
      slidesPerView: 3.77,
      // slidesPerView: 2,
      spaceBetween: 35,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// slider2========================================================
let swiper2;
function initSwiper2() {
  swiper2 = new Swiper('.slider2', {
    // Optional parameters
    // slidesPerView: 4,
    loop: true,
    spaceBetween: 0,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      380: {
        slidesPerView: 1.35,
        spaceBetween: 25,
      },

      500: {
        slidesPerView: 1.8,
        spaceBetween: 25,
      },

      650: {
        slidesPerView: 2,
        spaceBetween: 25,
      },

      1251: {
        slidesPerView: 2,
        spaceBetween: 25,
      },

      1601: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
      1921: {
        // slidesPerView: 3.186,
        slidesPerView: 3.25,
        spaceBetween: 35,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider2__arrow-next',
      prevEl: '.slider2__arrow-prev',
    },
  });
}

initSwiper2();

(function () {
  const widthBody = 400;
  let isEnable = true;

  function onOffSwiper() {
    if (document.documentElement.clientWidth > widthBody) {
      if (!isEnable) {
        initSwiper2();
        isEnable = true;
      }
    } else {
      if (isEnable) {
        swiper2.destroy();
        isEnable = false;
      }
    }
  }

  onOffSwiper();

  window.addEventListener('resize', () => {
    onOffSwiper();
  });
})();

// modal ======================================================================
function modal(selectorModal, selectorButton) {
  // Кнопка открытия модального окна
  const openModal = document.querySelectorAll(selectorButton);

  // Элементы модального окна
  const modal = document.querySelector(selectorModal);
  if (modal && openModal) {
    const modalBody = modal.querySelector('.modal__body');
    const closeModal = modal.querySelector('.modal__btn');

    let clientWidth = document.documentElement.clientWidth;

    // Функция удаляет класс open
    function delClassOpen() {
      modal.classList.remove('open');
      modalBody.classList.remove('open');
    }

    // Возвращаем прокрутку и убираем padding-right
    function scrollShow() {
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
      document.querySelector('html').style.overflowY = '';
    }

    // Открытие модального окна
    openModal.forEach(item => {
      item.addEventListener('click', function () {
        modal.classList.add('open');
        modalBody.classList.add('open');

        // Убираем прокрутку с body и добавляем padding-right
        document.body.style.overflowY = 'hidden';
        document.querySelector('html').style.overflowY = 'hidden';
        let scrollWidth = document.documentElement.clientWidth - clientWidth;
        document.body.style.paddingRight = `${scrollWidth}px`;
      });
    });

    // Закрытие модального окна по нажатию на крестик
    closeModal.addEventListener('click', function () {
      delClassOpen();

      scrollShow();
    });

    // Закрытие модального окна по клику вне окна
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        delClassOpen();

        scrollShow();
      }
    });

    // Закрытие по нажатию клавиши Esc
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        delClassOpen();

        scrollShow();
      }
    });
  }
}

// Первый аргумент - селектор модального окна, второй - селектор кнопки открытия
modal('.modal-1', '.buy__list-modal');

// Маска телефона
let inputsTel = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99', { showMaskOnHover: true });
im.mask(inputsTel);
