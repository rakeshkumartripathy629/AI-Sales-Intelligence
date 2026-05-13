import { chromium } from "playwright";

import {logger} from "../utils/logger.js";

const MAX_PAGES = 5;

const IMPORTANT_KEYWORDS = [
  "about",
  "services",
  "solutions",
  "products",
  "company",
  "contact"
];

const extractPageContent = async (
  page,
  url
) => {

  try {

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    const content = await page.evaluate(() => {

      document
        .querySelectorAll(
          "script, style, noscript"
        )
        .forEach((el) => el.remove());

      return document.body.innerText;
    });

    return content
      .replace(/\s+/g, " ")
      .trim();

  } catch (error) {

    logger.error(
      `Failed extracting ${url}`
    );

    return "";
  }
};

const getImportantLinks = async (
  page,
  baseUrl
) => {

  try {

    const links = await page.$$eval(
      "a",
      (anchors) =>
        anchors.map((a) => a.href)
    );

    const filteredLinks = links.filter(
      (link) => {

        if (!link) return false;

        if (
          !link.startsWith(baseUrl)
        ) {
          return false;
        }

        return IMPORTANT_KEYWORDS.some(
          (keyword) =>
            link
              .toLowerCase()
              .includes(keyword)
        );

      }
    );

    return [
      ...new Set(filteredLinks)
    ].slice(0, MAX_PAGES);

  } catch {

    return [];

  }
};

export const scrapeWebsite =
async (websiteUrl) => {

  let browser;

  try {

    browser =
      await chromium.launch({

        headless: true
      });

    const context =
      await browser.newContext({

        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
      });

    const page =
      await context.newPage();

    logger.info(
      `Starting scrape for ${websiteUrl}`
    );

    const homepageContent =
      await extractPageContent(
        page,
        websiteUrl
      );

    const importantLinks =
      await getImportantLinks(
        page,
        websiteUrl
      );

    let combinedContent =
      homepageContent;

    for (const link of importantLinks) {

      const newPage =
        await context.newPage();

      const pageContent =
        await extractPageContent(
          newPage,
          link
        );

      combinedContent +=
        "\n" + pageContent;

      await newPage.close();

    }

    return {

      success: true,

      content:
        combinedContent.slice(
          0,
          15000
        ),

      pagesScraped:
        importantLinks.length + 1
    };

  } catch (error) {

    logger.error(error);

    return {

      success: false,

      error: error.message
    };

  } finally {

    if (browser) {
      await browser.close();
    }

  }
};


