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
tabsContainer.addEventListener('click', function (e) {
  if (!e.target.closest('.btn')) return;
  return e.target.classList.contains('btn')
    ? (switchVisibleEl(
        this.querySelectorAll('.btn'),
        e.target || e.target.closest('.btn'),
        'operations__tab--active'
      ),
      switchVisibleEl(
        this.parentElement.querySelectorAll('.operations__content'),
        [...this.parentElement.querySelectorAll('.operations__content')].filter(
          content =>
            content.classList.contains(
              `operations__content--${e.target.dataset.tab}`
            )
        )[0],
        'operations__content--active'
      ))
    : e.target.closest('.btn').classList.contains('btn')
    ? (console.log(e.target),
      switchVisibleEl(
        this.querySelectorAll('.btn'),
        e.target.closest('.btn'),
        'operations__tab--active'
      ),
      switchVisibleEl(
        this.parentElement.parentElement.querySelectorAll(
          '.operations__content'
        ),
        [...this.parentElement.querySelectorAll('.operations__content')].filter(
          content =>
            content.classList.contains(
              `operations__content--${e.target.closest('.btn').dataset.tab}`
            )
        )[0],
        'operations__content--active'
      ))
    : null;
});
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
nav.addEventListener('mouseover', e => {
  console.log(e.currentTarget.querySelector('img'));

  const navLinks = [
    ...e.currentTarget.querySelectorAll('li'),
    e.currentTarget.querySelector('img'),
  ];
  console.log(navLinks);
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
            setOpacityNavItem(el, 0.5);
        })
    : //AFTER REFACTOR
      null;
});
nav.addEventListener('mouseout', function (e) {
  return [
    e.currentTarget.querySelector('img'),
    ...e.currentTarget.querySelectorAll('li'),
  ].forEach(el => setOpacityNavItem(el, undefined));
});

//IMPLEMENTING LIGHTER OPACITY IN ELEMENTS OF NAV EXCEPT IN THE ONE THATS HOVERED
//WORKING
//LECTURE
