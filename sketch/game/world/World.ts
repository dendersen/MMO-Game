class World {
  public world: number[][];
  public tiles: Tile[][];
  constructor() {
    this.world = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 1, 0, 0, 0, 0, 0, 0, 1, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    ];

    this.tiles = new Array(this.world.length);
    for (let i: number = 0; i < this.tiles.length; i++) {
      this.tiles[i] = new Array(this.world[i].length);
    }
    this.load();
  }

  private load() {
    for (let i: number = 0; i < this.world.length; i++) {
      this.tiles[i] = [];
      for (let j: number = 0; j < this.world[i].length; j++) {
        this.tiles[i][j] = this.createTile(this.world[i][j], i, j);
      }
    }
  }

  public show() {
    for (let i: number = 0; i < this.world.length; i++) {
      for (let j: number = 0; j < this.world[i].length; j++)
        this.tiles[i][j].show();
    }
  }

  public setWorld(world: number[][]) {
    this.world = world;
    this.load();
  }

  public changeTile(
    x: number,
    y: number,
    tile: tileID,
    tempTile?: tileID,
    regenerationSpeed?: number
  ) {
    this.world[x][y] = tile;
    this.tiles[x][y] = this.createTile(tile, x, y, tempTile, regenerationSpeed);
  }

  private createTile(
    tileId: tileID,
    x: number,
    y: number,
    tempTile?: tileID,
    regenerationSpeed?: number
  ): Tile {
    let tile;
    switch (tileId) {
      case tileID.Air:
        tile = new AirTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
        break;
      case tileID.Grass:
        tile = new GrassTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
        break;
      case tileID.Stone:
        tile = new StoneTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
        break;
      case tileID.Bedrock:
        tile = new BedrockTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
        break;
      case tileID.TempTile:
        tile = new TempTile(
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          tempTile,
          regenerationSpeed
        );
        break;
      default:
        throw new Error(`No Tile with the id: ${tileId}`);
    }
    return tile;
  }
}