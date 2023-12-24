// Global Declarations
let offset = 0;
let currentPage = 1;
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const first = document.getElementById("first");
const last = document.getElementById("last");
const current = document.getElementById("current");
const offsetElement = document.getElementById("offset");
let typeAll = [];

// Initial States
prev.disabled = true;

// Fetching API
const getData = async (offset, currentPage) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  );
  const data = await response.json();
  const container = document.getElementById("allPokemons");
  current.innerHTML = `${currentPage}`;
  offsetElement.innerHTML = `${offset}`;
  container.innerHTML = "";
  return data.results.map((item, index) => {
    const getIndividualData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      const data = await response.json();
      const obj = {
        img: data.sprites.other.dream_world.front_default,
        type: data.types.map((item, index) => {
          return item.type.name;
        }),
      };
      typeAll = [...typeAll, obj.type[0]];
      const specificContainer = document.createElement("div");
      specificContainer.classList.add(`${obj.type[0]}`);
      specificContainer.classList.add("specific");
      specificContainer.innerHTML = `
      <img src=${obj.img} alt=${item.name} />
      <h2>${item.name}</h2>
      <p>type: ${obj.type[0]}</p>
      <button onclick="popUp()" id=${item.name} data=${item.name} class=${obj.type[0]}>know more</button>
      `;
      container.appendChild(specificContainer);
      // console.log(typeAll);
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
  if (offset === 600) {
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
  offset = 600;
  currentPage = 31;
  getData(offset, currentPage);
  if (offset === 600) {
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
      abilities: data.abilities.map((item, index) => {
        return item.ability.name;
      }),
      baseExperience: data.base_experience,
      type: data.types.map((item, index) => {
        return item.type.name;
      }),
      height: data.height,
      bs: data.stats.map((item, index) => {
        return item.base_stat;
      }),
      stats: data.stats.map((item, index) => {
        return item.stat.name;
      }),
      weight: data.weight,
    };
    console.log(obj.type);
    displayIndividualInfo(obj);
  };
  getIndividualData();
}

// displayIndividualInfo(obj);
function displayIndividualInfo(obj) {
  // console.log(obj);
  const mainContainer = document.getElementById("allPokemons");
  const headContainer = document.getElementById("heading");
  const container = document.getElementById("subPokemon");
  const load = document.getElementById("load");
  headContainer.style.display = "none";
  mainContainer.style.display = "none";
  load.style.display = "none";
  container.style.display = "flex";
  container.classList.add(`${obj.type[0]}`);
  container.classList.add(`individualPokemon`);
  container.innerHTML = `
    <button onclick="displayInitial()" id=${obj.type[0]} class=${
    obj.type[0]
  }>X</button>
    <h2>${obj.name}</h2>
    <img src=${obj.img} alt=${obj.name} />
    <div class="info">
      <div class="left">
        <p class="baseExperience">Base Experience : ${obj.baseExperience}</p>
        <p class="height">height : ${obj.height}</p>
        <p class="weight">weight : ${obj.weight}</p>
        <div>
          ${obj.bs
            .map((item, index) => {
              return `<p>bs${index + 1} : ${item}`;
            })
            .join("")}
        </div>
      </div>
      <div class="right">
        <div>${obj.abilities
          .map((item, index) => {
            return `<p>ability${index + 1} : ${item}
              </p>`;
          })
          .join("")}
        </div>
        <div>
            ${obj.type
              .map((item, index) => {
                return `<p>type${index + 1} : ${item}`;
              })
              .join("")}
        </div>
        <div>
          ${obj.stats
            .map((item, index) => {
              return `<p>stat${index + 1} : ${item}`;
            })
            .join("")}
        </div>
      </div> 
    </div>
  `;
}

function displayInitial() {
  console.log(event.target.id);
  const mainContainer = document.getElementById("allPokemons");
  const headContainer = document.getElementById("heading");
  const container = document.getElementById("subPokemon");
  const load = document.getElementById("load");
  headContainer.style.display = "flex";
  mainContainer.style.display = "grid";
  load.style.display = "flex";
  container.style.display = "none";
  container.classList.remove(event.target.id);
  offset = parseInt(offsetElement.innerHTML);
  currentPage = parseInt(current.innerHTML);
  if (offset === 0) prev.disabled = true;
  else prev.disabled = false;
  next.disabled = false;
  getData(offset, currentPage);
  console.log(typeof currentPage);
}
