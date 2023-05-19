
const fs = require('fs');
const https = require('https');

/*
give two numbers which is the pokemon id's
All pokemon between those values will be returned as objects in an array
*/

async function scrapePokemonImage(number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const json = await response.json();
    const officialArtworkUrl = json.sprites.other['official-artwork'].front_default

    const responseImage = await fetch(officialArtworkUrl);
    const bufferArray = await responseImage.arrayBuffer();
    const buffer = Buffer.from(bufferArray);

    await fs.promises.writeFile(`./imgs/${number}-${json.name}.png`, buffer)

    return json;
}

async function scrapePokemonImages(from, to) {
    const pokemonAmount = to - from;
    
    for (let i = 0; i < pokemonAmount; i++) {
        await scrapePokemonImage(i+1)
    }   
}

function nameFormat(string) {
    const splits = string.split('#');
    return `#${splits[1]} ${splits[0]}`.trim();
}

function getPokeName(string) {
    return string.split(' ')[0]
}

async function test() {

    const res = await fetch('https://pokeapi.co/api/v2/pokemon-species/25')

    const json = await res.json();

    console.log(json);

}

test();
//avg time pr element: 2,2 seconds