'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//LECTURE implementation of smooth scroll using JS
const nav = document.querySelector('nav');
nav.addEventListener('click', e => {
  e.target.classList.contains('nav__link')
    ? (e.preventDefault(),
      document.querySelector(e.target.getAttribute('href'))).scrollIntoView({
        behavior: 'smooth',
      })
    : null;
});
//LECTURE implementation of smooth scroll using JS
//LECTURE
btnScrollTo.addEventListener('click', () => {
  //LECTURE
  //MODERN WAY REALLY COOL!!
  section1.scrollIntoView({ behavior: 'smooth' });
  //MODERN WAY REALLY COOL!!
  //OLD SCHOOL WAY OF SCROLLING TO AN ELEMENT
  // const { y: coordY } = section1.getBoundingClientRect();
  // console.log(coordY);
  // console.log('Current scroll (x/y)', window.pageYOffset, pageXOffset);
  // console.log(
  //   'ViewPort height width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo({ top: coordY + window.pageYOffset, behavior: 'smooth' });
  //LECTURE
  //OLD SCHOOL WAY OF SCROLLING TO AN ELEMENT
});

const tabsContainer = document.querySelector('.operations__tab-container');
const switchVisibleEl = (elementsArray, elementToShow, classToSwitch) => (
  elementsArray.forEach(element => element.classList.remove(classToSwitch)),
  elementToShow.classList.add(classToSwitch)
);

const filterTabToDisplay = (tabs, tabIndex) =>
  tabs.filter(tab =>
    tab.classList.contains(`operations__content--${tabIndex}`)
  )[0];
tabsContainer.addEventListener('click', function (e) {
  const tabsContent = [
    ...this.parentElement.querySelectorAll('.operations__content'),
  ];
  const tabsButtons = this.querySelectorAll('.btn');
  if (!e.target.closest('.btn')) return;
  return e.target.classList.contains('btn')
    ? (switchVisibleEl(
        tabsButtons,
        e.target || e.target.closest('.btn'),
        'operations__tab--active'
      ),
      switchVisibleEl(
        tabsContent,
        filterTabToDisplay(tabsContent, e.target.dataset.tab),

        'operations__content--active'
      ))
    : e.target.closest('.btn').classList.contains('btn')
    ? (switchVisibleEl(
        tabsButtons,
        e.target.closest('.btn'),
        'operations__tab--active'
      ),
      switchVisibleEl(
        tabsContent,
        filterTabToDisplay(tabsContent, e.target.closest('.btn').dataset.tab),

        'operations__content--active'
      ))
    : null;
});

//importantComment TABS IMPLEMENTATION
//IMPLEMENTING TABS SECTION

//IMPLEMENTING LIGHTER OPACITY IN ELEMENTS OF NAV EXCEPT IN THE ONE THATS HOVERED
//WORKING
//importantComment MOUSE EVENTS = MOUSEENTER DOESN'T BUBBLE , MOUSEOVER YES IT DOES
//importantComment MOUSE EVENTS = MOUSEENTER DOESN'T BUBBLE , MOUSEOVER YES IT DOES
//importantComment MOUSE EVENTS = MOUSEOVER OPPOSITE  TO MOUSEOUT |||||| MOUSEENTER OPPOSITE TO MOUSELEAVE ,
//SETTING OPACTIY ON HOVER OR MOUSEOUT
const setOpacityNavItem = (el, opacity = 1) =>
  el.style ? (el.style.opacity = opacity) : null;
