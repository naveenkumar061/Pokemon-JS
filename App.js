// Global Declarations
let offset = 0;
let currentPage = 1;
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const first = document.getElementById("first");
const last = document.getElementById("last");

// Initial States
prev.disabled = true;

// Fetching API
const getData = async (offset, currentPage) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  );
  const data = await response.json();
  const container = document.getElementById("allPokemons");
  const current = document.getElementById("current");
  current.innerHTML = `${currentPage}`;
  container.innerHTML = "";
  return data.results.map((item, index) => {
    const getIndividualData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      const data = await response.json();
      const obj = {
        img: data.sprites.other.dream_world.front_default,
        type: data.types[0].type.name,
      };
      const specificContainer = document.createElement("div");
      specificContainer.innerHTML = `
      <img src=${obj.img} alt=${item.name} />
      <h1>${item.name}</h1>
      <p>type: ${obj.type}</p>
      <button onclick="popUp()" id=${item.name} data=${item.name}>know more</button>
        `;
      container.appendChild(specificContainer);
    };
    getIndividualData();
  });
};

// Controlling of API by Using Buttons
prev.addEventListener("click", () => {
  offset -= 20;
  currentPage -= 1;
  getData(offset, currentPage);
  if (offset === 0) {
    prev.disabled = true;
    next.disabled = false;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
  // console.log(offset);
});
next.addEventListener("click", () => {
  offset += 20;
  currentPage += 1;
  getData(offset, currentPage);
  if (offset === 1280) {
    prev.disabled = false;
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
  // console.log(offset);
});
first.addEventListener("click", () => {
  offset = 0;
  currentPage = 1;
  getData(offset, currentPage);
  if (offset === 0) {
    prev.disabled = true;
    next.disabled = false;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
});
last.addEventListener("click", () => {
  offset = 1280;
  currentPage = 65;
  getData(offset, currentPage);
  if (offset === 1280) {
    prev.disabled = false;
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
});

// Calling Function Initially
getData(offset, currentPage);

//popUp Function
function popUp() {
  const name = event.target.id;
  const getIndividualData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    // console.log(data);
    const obj = {
      name: name,
      img: data.sprites.other.dream_world.front_default,
      type: data.types[0].type.name,
      abilities: data.abilities.map((item, index) => {
        return item.ability.name;
      }),
      height: data.height,
      stats: data.stats.map((item, index) => {
        return item.base_stat;
      }),
      weight: data.weight,
    };
    // console.log(obj.weight);
    displayIndividualInfo(obj);
  };
  getIndividualData();
}

// displayIndividualInfo(obj);
function displayIndividualInfo(obj) {
  console.log(obj);
  const container = document.getElementById("allPokemons");
  const load = document.getElementById("load");
  load.classList.add("hide-btns");
  container.innerHTML = `
  <div class="main-div">
    <button class="close" onclick="displayInitial()">X</button>
    <div class="main-info">
      <div class="left">
        <img src=${obj.img} alt=${obj.name} />
        <h1>${obj.name}</h1>
        <p>type : ${obj.type}</p>
        <p>height : ${obj.height}</p>
        <p>weight : ${obj.weight}</p>
      </div>
      <div class="right">
        <div class="abilities">
          <p>ability1 : ${obj.abilities[0]}</p>
          <p>ability2 : ${obj.abilities[1]}</p>
        </div>
        <div class="stats">
          <p>stat1 : ${obj.stats[0]}</p>
          <p>stat2 : ${obj.stats[1]}</p>
          <p>stat3 : ${obj.stats[2]}</p>
          <p>stat4 : ${obj.stats[3]}</p>
          <p>stat5 : ${obj.stats[4]}</p>
          <p>stat6 : ${obj.stats[5]}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

function displayInitial() {
  offset = 0;
  currentPage = 1;
  getData(offset, currentPage);
}
