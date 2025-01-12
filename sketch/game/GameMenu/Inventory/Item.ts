class Item {
  private id: itemList;
  private InventoryPosX: number;
  private InventoryPosY: number;
  width: number = 64;
  img: p5.Image;
  private stackSize: number;
  private abilities: Abilities[];

  constructor(obj: itemInput) {
    this.InventoryPosX = obj.InventoryPosX;
    this.InventoryPosY = obj.InventoryPosY;
    this.id = obj.id;
    this.img = obj.img;
    this.stackSize = obj.stackSize;
    this.abilities = obj.abilities;
  }

  showItem() {
    let itemBoxOffset = (Inventory.SlotSize - this.width) / 2;
    let offsetX = width / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
    let offsetY = height / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;
    image(this.img, this.InventoryPosX * Inventory.SlotSize + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SlotSize + offsetY + itemBoxOffset, this.width, this.width);
  }

  getStackSize(): number {
    return this.stackSize;
  }

  getItem(): Item {
    return this;
  }

  getInventoryPos(): Coords {
    return { x: this.InventoryPosX, y: this.InventoryPosY };
  }

  getId(): number {
    return this.id;
  }

  itemSelected(): void {
    this.abilities.forEach((element) => {
      element.abilitySelected();
    });
  }

  clicked(playerX: number, playerY: number) {
    this.abilities.forEach((element) => {
      element.abilityClicked(playerX, playerY);
    });
  }

  tick(playerX: number, playerY: number) {
    this.abilities.forEach((element) => {
      element.abilityTick(playerX, playerY);
    });
  }
}

interface itemInput {
  InventoryPosX: number;
  InventoryPosY: number;
  id: itemList;
  stackSize: number;
  img: p5.Image;
  abilities: Abilities[];
}
