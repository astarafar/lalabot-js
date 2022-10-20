const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const msg = require("./msg.cjs");

const itemData = require("../data/items.json");

const MARKET_API = "https://universalis.app/api/v2";
const DATA_API = "https://xivapi.com";

async function fetchJson(uri) {
  const thisPromise = new Promise(async (resolve, reject) => {
    await fetch(uri)
      .then(
        async (response) =>
          await response
            .json()
            .then((payload) => resolve(payload))
            .catch((err) => reject(err))
      )
      .catch((err) => reject(err));
  });

  return thisPromise;
}

async function fetchItemData(itemId) {
  const thisPromise = new Promise(async (resolve, reject) => {
    await fetchJson(`${DATA_API}/item/${itemId}`)
      .then((result) => {
        resolve({
          name: result.Name,
          description:
            result.Description.length > 0
              ? result.Description
              : "(This item has no description in the game's data.)",
          icon: `${DATA_API}${result.IconHD}`,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

  return thisPromise;
}

module.exports = {
  async getItemData(itemId) {
    const thisPromise = new Promise(async (resolve, reject) => {
      if (Object.keys(itemData).includes(itemId)) {
        await fetchItemData(itemId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error("That item doesn't exist in the game's data."));
      }
    });

    return thisPromise;
  },
};
