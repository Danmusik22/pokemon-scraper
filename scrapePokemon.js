
const fs = require('fs');
const https = require('https');



async function scrapePokemonDescription(number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${number}`)

    const json = await response.json();
    const allEntries = json.flavor_text_entries
    const flavor_text_entry = allEntries.find(entry => entry.language.name === 'en' && entry.version.name === 'omega-ruby')
    const name = json.names.find(n => n.language.name === 'en').name

    return `${name}:\n${flavor_text_entry.flavor_text}`;
}

async function scrapePokemonDescriptions(from, to) {
    const pokemonAmount = to - from;

    for (let i = 0; i < pokemonAmount; i++) {

        
    }
}

async function writeAFile(filePath) {

    const file = require(filePath);

    console.log(file);
}

async function test() {

    const pikachuDescription = await scrapePokemonDescription(701);

    console.log(pikachuDescription)
}

test();

// scrapeDescription(1, 10);