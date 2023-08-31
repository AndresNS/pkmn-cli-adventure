export default class Trainer {
  constructor(name, team, inventory) {
    this.name = name;
    this.team = team;
    this.inventory = inventory;
  }

  getInventory() {
    return this.inventory;
  }

  getTeam() {
    return this.team;
  }

  useItem() {}
}
