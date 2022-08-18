import cards from './cards';
import changePage from './changePage';
import images from './images';
import audios from './audios';

// define variables
const root = document.getElementById('root');
const cardsBlock = document.getElementById('cards');
const nav = document.getElementById('nav');
const navIcon = document.getElementById('nav-icon');
const sidebar = document.getElementById('sidebar');
const categoryImgs = [
  images.fly,
  images.ride,
  images.dog,
  images.lion,
  images.shirt,
  images.surprised,
  images.spain,
  images.bus,
];
let categoryImgPosition = 0;
const switchToggle = document.querySelector('.form-switch');
const sidebarLinks = document.querySelectorAll(
  '#sidebar .nav-item .nav-link',
);
const table = document.querySelector('table');

// create a new cards array so that words have additional properties to store statistics
const changedCards = JSON.parse(localStorage.getItem('changedCards')) || cards.map((arr, index) => {
  if (index !== 0) {
    arr = arr.map((word) => {
      word.clicked = 0;
      word.correct = 0;
      word.incorrect = 0;
      return word;
    });
  }
  return arr;
});

// toggle sidebar when hamburger icon is clicked
document.addEventListener('DOMContentLoaded', () => {
  navIcon.addEventListener('click', () => {
    document.body.classList.toggle('has-sidebar');
  });
});

// change active link
sidebarLinks.forEach((el) => {
  el.addEventListener('click', () => {
    changePage(el);
    document.body.classList.remove('has-sidebar');
  });
});

// remove sidebar on condition
document.addEventListener('click', (event) => {
  if (
    !nav.contains(event.target)
    && !sidebar.contains(event.target)
    && document.body.classList.contains('has-sidebar')
  ) {
    document.body.classList.remove('has-sidebar');
  }
});

// populate categories page with cards
changedCards[0].forEach((card) => {
  const cardItem = document.createElement('div');
  cardItem.className = 'card bg-info category';
  cardItem.style = 'width: 18rem; height: 17rem;';
  cardItem.innerHTML = `
  <div class="card-body">
    <img class="card-img-top" src="${categoryImgs[categoryImgPosition]}" alt="${card} example">
  </div>
  <div class="card-footer"><h2 class="card-title">${card}</h2></div>`;
  let link;
  Array.from(sidebarLinks).slice(1, -1).forEach((el) => {
    if (el.children[1].textContent === card) {
      link = el;
    }
  });
  cardItem.addEventListener('click', () => {
    changePage(link);
  });
  cardsBlock.appendChild(cardItem);
  categoryImgPosition += 1;
});

// change mode based on switch state
switchToggle.addEventListener('change', () => {
  if (!switchToggle.children[0].checked) {
    switchToggle.children[1].classList.add('text-white');
    document.querySelector('.home').style.color = '#fff';
    switchToggle.style.gap = '30px';
    switchToggle.children[1].textContent = 'TRAIN';
  } else {
    switchToggle.children[1].classList.remove('text-white');
    switchToggle.children[1].style.color = '#112bef';
    document.querySelector('.home').style.color = '#112bef';
    switchToggle.style.gap = '42px';
    switchToggle.children[1].textContent = 'PLAY';
  }
});

// function to create cards
function createCards(arr, isInCategory, blockToAppend) {
  arr.forEach((el) => {
    const cardBox = document.createElement('div');
    cardBox.className = 'box';
    cardBox.style = 'width: 18rem; height: 16rem;';
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    flipCard.innerHTML = `<div class="card">
           <div class="card-body">
              <img class="card-img-top" ${isInCategory ? 'data-src' : 'src'}="${images[el.word]}" alt="${el.word}">
           </div>
           <div class="card-footer flashcard-footer">
              <h3>${el.word}</h3>
              <i class="fa-solid fa-rotate-right"></i>
           </div>
        </div>`;
    cardBox.innerHTML = `
        <div class="box-inner">
            <div class="box-back">
              <div class="card-back">${el.translation}</div>
            </div>
        </div>`;
    cardBox.children[0].prepend(flipCard);
    const audio = new Audio();
    flipCard.appendChild(audio);
    audio.setAttribute(`${isInCategory ? 'data-src' : 'src'}`, `${audios[el.word]}`);
    flipCard.addEventListener('click', () => {
      if (audio.hasAttribute('src')) {
        audio.play();
        if (isInCategory) {
          el.clicked += 1;
          table.classList.remove('clear');
          localStorage.setItem('changedCards', JSON.stringify(changedCards));
        }
      }
    });
    cardBox.addEventListener('mouseleave', () => {
      setTimeout(() => {
        cardBox.children[0].classList.remove('flip');
        flipCard.classList.remove('hide');
        setTimeout(() => {
          cardBox.children[0].children[1].classList.remove('show');
        }, 250);
      }, 500);
    });
    cardBox.children[0].children[1].addEventListener('mouseleave', () => {
      cardBox.children[0].classList.remove('flip');
      setTimeout(() => {
        cardBox.children[0].children[1].classList.remove('show');
      }, 500);
      flipCard.classList.remove('hide');
    });
    flipCard.children[0].children[1].children[1].addEventListener('click', () => {
      cardBox.children[0].classList.add('flip');
      cardBox.children[0].children[1].classList.add('show');
      setTimeout(() => {
        flipCard.classList.add('hide');
      }, 250);
    });
    blockToAppend.children[1].appendChild(cardBox);
  });
}

// populate each category with word flashcards
changedCards[0].forEach((categoryName, index) => {
  const wordCategory = document.createElement('div');
  wordCategory.className = 'cards word-category';
  wordCategory.innerHTML = `
  <h2 class="text-center display-4">${categoryName}</h2>
  <div class="mb-4 container d-flex flex-wrap justify-content-center align-items-center gap-4 text-center"></div>`;
  categoryName = categoryName.replace(/[^a-zA-Z0-9]/g, '');
  categoryName = categoryName.charAt(0).toLowerCase() + categoryName.slice(1);
  wordCategory.id = categoryName;
  createCards(changedCards[index + 1], true, wordCategory);
  root.appendChild(wordCategory);
});

export default createCards;
