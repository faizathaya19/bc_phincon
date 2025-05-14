async function getPokemon(name: string): Promise<void> {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const pokemon = await response.json();

    const imageDiv = document.getElementById("pokemonImage");
    if (imageDiv) {
      imageDiv.innerHTML = `<img src="${pokemon.sprites.front_default}" class="w-32 h-32 mx-auto">`;
    }

    const textDiv = document.getElementById("pokemonText");
    if (textDiv) {
      textDiv.innerHTML = `
        <h2 class="text-2xl font-semibold text-gray-800">${pokemon.name.toUpperCase()}</h2>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Types:</strong> ${pokemon.types.map((t: any) => t.type.name).join(", ")}</p>
      `;
    }
  } catch (error) {
    const result = document.getElementById("result");
    if (result) {
      result.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
    }
  }
}

function handleSearch(): void {
  const input = document.getElementById("pokemonName") as HTMLInputElement;
  const name = input.value;
  if (name) {
    getPokemon(name);
  }
}
