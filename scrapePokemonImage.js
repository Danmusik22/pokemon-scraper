const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

/*
give two numbers which is the pokemon id's
All pokemon between those values will be returned as objects in an array
*/

async function scrapePokemonImage(number) {
    
}

 async function scrapePokemons(from, to) {
    const baseUrl = 'https://www.pokemon.com/us/pokedex/'
    const pokemonAmount = to - from;
    
    for (let i = 0; i < pokemonAmount; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const pokemonID = i+from;
        const pokemonUrl = baseUrl + pokemonID;

        console.log(pokemonUrl)
        await page.goto(pokemonUrl);

        const imageUrl = await page.$eval('.profile-images img', img => img.src);
        
        const pokemonName = await page.evaluate(
            () => document.querySelector('.pokedex-pokemon-pagination-title').innerText);
        const formattetName = getPokeName(pokemonName);

        https.get(imageUrl, res => {
            const fileStream = fs.createWriteStream(
                `/Users/dandan/Documents/VScode projects/react/02mytraveljournal/src/images/${formattetName}.png`);
            res.pipe(fileStream);

            fileStream.on('error', err => {
                console.log('Error:')
                console.log(err);
            });

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(pokemonName + " finished downloading");
            })
        })
        await browser.close();
    }   
}

function nameFormat(string) {
    const splits = string.split('#');
    return `#${splits[1]} ${splits[0]}`.trim();
}

function getPokeName(string) {
    return string.split(' ')[0]
}

scrapePokemons(387, 396);

//avg time pr element: 2,2 seconds