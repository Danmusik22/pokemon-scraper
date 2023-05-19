const https = require('https');
const fs = require('fs');
const puppeteer = require('puppeteer');
const url = 'https://www.pokemon.com/us/pokedex/blastoise';

async function scrapeImage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const imageUrl = await page.$eval('.profile-images img', img => img.src);

    https.get(imageUrl, function(res) {
        const fileStream = fs.createWriteStream('./images/blastoise.jpeg')
        res.pipe(fileStream);

        fileStream.on("error", function(err) {
            console.log("Error: ")
            console.log(err);
        });

        fileStream.on("finish", function() {
            fileStream.close();
            console.log("Done!");
        });
    });

    browser.close();
}

scrapeImage();