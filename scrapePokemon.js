const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

const baseUrl = 'https://www.pokemon.com/us/pokedex/'

async function scrapeDescription(from, to) {
    const pokemonAmount = to - from;

    for (let i = 0; i < pokemonAmount; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const pokemonID = i+from;
        const pokemonUrl = baseUrl + pokemonID;

        console.log(pokemonUrl)
        await page.goto(pokemonUrl);

        await page.waitForSelector('body > div.container.pokedex > section.section.pokedex-pokemon-details > div.column-6.push-7 > div > div.version-descriptions.active > p.version-x.active')

        const descriptionX = await page.evaluate(
            () => document.querySelector('body > div.container.pokedex > section.section.pokedex-pokemon-details > div.column-6.push-7 > div > div.version-descriptions.active > p.version-x.active').innerText.trim()
        );
        
        await page.waitForSelector('body > div.container.pokedex > section.section.pokedex-pokemon-details > div.column-6.push-7 > div > div.version-descriptions.active > p.version-y')
        const descriptionY = await page.evaluate(
            () => document.querySelector('body > div.container.pokedex > section.section.pokedex-pokemon-details > div.column-6.push-7 > div > div.version-descriptions.active > p.version-y').innerText.trim()
        );

        console.log(descriptionY)
        console.log(descriptionX)
       
        await browser.close();
    }
}

async function writeAFile(filePath) {

    const file = require(filePath);

    console.log(file);
}

writeAFile('./pokemon.json');

// scrapeDescription(1, 10);