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
//LECTURE
//LECTURE EVENTS

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', e => alert('on h1!', e.target));
//OLD SCHOOL WAY
// h1.onmouseleave = () => alert('leaving h1 !');
//OLD SCHOOL WAY
//ADDING AND REMOVING EVENTLISTENERS
// const alertMsg = () => {
//   alert('enter h1');
// };
// h1.addEventListener('mouseenter', alertMsg);
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertMsg);
// }, 1500);

//LECTURE EVENTS
//LECTURE EVENT PROPAGATION IN PRACTICE
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min - 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   //importantComment  stops bubbling
//   e.stopPropagation();
//   console.log('link ', e.target);
//   console.log('current target ', e.currentTarget);
//   //importantComment  stops bubbling
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('nav links ', e.target);
//   console.log('current target ', e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('nav  ', e.target);
//     console.log('current target ', e.currentTarget);
//     this.style.backgroundColor = randomColor();
//   },
//   //CAPTURE PARAMETER CHANGES DE ORDER THAT OBJECT LISTENS TO EVENTS SETTING TO TRUE BECOMES THE FIRST ONE THAT LISTENS
//   //default value == false
//   true
// );
// document
//   .querySelector('.nav')
//   .addEventListener('click', () => console.log('link'));
//LECTURE EVENT PROPAGATION IN PRACTICE
//LECTURE DOM TRAVERSING
//SELECTING CHILDREN
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
//importantComment .CHILDREN ONLY RETURNS DIRECT CHILDS
// console.log(h1.children);
//importantComment .CHILDREN ONLY RETURNS DIRECT CHILDS
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'lime';
//SELECTING CHILDREN
//SELECTING PARENTS
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
//SELECTING PARENTS
//SELECTING SIBLINGS
//SELECTING HTML ELEMENTS
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
//SELECTING HTML ELEMENTS
//SELECTING NODES
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.textDecoration = 'underline';
//   }
// });
//SELECTING NODES
//SELECTING SIBLINGS
//LECTURE DOM TRAVERSING
//LECTURE
//IMPLEMENTING TABS SECTION

//BEFORE REFACTOR
// (this.querySelectorAll('.btn').forEach(btn =>
//   btn.classList.remove('operations__tab--active')
// ),
// e.target.classList.add('operations__tab--active'))
//BEFORE REFACTOR
//AFTER REFACTOR
const tabsContainer = document.querySelector('.operations__tab-container');
const switchVisibleEl = (elementsArray, elementToShow, classToSwitch) => (
  elementsArray.forEach(element => element.classList.remove(classToSwitch)),
  elementToShow.classList.add(classToSwitch)
);
//AFTER REFACTOR

//importantComment TABS IMPLEMENTATION
//BEFORE REFACTOR
// tabsContainer.addEventListener('click', function (e) {
//   if (!e.target.closest('.btn')) return;
//   return e.target.classList.contains('btn')
//     ? (switchVisibleEl(
//         this.querySelectorAll('.btn'),
//         e.target || e.target.closest('.btn'),
//         'operations__tab--active'
//       ),
//       switchVisibleEl(
//         this.parentElement.querySelectorAll('.operations__content'),
//         [...this.parentElement.querySelectorAll('.operations__content')].filter(
//           content =>
//             content.classList.contains(
//               `operations__content--${e.target.dataset.tab}`
//             )
//         )[0],
//         'operations__content--active'
//       ))
//     : e.target.closest('.btn').classList.contains('btn')
//     ? (console.log(e.target),
//       switchVisibleEl(
//         this.querySelectorAll('.btn'),
//         e.target.closest('.btn'),
//         'operations__tab--active'
//       ),
//       switchVisibleEl(
//         this.parentElement.parentElement.querySelectorAll(
//           '.operations__content'
//         ),
//         [...this.parentElement.querySelectorAll('.operations__content')].filter(
//           content =>
//             content.classList.contains(
//               `operations__content--${e.target.closest('.btn').dataset.tab}`
//             )
//         )[0],
//         'operations__content--active'
//       ))
//     : null;
// });
//BEFORE REFACTOR
//AFTER REFACTOR
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
//AFTER REFACTOR
//importantComment TABS IMPLEMENTATION
//IMPLEMENTING TABS SECTION
//LECTURE
//LECTURE
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
  // console.log(e.currentTarget.querySelector('img'));

  const navLinks = [
    ...e.currentTarget.querySelectorAll('li'),
    e.currentTarget.querySelector('img'),
  ];
  // console.log(navLinks);
  e.target.classList.contains('nav__link')
    ? navLinks
        //BEFORE REFACTOR
        // .filter(el => {
        //   return (
        //     el.firstElementChild.getAttribute('href') !==
        //     e.target.getAttribute('href')
        //   );
        // })
        // .concat(e.currentTarget.querySelector('img'))
        //BEFORE REFACTOR
        //AFTER REFACTOR
        .forEach(el => {
          if (
            (el.firstElementChild &&
              el.firstElementChild.getAttribute('href') !==
                e.target.getAttribute('href')) ||
            !el.firstElementChild
          )
            setOpacityNavItem(el, notTargetOpacity);
        })
    : //AFTER REFACTOR
      null;
}
//FINISHED FINAL REFACTOR
nav.addEventListener('mouseover', function (e) {
  handleHoverNav(e, 0.5);
});
//FINISHED FINAL REFACTOR
nav.addEventListener('mouseout', function (e) {
  handleHoverNav(e, 1);
});
// nav.addEventListener('mouseover', e => {
//   console.log(e.currentTarget.querySelector('img'));

