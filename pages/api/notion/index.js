import fetch from "node-fetch";
import axios from "axios";
import {Client} from "@notionhq/client";

const pageId = process.env.DATABASE_ID;
const notion = new Client({auth: process.env.NOTION_SECRET});

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/2");
    const {data} = await response.json();
    const pokeData = [
      {
        name: data.species.name,
        number: data.id,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].attack,
        defense: data.stats[2].defense,
        speed: data.stats[5].speed,
      },
    ];

    for (const pokemon in pokeData) {
      const response = await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: pageId,
        },
        properties: {
          Name: {
            title: [
              {
                type: "text",
                text: {
                  content: pokemon.name,
                },
              },
            ],
          },
          No: {
            number: pokemon.number,
          },
          HP: {
            number: pokemon.hp,
          },
          Attack: {
            number: pokemon.attack,
          },
          Defense: {
            number: pokemon.defense,
          },
          Speed: {
            number: pokemon.speed,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
