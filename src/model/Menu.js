import inquirer from "inquirer";
import menu from "../data/menu.js";

export default class Menu {
  constructor() {}

  show() {
    inquirer
      .prompt([
        {
          name: "menu",
          type: "list",
          message: "Menu",
          choices: Object.values(menu.choices),
        },
        {
          name: "duration",
          type: "list",
          message: "Select adventure duration",
          choices: Object.values(menu.durations),
          when: (answers) => answers.menu === menu.choices.NEW_GAME,
        },
        {
          name: "name",
          message: "Enter your name",
          when: (answers) => answers.menu === menu.choices.NEW_GAME,
        },
      ])
      .then((answers) => {
        // console.log("user selected", answers);

        if (answers.menu === menu.choices.CONTINUE) {
          console.log("Show saved games");
        }

        if (answers.menu === menu.choices.NEW_GAME) {
          console.log("Start Game");
        }

        if (answers.menu === menu.choices.SETTINGS) {
          console.log("Show settings");
        }

        if (answers.menu === menu.choices.QUIT) {
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
