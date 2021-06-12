/**
 * Used to generate a list of desired routes for deep linking in the react app.
 */

const axios = require("axios");
const fs = require("fs");

const apiBase = "https://api.hallb.me";

const constantRoutes = [
  `journal/index.html`,
  "journal/edit/index.html",
  "learn/index.html",
];

const generateRoutes = () => {
  return (
    axios
      .get(apiBase + "/tarot-cards")
      // Sort cards by their value attribute
      .then((res) =>
        res.data
          .map((card) => [
            `learn/${encodeURIComponent(card.suit.toLowerCase())}/index.html`,
            `learn/${encodeURIComponent(
              card.suit.toLowerCase()
            )}/${encodeURIComponent(card.name.toLowerCase())}/index.html`,
          ])
          .flat()
          .filter((v, i, a) => a.indexOf(v) === i)
      )
      .then((res) =>
        fs.writeFileSync(
          "config/static-routes.json",
          JSON.stringify([...constantRoutes, ...res], null, 4)
        )
      )
  );
};

generateRoutes();