//   const navLinks = [
//     ...e.currentTarget.querySelectorAll('li'),
//     e.currentTarget.querySelector('img'),
//   ];
//   console.log(navLinks);
//   e.target.classList.contains('nav__link')
//     ? navLinks
//         //BEFORE REFACTOR
//         // .filter(el => {
//         //   return (
//         //     el.firstElementChild.getAttribute('href') !==
//         //     e.target.getAttribute('href')
//         //   );
//         // })
//         // .concat(e.currentTarget.querySelector('img'))
//         //BEFORE REFACTOR
//         //AFTER REFACTOR
//         .forEach(el => {
//           if (
//             (el.firstElementChild &&
//               el.firstElementChild.getAttribute('href') !==
//                 e.target.getAttribute('href')) ||
//             !el.firstElementChild
//           )
//             setOpacityNavItem(el, 0.5);
//         })
//     : //AFTER REFACTOR
//       null;
// });

// nav.addEventListener('mouseout', function (e) {
//   return [
//     e.currentTarget.querySelector('img'),
//     ...e.currentTarget.querySelectorAll('li'),
//   ].forEach(el => setOpacityNavItem(el, undefined));
// });

//IMPLEMENTING LIGHTER OPACITY IN ELEMENTS OF NAV EXCEPT IN THE ONE THATS HOVERED
//WORKING
//LECTURE
//LECTURE
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
//REFACTORED TO INTERSECTION OBSERVER API BECAUSE OF MUCH BETTER PERFORMANCE
// window.addEventListener('scroll', () =>
//   switchStickyNavClass(window.scrollY >= section1.offsetTop)
// );
//REFACTORED TO INTERSECTION OBSERVER API BECAUSE OF MUCH BETTER PERFORMANCE
//LECTURES
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
        //OBSERVER.UNOBSERVE == CLEAN UP FUNCTION TO EXCEUTE ANIMATION ONLY ONCE
        observer.unobserve(entry.target))
      : null,
  // entry.target.classList.add('section--hidden'),
  {
    root: null,
    threshold: 0.15,
  }
);
sectionsWithFadeAnimations.forEach(section => {
  sectionFadeAnimationObserver.observe(section);
});
//CREATING INTERESECTION OBSERVER
//LECTURES
//STICKY NAVIGATION
//LECTURE
//LECTURE LAZY LOADING IMAGES
const lazyLoadingImgObserver = new IntersectionObserver(function (
  entries,
  observer
) {
  const [{ target, isIntersecting }] = entries;
  isIntersecting
    ? //BEFORE REFACTOR
      // target.classList.remove('lazy-img'),
      //BEFORE REFACTOR

      (target.setAttribute('src', target.dataset.src),
      //AFTER REFACTOR
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

//LECTURE LAZY LOADING IMAGES
//LECTURE BUILDING SLIDER
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
  }' data-slide=${0}></button>`;
  dotsContainer.insertAdjacentHTML('beforeend', dots);
}
//SETTING DOTS
//SETTING ARROWS SLIDES ACTIONS
const arrowBtns = [
  ...document.querySelector('.slider').querySelectorAll('.slider__btn'),
];

function handleAnimationSlide() {}

const [leftBtn, rightBtn] = arrowBtns;
rightBtn.addEventListener('click', function (e) {
  const switchBoolean =
    parseInt(slides[slides.length - 1].style.translate) === 0;
  !switchBoolean
    ? slides.map(
        (slide, i) =>
          (slide.style.translate = `${parseInt(slide.style.translate) - 100}%`)
      )
    : slides.map(
        (slide, i, arr) =>
          (i === 0 && (slide.style.translate = `${parseInt(i)}%`)) ||
          (slide.style.translate = `${parseInt(i * 100)}%`)

        // (slide.style.translate = `${parseInt(
        //   arr[arr.length - i - 1].style.translate
        // )}%`)
      );
});
leftBtn.addEventListener('click', function (e) {
  const switchBoolean = parseInt(slides[0].style.translate) === 0;
  !switchBoolean
    ? slides.map(
        (slide, i) =>
          (slide.style.translate = `${parseInt(slide.style.translate) + 100}%`)
      )
    : slides.map(
        (slide, i, arr) =>
          (i === arr.length - 1 &&
            (slide.style.translate = `${parseInt(0)}%`)) ||
          (slide.style.translate = `${parseInt(arr.length - i - 1) * -100}%`)

        // (slide.style.translate = `${parseInt(
        //   arr[arr.length - i - 1].style.translate
        // )}%`)
      );
});
// arrowBtns.forEach(btn => {
//   btn.addEventListener('click', function (e) {

//   });
// });
//BEFORE REFACTOR
//SETTING ARROWS SLIDES ACTIONS

//LECTURE BUILDING SLIDER
