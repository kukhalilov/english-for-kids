import changedCards from './game';
import originalCards from './cards';
import createCards from './train';

// define variables
const statisticsLink = document.querySelector('#sidebar .nav-item:last-child');
const table = document.querySelector('table');
const tableBody = document.getElementById('table-body');
const resetBtn = document.querySelector('.reset');
const resetModal = document.getElementById('reset-modal');
const repeatBtn = document.querySelector('.repeat');
const repeatBlock = document.querySelector('#repeat');
const tableThs = document.querySelectorAll('th');
const originalCards2 = originalCards.map((arr, index) => {
  if (index !== 0) {
    arr = arr.map((word) => {
      word.clicked = 0;
      word.correct = 0;
      word.incorrect = 0;
      return word;
    }).sort((a, b) => {
      if (a.word > b.word) {
        return 1;
      } if (b.word > a.word) {
        return -1;
      }
      return 0;
    });
  }
  return arr;
});

// function to remove active styling of sort icons
function removeAllAscDesc() {
  const asc = Array.from(document.getElementsByClassName('asc'));
  const desc = Array.from(document.getElementsByClassName('desc'));
  asc.forEach((el) => el.classList.remove('asc'));
  desc.forEach((el) => el.classList.remove('desc'));
}

// function to create, update or reset table
function createTable(cards, forReset) {
  tableBody.innerHTML = '';
  for (let i = 1; i < cards.length; i += 1) {
    cards[i].map((el) => {
      const row = table.insertRow();
      tableBody.appendChild(row);

      const cell1 = row.insertCell();
      const text1 = document.createTextNode(el.word);
      cell1.appendChild(text1);

      const cell2 = row.insertCell();
      const text2 = document.createTextNode(el.translation);
      cell2.appendChild(text2);

      const cell3 = row.insertCell();
      const text3 = document.createTextNode(cards[0][i - 1]);
      cell3.appendChild(text3);

      const cell4 = row.insertCell();
      const text4 = document.createTextNode(forReset ? '0' : el.clicked);
      cell4.appendChild(text4);

      const cell5 = row.insertCell();
      const text5 = document.createTextNode(forReset ? '0' : el.correct);
      cell5.appendChild(text5);

      const cell6 = row.insertCell();
      const text6 = document.createTextNode(forReset ? '0' : el.incorrect);
      cell6.appendChild(text6);

      const cell7 = row.insertCell();
      const correctInP = Number(((el.correct / (el.correct + el.incorrect)) * 100).toFixed(1)) || 0;
      const text7 = document.createTextNode(forReset ? '0' : correctInP);
      cell7.appendChild(text7);

      return el;
    });
  }
}

createTable(changedCards, false);

resetBtn.addEventListener('click', () => {
  localStorage.removeItem('changedCards');
  createTable(originalCards2, true);
  table.classList.add('clear');
});

const words = [];

function findDifficultWords() {
  Array.from(tableBody.children).forEach((el) => {
    if (Number(el.children[5].textContent) > 0) {
      const word = changedCards.flat(3).find((a) => a.word === el.children[0].textContent);
      words.push(word);
    }
  });
}

resetModal.addEventListener('show.bs.modal', () => {
  document.getElementById('nav').classList.add('behind');
});

resetModal.addEventListener('hidden.bs.modal', () => {
  document.getElementById('nav').classList.remove('behind');
});

// show table when statistics link is clicked
statisticsLink.addEventListener('click', () => {
  removeAllAscDesc();
  tableBody.classList.add('unordered');
  let cardsArr = JSON.parse(localStorage.getItem('changedCards')) || changedCards;
  if (table.classList.contains('clear')) {
    createTable(originalCards2, true);
  } else {
    cardsArr = cardsArr.map((arr, index) => {
      if (index !== 0) {
        arr.sort((a, b) => {
          if (a.word > b.word) {
            return 1;
          } if (b.word > a.word) {
            return -1;
          }
          return 0;
        });
      }
      return arr;
    });
    createTable(cardsArr, false);
  }
});

// show difficult words when repeat difficult words button is clicked
repeatBtn.addEventListener('click', () => {
  findDifficultWords();
  const uniqueWords = Array.from(new Set(words));
  let difficultWords = uniqueWords.sort((a, b) => b.incorrect - a.incorrect).slice(0, 8);
  difficultWords = difficultWords.filter((el) => el.incorrect > 0);
  if (table.classList.contains('clear')) {
    difficultWords = [];
  }
  const currentCards = document.getElementsByClassName('show');
  currentCards[0].classList.remove('show');
  repeatBlock.classList.add('show');
  function removeOldOnes() {
    Array.from(repeatBlock.children[1].children).forEach((el, index) => {
      if (index !== 0) {
        el.remove();
      }
    });
  }
  if (difficultWords.length > 0) {
    repeatBlock.children[1].children[0].style.display = 'none';
    removeOldOnes();
    createCards(difficultWords, false, repeatBlock);
  } else {
    repeatBlock.children[1].children[0].style.display = 'block';
    removeOldOnes();
  }
});

// function to sort table
// taken from w3schools.com and adapted to suit application needs
function sortTable(n) {
  let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      if (dir === 'asc') {
        if (Number.isNaN(parseFloat(x.textContent))) {
          if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (Number(x.textContent) > Number(y.textContent)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (Number.isNaN(parseFloat(x.textContent))) {
          if (x.textContent.toLowerCase() < y.textContent.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (Number(x.textContent) < Number(y.textContent)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}

// sort table in ascending and descending order when thead ths are clicked
tableThs.forEach((th, i) => {
  th.addEventListener('click', () => {
    sortTable(i);
    tableBody.classList.remove('unordered');
    if (!th.classList.contains('asc') && !th.classList.contains('asc')) {
      removeAllAscDesc();
      th.classList.add('asc');
    } else if (th.classList.contains('asc')) {
      removeAllAscDesc();
      th.classList.add('desc');
    } else if (th.classList.contains('desc')) {
      removeAllAscDesc();
      th.classList.add('asc');
    }
  });
});
