// Libraries
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import chalk from 'chalk';

const outputFile = 'data.json';
const parsedResults = [];
const pageLimit = 26;
let pageCounter = 0;
const resultCount = 0;


export const extractMetadata = (title) => {
  const dividers = [
    '- ',
    ', ',
  ];

  if (title) {
    const titleDividerOption0 = title.split(dividers[0]);
    const titleDividerOption1 = title.split(dividers[1]);

    let part1 = null;
    let part2 = null;
    let part3 = null;

    if (titleDividerOption0.length > 1) {
      part1 = titleDividerOption0[0].trim();
      part2 = titleDividerOption0[1].trim();
    } else if (titleDividerOption1.length > 1) {
      part1 = titleDividerOption1[0].trim();
      part2 = titleDividerOption1[1];
    }

    const yearSearch = part2 ? /\d{4}?/g.exec(part2) : '';
    part3 = yearSearch ? yearSearch[0] : null;

    if (part3) {
      const removeYear = part2.replace(part3, '');
      const removeParenthesis = removeYear ? removeYear.replace(' ()', '') : removeYear;
      part2 = removeParenthesis;
    }

    return {
      artist: part1,
      album: part2,
      year: part3,
    };
  }

  return null;
};

export const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      chalk.yellow.bgBlue(
        `\n ${chalk.underline.bold(
          parsedResults.length,
        )} Results exported successfully to ${chalk.underline.bold(
          outputFile,
        )}\n`,
      ),
    );
  });
};

export const getWebsiteContent = async (counter) => {
  const sourceUrl = 'https://www.listchallenges.com/1001-albums-you-must-hear-before-you-die-all-2018/checklist';
  const url = `${sourceUrl}/${counter}`;
  console.log(
    chalk.yellow.bgBlue(
      `\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`,
    ),
  );

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('.col-list-items .list-item').map((i, el) => {
      const count = resultCount + 1;
      const title = $(el)
        .find('.item-name')
        .text()
        .trim();

      const metadata = extractMetadata(title);
      const hasResults = !!metadata;


      const artist = metadata && hasResults ? metadata.artist : null;
      const album = metadata && hasResults ? metadata.album : null;
      const year = metadata && hasResults ? metadata.year : null;

      const src = $(el)
        .find('.item-image-wrapper img')
        .attr('src');
      const data = {
        id: count,
        title,
        artist,
        album,
        year,
        cover: `https://www.listchallenges.com${src}`,
      };
      parsedResults.push(data);
    });

    // Pagination Elements Link
    pageCounter += 1;

    const nextPageLink = pageCounter + 1;

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


export default getWebsiteContent;
