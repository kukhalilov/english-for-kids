import changePage from './changePage';
import cards from './cards';
import audios from './audios';
import images from './images';

// get from local storage, if unavailable create new cards array
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

// define variables
const switchToggle = document.querySelector('.form-switch');
const categoryPages = document.getElementsByClassName('word-category');
const correctAudio = new Audio(audios.correct);
const incorrectAudio = new Audio(audios.error);
const successAudio = new Audio(audios.success);
const failureAudio = new Audio(audios.failure);
const table = document.querySelector('table');

// function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// display failure block
function failure(error, category) {
  const div = document.createElement('div');
  div.className = 'failure-block text-center';
  div.innerHTML = `<div><h2 class="display-4 mt-2">Maybe next time...</h2>
  <img class="img-fluid" src=${images.failure} alt="failure">
  <h3 class="display-6">You have made ${error} ${error === 1 ? 'mistake' : 'mistakes'}</h3></div>`;
  category.appendChild(div);
  setTimeout(() => {
    failureAudio.play();
    setTimeout(() => {
      changePage(document.querySelector('#sidebar .nav-link:first-child'));
      switchToggle.children[0].checked = false;
      switchToggle.dispatchEvent(new Event('change', { bubbles: true }));
      document.querySelector('.failure-block').remove();
    }, 3000);
  }, 500);
}

// display success block
function success(category) {
  const div = document.createElement('div');
  div.className = 'success-block text-center';
  div.innerHTML = `<div><h2 class="display-4 mt-2">You have won!</h2>
  <img class="img-fluid" src=${images.success} alt="success">
  <h3 class="display-6 mt-2">You haven't made any mistakes</h3></div>`;
  category.appendChild(div);
  setTimeout(() => {
    successAudio.play();
    setTimeout(() => {
      changePage(document.querySelector('#sidebar .nav-link:first-child'));
      switchToggle.children[0].checked = false;
      switchToggle.dispatchEvent(new Event('change', { bubbles: true }));
      document.querySelector('.success-block').remove();
    }, 3000);
  }, 500);
}

// change state when switch toggle is changed
switchToggle.addEventListener('change', () => {
  const footers = Array.from(document.querySelectorAll('.word-category .flashcard-footer'));
  if (switchToggle.children[0].checked) {
    footers.forEach((el) => {
      el.style.display = 'none';
      el.previousElementSibling.children[0].style.height = 'auto';
      el.parentElement.style.backgroundColor = '#112bef';
      el.parentElement.nextElementSibling.removeAttribute('src');
    });
    Array.from(categoryPages).forEach((p, index) => {
      const visibleCards = p.querySelectorAll('.card');
      const btnContainer = document.createElement('div');
      btnContainer.className = 'btn-start-container';
      btnContainer.innerHTML = '<button type="button" class="btn btn-start">Start Game</button>';

      const starContainer = document.createElement('div');
      starContainer.className = 'star-container';

      function addCorrectStar() {
        if (starContainer.children.length > 15) {
          starContainer.children[0].remove();
        }
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        star.style.color = '#1cf608';
        star.style.fontSize = '1.5rem';
        starContainer.appendChild(star);
      }

      function addIncorrectStar() {
        if (starContainer.children.length > 15) {
          starContainer.children[0].remove();
        }
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        star.style.color = '#999';
        star.style.fontSize = '1.5rem';
        starContainer.appendChild(star);
      }
      if (!p.children[2] && !p.children[3]) {
        p.appendChild(btnContainer);
        p.appendChild(starContainer);
      }
      const currentCards = changedCards[index + 1];
      shuffleArray(currentCards);

      const btnRepeat = document.createElement('i');
      btnRepeat.title = 'Repeat audio';
      btnRepeat.className = 'btn-repeat fa-solid fa-repeat';
      btnContainer.children[0].addEventListener('click', () => {
        let pos = 0;
        let currentCard = currentCards[0];

        let audio = new Audio(audios[currentCard.word]);
        let errorCount = 0;
        function clickHandler() {
          const cardWord = this.children[1].children[0].textContent;
          const clickedWord = changedCards[index + 1].find((el) => el.word === cardWord);
          if (cardWord === currentCard.word) {
            this.classList.add('inactive');
            correctAudio.play();
            table.classList.remove('clear');
            addCorrectStar();
            clickedWord.correct += 1;
            localStorage.setItem('changedCards', JSON.stringify(changedCards));
            pos += 1;
            if (pos === 8 && errorCount > 0) {
              setTimeout(() => {
                failure(errorCount, p);
              }, 800);
            } else if (pos === 8 && errorCount === 0) {
              setTimeout(() => {
                success(p);
              }, 800);
            } else {
              currentCard = currentCards[pos];
              audio = new Audio(audios[currentCard.word]);
              setTimeout(() => {
                audio.play();
              }, 500);
            }
            this.removeEventListener('click', clickHandler);
          } else {
            errorCount += 1;
            incorrectAudio.play();
            table.classList.remove('clear');
            addIncorrectStar();
            clickedWord.incorrect += 1;
            localStorage.setItem('changedCards', JSON.stringify(changedCards));
          }
        }

        Array.from(visibleCards).forEach((card) => {
          card.addEventListener('click', clickHandler);
          switchToggle.addEventListener('change', () => {
            if (!switchToggle.children[0].checked) {
              card.removeEventListener('click', clickHandler);
            }
          });
        });
        btnContainer.children[0].replaceWith(btnRepeat);
        btnContainer.classList.add('clicked');
        if (p.classList.contains('show')) {
          setTimeout(() => {
            audio.play();
          }, 800);
          btnRepeat.addEventListener('click', () => {
            audio = new Audio(audios[currentCard.word]);
            audio.play();
          });
        }
      });
    });
  } else {
    footers.forEach((el) => {
      el.style.display = 'block';
      el.previousElementSibling.children[0].style.height = '10rem';
      el.parentElement.style.backgroundColor = 'initial';
      el.parentElement.classList.remove('inactive');
      el.parentElement.nextElementSibling.setAttribute('src', el.parentElement.nextElementSibling.getAttribute('data-src'));
    });

    Array.from(categoryPages).forEach((p) => {
      if (p.children[2]) {
        p.children[2].remove();
        p.children[2].remove();
      }
    });
  }
});

export default changedCards;
