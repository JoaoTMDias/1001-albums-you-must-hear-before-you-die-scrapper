const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const chalk = require("chalk");

const outputFile = "data.json";
const parsedResults = [];
const pageLimit = 26;
let pageCounter = 0;
let resultCount = 0;
const url =
  `https://www.listchallenges.com/1001-albums-you-must-hear-before-you-die-2016/checklist/${pageCounter + 1}`;


console.log(
  chalk.yellow.bgBlue(
    `\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`
  )
);

const getWebsiteContent = async url => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $(".col-list-items .list-item").map((i, el) => {
      const count = resultCount++;
      const title = $(el)
        .find(".item-name")
        .text()
        .trim();
      const src = $(el)
        .find(".item-image-wrapper img")
        .attr("src");
      const metadata = {
        id: count,
        title: title,
        artist: null,
        album: null,
        year: null,
        genre: null,
        recordLabel: null,
        cover: src,
      };
      parsedResults.push(metadata);
    });

    // Pagination Elements Link
    pageCounter++;

    const nextPageLink =
      `https://www.listchallenges.com/1001-albums-you-must-hear-before-you-die-2016/checklist/${pageCounter + 1}`;

    console.log(chalk.cyan(`  Scraping: ${nextPageLink}`));

    if (pageCounter === pageLimit) {
      exportResults(parsedResults);
      return false;
    }

    getWebsiteContent(nextPageLink);
  } catch (error) {
    exportResults(parsedResults);
    console.error(error);
  }
};

const exportResults = parsedResults => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), err => {
    if (err) {
      console.log(err);
    }
    console.log(
      chalk.yellow.bgBlue(
        `\n ${chalk.underline.bold(
          parsedResults.length
        )} Results exported successfully to ${chalk.underline.bold(
          outputFile
        )}\n`
      )
    );
  });
};

getWebsiteContent(url);

module.exports = {
  getWebsiteContent,
};
