export default function createGameBoardController() {
  function createGameBoard(x, y) {
    if (x === undefined || y === undefined)
      throw new Error("createGameBoard expects two arguments");
    if (x < 1 || y < 1) throw new Error("parameters are below range");
    const board = Array(x)
      .fill(null)
      .map(() => Array(y).fill(null));

    const gameBoard = {
      board,
      ships: [],
    };

    return gameBoard;
  }
  function placeShip(coordinates, ship, gameBoard) {
    if (
      coordinates === undefined ||
      ship == undefined ||
      gameBoard === undefined
    )
      throw new Error("placeShip expects three arguments");
    let outer = coordinates.outer;
    let inner = coordinates.inner;
    if (
      outer < 0 ||
      inner < 0 ||
      outer >= gameBoard.board.length ||
      inner >= gameBoard.board[0].length
    )
      throw new Error("coordinates out of range");
    const gameBoardCopy = JSON.parse(JSON.stringify(gameBoard));
    const shipCopy = { ...ship };
    if (coordinates.vertical) {
      for (let i = 0; i < shipCopy.length; i++) {
        if (gameBoardCopy.board[outer + i] === undefined)
          throw new Error("ship is too big to fit");
        if (gameBoardCopy.board[outer + i][inner] !== null)
          throw new Error("the place of the coordinates already has a ship");
        gameBoardCopy.board[outer + i][inner] = shipCopy;
      }
    } else {
      for (let i = 0; i < shipCopy.length; i++) {
        if (gameBoardCopy.board[outer][inner + i] === undefined)
          throw new Error("ship is too big to fit");
        if (gameBoardCopy.board[outer][inner + i] !== null)
          throw new Error("the place of the coordinates already has a ship");
        gameBoardCopy.board[outer][inner + i] = shipCopy;
      }
    }

    shipCopy.id = gameBoardCopy.ships.length;
    gameBoardCopy.ships.push(shipCopy);
    return gameBoardCopy;
  }
  function receiveAttack(coordinates, gameBoard, shipController) {
    if (
      coordinates === undefined ||
      gameBoard === undefined ||
      shipController == undefined
    )
      throw new Error("receive attack expects three arguments");
    if (
      coordinates.x < 0 ||
      coordinates.y < 0 ||
      coordinates.x >= gameBoard.board.length ||
      coordinates.y >= gameBoard.board[0].length
    )
      throw new Error("coordinates our of range");

    const gameBoardCopy = JSON.parse(JSON.stringify(gameBoard));
    if (gameBoardCopy.board[coordinates.x][coordinates.y] === null) {
      gameBoardCopy.board[0][0] = 0;
      return gameBoardCopy;
    } else if (
      gameBoardCopy.board[coordinates.x][coordinates.y] !== null &&
      gameBoardCopy.board[coordinates.x][coordinates.y] !== 0 &&
      gameBoardCopy.board[coordinates.x][coordinates.y] !== 1
    ) {
      const hitShip = shipController.hit(
        gameBoardCopy.board[coordinates.x][coordinates.y],
      );

      gameBoardCopy.ships[hitShip.id] = hitShip;
      gameBoardCopy.board[coordinates.x][coordinates.y] = 1;
      return gameBoardCopy;
    }
    throw new Error("board has already received an attack at the coordinates");
  }
  function haveAllShipSunk(ships, shipController) {
    if (ships === undefined || shipController === undefined)
      throw new Error("haveAllShipSunk expects two argument");
    const allSunk = ships.reduce((previousShip, currentShip) => {
      return previousShip && shipController.isSunk(currentShip);
    }, true);
    return allSunk;
  }

  return {
    createGameBoard,
    placeShip,
    receiveAttack,
    haveAllShipSunk,
  };
}
