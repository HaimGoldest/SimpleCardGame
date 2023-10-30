import CardDraggable from "../js/CardDraggable.js";

export default class CardPlayer extends CardDraggable {
  constructor(data) {
    let { health, maxHealth, armor, maxArmor } = data;
    super(data);
    this.textHealth = new Phaser.GameObjects.BitmapText(
      this.scene,
      0,
      -102,
      "pressstart",
      health
    );
    this.textMaxHealth = new Phaser.GameObjects.BitmapText(
      this.scene,
      -30,
      -70,
      "pressstart",
      maxHealth,
      12
    );
    this.textArmor = new Phaser.GameObjects.BitmapText(
      this.scene,
      0,
      -102,
      "pressstart"
    );
    this.textMaxArmor = new Phaser.GameObjects.BitmapText(
      this.scene,
      65,
      -70,
      "pressstart",
      maxArmor,
      12
    );
    this.spriteArmor = new Phaser.GameObjects.Sprite(
      this.scene,
      50,
      -80,
      "armor"
    );
    this.textHealth.tint = 0;
    this.textMaxHealth.tint = 0;
    this.textArmor.tint = 0;
    this.textMaxArmor.tint = 0;
    this.add([
      this.textHealth,
      this.textMaxHealth,
      this.spriteArmor,
      this.textArmor,
      this.textMaxArmor,
    ]);
    this.health = health;
    this.maxHealth = maxHealth;
    this.armor = armor;
    this.maxArmor = maxArmor;
  }

  set health(newHealth) {
    this._health = newHealth;
    this.textHealth.text = this._health;
    this.textHealth.x = -44 - this.textHealth.width / 2;
  }

  set armor(newArmor) {
    this._armor = newArmor;
    this.textArmor.text = this._armor;
    this.textArmor.x = 47 - this.textArmor.width / 2;
    this.textArmor.alpha = this._armor == 0 ? 0 : 1;
    this.textMaxArmor.alpha = this._armor == 0 ? 0 : 1;
    this.spriteArmor.alpha = this._armor == 0 ? 0 : 1;
  }

  get health() {
    return this._health;
  }

  get armor() {
    return this._armor;
  }

  set maxHealth(newMaxHealth) {
    this._maxHealth = newMaxHealth;
    this.textMaxHealth.text = this._maxHealth; 
  }

  set maxArmor(newMaxArmor) {
    this._maxArmor = newMaxArmor;
    this.textMaxArmor.text = this._maxArmor; 
  }

  get maxHealth() {
    return this._maxHealth;
  }

  get maxArmor() {
    return this._maxArmor;
  }

  attack(attackValue) {
    if (attackValue <= this.armor) {
      this.armor = this.armor - attackValue;
    } else {
      this.health = this.health - (attackValue - this.armor);
      this.armor = 0;
    }
    if (this.health <= 0) this.dead = true;
  }

  set dead(dead) {
    this.health = "0";
    this.cardname = "DEAD";
    this.draggable = false;
    this.deadAnimation();
  }
  get dead() {
    return this._cardname == "DEAD";
  }
}