//SETTING OPACTIY ON HOVER OR MOUSEOUT
function handleHoverNav(e, notTargetOpacity) {
  const navLinks = [
    ...e.currentTarget.querySelectorAll('li'),
    e.currentTarget.querySelector('img'),
  ];
  // console.log(navLinks);
  e.target.classList.contains('nav__link')
    ? navLinks.forEach(el => {
        if (
          (el.firstElementChild &&
            el.firstElementChild.getAttribute('href') !==
              e.target.getAttribute('href')) ||
          !el.firstElementChild
        )
          setOpacityNavItem(el, notTargetOpacity);
      })
    : null;
}
//IMPLEMENTING LIGHTER OPACITY IN ELEMENTS OF NAV EXCEPT IN THE ONE THATS HOVERED
nav.addEventListener('mouseover', function (e) {
  handleHoverNav(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHoverNav(e, 1);
});

//IMPLEMENTING LIGHTER OPACITY IN ELEMENTS OF NAV EXCEPT IN THE ONE THATS HOVERED

//STICKY NAVIGATION
//ALTERNATE WAY OFF GETTIG OFFSET TOP ELEMENT COORDS
const { top: coordTop0 } = section1.getBoundingClientRect();
//THEN COMPARE IT'S VALUE TO WINDOW.SCROLLY
//ALTERNATE WAY OFF GETTIG OFFSET TOP ELEMENT COORDS
const switchStickyNavClass = scrollPositionTrigger => {
  return scrollPositionTrigger
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

//CREATING INTERESECTION OBSERVER
//CREATING STICKY NAVIGATION USING INTERSECTION OBSERVER
const obsCallback = function (entries) {
  const [{ isIntersecting }] = entries;

  switchStickyNavClass(!isIntersecting);
};
const obsOptions = {
  //SET TO NULL IN ORDER TO INTERSECT BODY ELEMENT
  root: null,
  threshold: [0, 0.7],
  rootMargin: `-${nav.getClientRects()[0].height}px`,
};
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

const header = document.querySelector('header');
headerObserver.observe(header);
//CREATING STICKY NAVIGATION USING INTERSECTION OBSERVER
const sectionsWithFadeAnimations = [...document.querySelectorAll('.section')];
sectionsWithFadeAnimations.map(section =>
  section.classList.add('section--hidden')
);
const sectionFadeAnimationObserver = new IntersectionObserver(
  ([entry], observer) =>
    entry.isIntersecting
      ? (entry.target.classList.remove('section--hidden'),
        //OBSERVER.UNOBSERVE == CLEAN UP FUNCTION TO EXECUTE ANIMATION ONLY ONCE
        observer.unobserve(entry.target))
      : null,

  {
    root: null,
    threshold: 0.15,
  }
);
sectionsWithFadeAnimations.forEach(section => {
  sectionFadeAnimationObserver.observe(section);
});
//CREATING INTERESECTION OBSERVER

//STICKY NAVIGATION

// LAZY LOADING IMAGES
const lazyLoadingImgObserver = new IntersectionObserver(function (
  entries,
  observer
) {
  const [{ target, isIntersecting }] = entries;
  isIntersecting
    ? (target.setAttribute('src', target.dataset.src),
      //REMOVING CLASS AFTER IMAGE LOADS WITH ADD EVENTLISTENERS
      target.addEventListener('load', () =>
        target.classList.remove('lazy-img')
      ))
    : //ADD UNOBSERVE TO FIRE IT ONLY ONCE
      // observer.unobserve(target)
      //ADD UNOBSERVE TO FIRE IT ONLY ONCE
      //REMOVING CLASS AFTER IMAGE LOADS WITH ADD EVENTLISTENERS
      //AFTER REFACTOR
      target.classList.add('lazy-img'),
    { root: null, threshold: 0.2 };
});
const imagesLazyLoading = [
  ...document.querySelector('.features').querySelectorAll('img[data-src]'),
];
imagesLazyLoading.forEach(imgLazyLoading => {
  lazyLoadingImgObserver.observe(imgLazyLoading);
});

//BUILDING SLIDER
const slides = [...document.querySelectorAll('.slide')];
//SETTING SLIDES POSITION
slides.map(
  (slide, index) =>
    //OLDER WAY
    // slide.style.transform = `translateX(${100 * index}%)`
    //OLDER WAY
    //NEW WAY CHECK BACKWARDS COMPATIBILITY
    (slide.style.translate = `${100 * index}%`)
  // (slide.dataset.test = `${0 + index}`)
  //NEW WAY CHECK BACKWARDS COMPATIBILITY
);
//SETTING SLIDES POSITION
//SETTING DOTS

const dotsContainer = document.querySelector('.dots');
for (let index = 0; index < 3; index++) {
  const dots = `<button class='dots__dot ${
    index === 0 && 'dots__dot--active'
  }' data-slide=${index}></button>`;
  dotsContainer.insertAdjacentHTML('beforeend', dots);
}

//SETTING DOTS
//SETTING ARROWS SLIDES ACTIONS
const arrowBtns = [
  ...document.querySelector('.slider').querySelectorAll('.slider__btn'),
];

//SETTING ARROWS SLIDES ACTIONS
const moveSlides = (switchBooleanIndex, movementDirection, resetPosition) => {
  const switchBoolean =
    parseInt(slides[switchBooleanIndex].style.translate) === 0;
  !switchBoolean
    ? slides.map(
        (slide, i) =>
          (slide.style.translate = `${
            parseInt(slide.style.translate) + movementDirection
          }%`)
      )
    : slides.map(
        (slide, i, arr) =>
          (i === slides.length - 1 - switchBooleanIndex &&
            (slide.style.translate = `${parseInt(0)}%`)) ||
          (slide.style.translate = `${resetPosition(i, slides)}%`)
      );
  setActiveClassDots(
    slides.findIndex(slide => parseInt(slide.style.translate) === 0)
  );
};
//SETTING ARROWS SLIDES ACTIONS
const sliderContainer = document.querySelector('.slider');

sliderContainer.addEventListener('click', e =>
  e.target.classList.contains('slider__btn--left')
    ? moveSlides(0, 100, (i, arr) => parseInt(arr.length - i - 1) * -100)
    : e.target.classList.contains('slider__btn--right')
    ? moveSlides(slides.length - 1, -100, i => parseInt(i * 100))
    : null
);

const setActiveClassDots = activeSlide =>
  [...dotsContainer.children].forEach((dot, index) => {
    index !== activeSlide
      ? dot.classList.remove('dots__dot--active')
      : dot.classList.add('dots__dot--active');
  });

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.dataset.slide) return;
  slides.map((slide, index) =>
    index < e.target.dataset.slide
      ? (slide.style.translate = `${parseInt(slide.style.translate) - 100}%`)
      : index > e.target.dataset.slide
      ? (slide.style.translate = `${parseInt(slide.style.translate) + 100}%`)
      : (slide.style.translate = '0%')
  ),
    setActiveClassDots(
      slides.findIndex(slide => parseInt(slide.style.translate) === 0)
    );
});
//SETTING MOVING SLIDES WHEN KEY LEFT OR KEY RIGHT ARE PRESSED
const sliderObserver = new IntersectionObserver(
  function (entries, observer) {
    const [{ target, isIntersecting }] = entries;

    !isIntersecting && null;
    isIntersecting &&
      document.addEventListener('keydown', e => {
        e.key === 'ArrowLeft'
          ? moveSlides(0, 100, (i, arr) => parseInt(arr.length - i - 1) * -100)
          : e.key === 'ArrowRight'
          ? moveSlides(slides.length - 1, -100, i => parseInt(i * 100))
          : null;
      });
  },
  {
    root: null,
    threshold: 0.3,
  }
);
//SETTING MOVING SLIDES WHEN KEY LEFT OR KEY RIGHT ARE PRESSED
sliderObserver.observe(sliderContainer);
