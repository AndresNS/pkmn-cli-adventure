import inquirer from "inquirer";

import showBanner from "../utils/banner.js";
import { aiPrompt } from "../utils/openai.js";

import menu from "../data/menu.js";
import prompts from "../data/prompts.js";

export default class Game {
  player = { name: "" };
  duration = "";
  saveFilePath = "";

  async start() {
    await showBanner("Pokémon CLI\nAdventure", 1000);

    this.showMenu();

    // process.stdin.setEncoding("utf8");

    // process.stdin.on("data", (data) => {
    //   console.log(`You entered: ${data}`);
    // });
  }

  saveAdventure() {
    // Create save file
  }

  loadAdventure() {
    console.log("Loading saved adventure");
    aiPrompt(prompts.plot.SUMMARIZE, "system");

    // loop prompt for actions
    this.loopActions();
  }

  createNewAdventure() {
    console.log("Creating adventure");
    // pass promt to GPT to create world
    aiPrompt(prompts.plot.CREATE, "system");

    // create save file
    saveAdventure();

    // GPT explains context
    aiPrompt(prompts.plot.REQUEST_ACTION, "system");

    // choose pokemon
    aiPrompt(prompts.actions.CHOOSE_POKEMON, "system");

    // loop prompt for actions
    this.loopActions();
  }

  loopActions() {}

  showMenu() {
    inquirer
      .prompt([
        {
          name: "menu",
          type: "list",
          message: "Menu",
          choices: Object.values(menu.main),
        },
        {
          name: "duration",
          type: "list",
          message: "Select adventure duration",
          choices: Object.values(menu.durations),
          when: (answers) => answers.menu === menu.main.NEW_GAME,
        },
        {
          name: "name",
          message: "Enter your name",
          when: (answers) => answers.menu === menu.main.NEW_GAME,
        },
      ])
      .then((answers) => {
        // console.log("user selected", answers);

        if (answers.menu === menu.main.CONTINUE) {
          console.log("Show saved games");
        }

        if (answers.menu === menu.main.NEW_GAME) {
          this.duration = answers.duration;
          this.player = { name: answers.name };

          this.createNewAdventure();
        }

        if (answers.menu === menu.main.SETTINGS) {
          console.log("Show settings");
        }

        if (answers.menu === menu.main.QUIT) {
          console.log("Quit game");
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.error(error);
        } else {
          // Something else went wrong
          console.error(error);
        }
      });
  }
}
