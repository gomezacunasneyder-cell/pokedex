const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {
        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonabilities = document.getElementById("pokemon-abilities");
        const pokemonclass = document.getElementById("pokemonclass");

        pokemonName.textContent = "";
        pokemonImage.removeAttribute("src");
        pokemonStats.innerHTML = "<h2>Estadisticas</h2>";
        pokemonabilities.innerHTML = "<h2>Habilidades</h2>";
        pokemonclass.textContent = "";

        const response = await fetch(pokemonUrl).then(response => response.json());

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        })

        response.abilities.forEach(ability => {
            const li = document.createElement("li");
            li.textContent = ability.ability.name;
            pokemonabilities.appendChild(li);
        })

        pokemonImage.addEventListener("mouseenter", () => {
            let html = '<p class="titulo-tipo">tipo de pokemon:</p>';
            for (let i = 0; i < response.types.length; i++) {
            html += `<p>${response.types[i].type.name}</p>`;
    }
    pokemonclass.innerHTML = html;
});

        pokemonImage.addEventListener("mouseleave", () => {
            pokemonclass.innerHTML = "";
        });

        console.log(response);
       
    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });
