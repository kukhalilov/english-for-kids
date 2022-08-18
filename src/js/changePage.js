const navIcon = document.getElementById('nav-icon');
const switchToggle = document.querySelector('.form-switch');

// function to change page that takes link parameter
function changePage(link) {
  navIcon.classList.remove('open');
  const currentActive = document.getElementsByClassName('active');
  currentActive[0].parentElement.style.backgroundColor = '#2a056f';
  currentActive[0].classList.remove('active');
  link.classList.add('active');
  link.parentElement.style.backgroundColor = '#e60023';

  const currentCards = document.getElementsByClassName('show');
  currentCards[0].classList.remove('show');
  let linkToGo = link.textContent.replace(/[^a-zA-Z0-9]/g, '');
  linkToGo = linkToGo.charAt(0).toLowerCase() + linkToGo.slice(1);
  const newCards = document
    .querySelector(`#${linkToGo}`);
  if (!newCards.classList.contains('home') && !newCards.classList.contains('statistics')) {
    const imgsInNewCards = newCards.querySelectorAll('img');
    const audioInNewCards = newCards.querySelectorAll('audio');
    imgsInNewCards.forEach((img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
    });

    audioInNewCards.forEach((el) => {
      if (!switchToggle.children[0].checked) {
        el.setAttribute('src', el.getAttribute('data-src'));
      }
    });
  }

  newCards.classList.add('show');
}

export default changePage;
