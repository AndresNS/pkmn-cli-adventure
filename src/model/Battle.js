import inquirer from "inquirer";

import menu from "../data/menu.js";

export default class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.playerActivePokemon = player.getTeam()[0];
    this.enemyActivePokemon = enemy.getTeam()[0];
  }

  start() {
    this.showActions();
  }

  attack() {}

  switchPokemon() {}

  run() {}

  showActions() {
    inquirer
      .prompt([
        {
          name: "battle",
          type: "list",
          message: "What do you want to do?",
          choices: Object.values(menu.battle),
        },
        {
          name: "attack",
          type: "list",
          message: "Moves",
          choices: this.playerActivePokemon.getMoves(),
          when: (answers) => answers.battle === menu.battle.ATTACK,
        },
        {
          name: "inventory",
          type: "list",
          message: "Inventory",
          choices: this.player.getInventory(),
          when: (answers) => answers.battle === menu.battle.INVENTORY,
        },
        {
          name: "switch",
          type: "list",
          message: "Choose Pokemon",
          choices: this.player.getTeam(),
          when: (answers) => answers.battle === menu.battle.SWITCH,
        },
        {
          name: "run",
          type: "list",
          message: "Are you sure?",
          choices: Object.values(menu.confirm),
        },
      ])
      .then((answers) => {
        if (answers.menu === menu.battle.ATTACK) {
          this.attack(answers.attack);
        }

        if (answers.menu === menu.battle.INVENTORY) {
          this.player.useItem(answers.inventory);
        }

        if (answers.menu === menu.battle.SWITCH) {
          this.switchPokemon(answers.switch);
        }

        if (answers.menu === menu.battle.RUN) {
          this.run();
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
