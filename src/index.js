let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//DOM Render Functions
function renderToy(toy) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
      <h2> ${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="like">Like ♥️</button>`

  card.querySelector('#like').addEventListener(() => console.log('click'));

  document.querySelector('#toy-collection').appendChild(card);
}

//submit button event listener
const createButton = document.querySelector(".add-toy-form");
createButton.addEventListener("submit", handleSubmit)

//submit button event handler
function handleSubmit(e) {
  e.preventDefault();
  let toyObj = {
    name: e.target['name'].value,
    image: e.target['image'].value,
    likes: 0
  }
  renderToy(toyObj);
  confirmToy(toyObj);
}

//fetch GET response
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.querySelector('#toy-collection');
    const cards = toys.map(toy => {
      const toyCards = document.createElement('div');
      toyCards.classList.add('card');
      toyCards.innerHTML =`
       <h2>${toy.name}</h2>
       <img src="${toy.image}" class="toy-avatar"/>
       <p>${toy.likes} Likes </p>
       <button class="like-btn" id="like">Like ♥️</button>
      `;
      return toyCards;
    });
    toyCollection.append(...cards);
  });

//fetch POST response
function confirmToy(toyOb) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyOb)
  })
    .then(res => res.json())
    .then(toy => console.log(toy))
}
