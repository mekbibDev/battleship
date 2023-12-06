import createGameBoardController from "../src/GameBoardController";
import createShipController from "../src/ship";
describe("Create Game Board", () => {
  it("throws an error when no parameters are given", () => {
    expect(() => createGameBoardController().createGameBoard()).toThrow(
      "createGameBoard expects two arguments",
    );
  });
  it("throws an error when only one argument is given", () => {
    expect(() => createGameBoardController().createGameBoard(10)).toThrow(
      "createGameBoard expects two arguments",
    );
  });
  it("returns a board with the width and height of the given parameters", () => {
    const height = 20;
    const width = 20;
    const board = Array(height).fill(Array(width).fill(null));
    const testGameBoard = {
      board,
      ships: [],
    };
    expect(createGameBoardController().createGameBoard(width, height)).toEqual(
      testGameBoard,
    );
  });
});
describe("Place ship", () => {
  it("throws an error when board, coordinates and ship are not given", () => {
    expect(() => createGameBoardController().placeShip()).toThrow(
      "placeShip expects three arguments",
    );
  });
  it("throws an error when one of the arguments is not given", () => {
    expect(() => createGameBoardController().placeShip({}, {})).toThrow(
      "placeShip expects three arguments",
    );
  });
  it("returns a board with a ship placed at the given coordinates", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 5 };
    testBoard[0][0] = testShip;
    testBoard[0][1] = testShip;
    testBoard[0][2] = testShip;
    testBoard[0][3] = testShip;
    testBoard[0][4] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 0, end: 5 };
    const boardWithOutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const boardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      boardWithOutShip,
    );
    expect(boardWithShip).toEqual(testGameBoard);
  });
  it("doesn't mutate the given board", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testGameBoard = {
      board: testBoard,
      ships: [],
    };
    const testShip = {};
    const coordinates = { beginning: 0, end: 0 };
    const boardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      testGameBoard,
    );
    expect(boardWithShip).not.toEqual(testGameBoard);
  });
  it("returns a board with a ship placed with the axis taken into consideration", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 5 };
    testBoard[4][4] = testShip;
    testBoard[5][4] = testShip;
    testBoard[6][4] = testShip;
    testBoard[7][4] = testShip;
    testBoard[8][4] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 4, end: 9, vertical: true };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(gameBoardWithShip).toEqual(testGameBoard);
  });
  it("returns a board with a ship placed when the beginning is greater than end", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 5 };
    testBoard[4][4] = testShip;
    testBoard[5][4] = testShip;
    testBoard[6][4] = testShip;
    testBoard[7][4] = testShip;
    testBoard[8][4] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 9, end: 4, vertical: true };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(gameBoardWithShip).toEqual(testGameBoard);
  });
  it("returns a board with a ship placed when the beginning and the end have a difference of one", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 1 };
    testBoard[0][1] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 0, end: 1, vertical: false };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(gameBoardWithShip).toEqual(testGameBoard);
  });
  it("returns a board with a ship placed when the beginning and the end have a difference of zero", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 1 };
    testBoard[0][0] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 0, end: 0, vertical: false };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(gameBoardWithShip).toEqual(testGameBoard);
  });
  it("returns a board with a ship placed as long as it's length is equal or smaller than the difference between the coordinates when vertical is true", () => {
    const testBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    const testShip = { length: 1 };
    testBoard[4][4] = testShip;
    const testGameBoard = {
      board: testBoard,
      ships: [testShip],
    };
    const coordinates = { beginning: 4, end: 6, vertical: true };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      coordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(gameBoardWithShip).toEqual(testGameBoard);
  });
  it("throws an error if the coordinates are below the range", () => {
    const testShip = {};
    const coordinates = { beginning: -2, end: -3, vertical: true };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    expect(() =>
      createGameBoardController().placeShip(
        coordinates,
        testShip,
        gameBoardWithoutShip,
      ),
    ).toThrow("coordinates out of range");
  });
  it("throws an error if the coordinates are above the range of the outer dimension when vertical is false", () => {
    const testShip = {};
    const coordinates = { beginning: 9, end: 11, vertical: false };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    expect(() =>
      createGameBoardController().placeShip(
        coordinates,
        testShip,
        gameBoardWithoutShip,
      ),
    ).toThrow("coordinates out of range");
  });
  it("throws an error if the coordinates are above the range of the inner dimension when vertical is true", () => {
    const ship = {};
    const coordinates = { beginning: 8, end: 11, vertical: true };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    expect(() =>
      createGameBoardController().placeShip(
        coordinates,
        ship,
        gameBoardWithoutShip,
      ),
    ).toThrow("coordinates out of range");
  });
});

describe("Receive Attack", () => {
  it("throws an error if coordinates and board are not given", () => {
    expect(() => createGameBoardController().receiveAttack()).toThrow(
      "receive attack expects three arguments",
    );
  });
  it("throws an error if one of the arguments is missing", () => {
    expect(() => createGameBoardController().receiveAttack({}, {})).toThrow(
      "receive attack expects three arguments",
    );
  });
  it("throws an error if x and y coordinates are below the range", () => {
    const gameBoard = createGameBoardController().createGameBoard(10, 8);
    const coordinates = { x: -1, y: -1 };
    expect(() =>
      createGameBoardController().receiveAttack(coordinates, gameBoard, {}),
    ).toThrow("coordinates our of range");
  });
  it("throws an error if x and y coordinates are above the range", () => {
    const gameBoard = createGameBoardController().createGameBoard(10, 8);
    const coordinates = { x: 10, y: 8 };
    expect(() =>
      createGameBoardController().receiveAttack(coordinates, gameBoard, {}),
    ).toThrow("coordinates our of range");
  });
  it("returns a board with recorded miss when given a coordinate where ship is not located", () => {
    const testGameBoard = createGameBoardController().createGameBoard(10, 10);
    testGameBoard.board[0][0] = 0;
    const gameBoardWithoutMiss = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const coordinates = { x: 0, y: 0 };
    const gameBoardWithMiss = createGameBoardController().receiveAttack(
      coordinates,
      gameBoardWithoutMiss,
      {},
    );
    expect(gameBoardWithMiss).toEqual(testGameBoard);
  });
  it("doesn't mutate the given board", () => {
    const gameBoardWithoutMiss = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const coordinates = { x: 0, y: 0 };
    const gameBoardWithMiss = createGameBoardController().receiveAttack(
      coordinates,
      gameBoardWithoutMiss,
      {},
    );
    expect(gameBoardWithMiss).not.toEqual(gameBoardWithoutMiss);
  });
  it("returns a board with hit recorded", () => {
    const testGameBoard = createGameBoardController().createGameBoard(10, 10);
    testGameBoard.board[0][0] = 1;
    const testShip = createShipController().createShip(1);
    testGameBoard.ships.push(testShip);
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const hitCoordinates = { x: 0, y: 0 };
    const placeCoordinates = { beginning: 0, end: 0, vertical: false };
    const gameBoardWithShip = createGameBoardController().placeShip(
      placeCoordinates,
      testShip,
      gameBoardWithoutShip,
    );
    expect(
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithShip,
        createShipController(),
      ).board,
    ).toEqual(testGameBoard.board);
  });
  it("throws an error if the place of the coordinates has already been recorded as a miss", () => {
    const gameBoardWithoutRecord = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const hitCoordinates = { x: 0, y: 0 };
    const gameBoardWithRecord = createGameBoardController().receiveAttack(
      hitCoordinates,
      gameBoardWithoutRecord,
      {},
    );
    expect(() => {
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithRecord,
        {},
      );
    }).toThrow("board has already received an attack at the coordinates");
  });
  it("throws an error if the place of the coordinates has already been recorded as a hit", () => {
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const placeCoordinates = { beginning: 0, end: 0, vertical: false };

    const gameBoardWithShip = createGameBoardController().placeShip(
      placeCoordinates,
      createShipController().createShip(1),
      gameBoardWithoutShip,
    );
    const hitCoordinates = { x: 0, y: 0 };
    const gameBoardWithRecord = createGameBoardController().receiveAttack(
      hitCoordinates,
      gameBoardWithShip,
      createShipController(),
    );
    expect(() =>
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithRecord,
        {},
      ),
    ).toThrow("board has already received an attack at the coordinates");
  });
  it("throws an error if the place of the coordinates has already recorded a hit", () => {
    const gameBoardWithoutRecord = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const hitCoordinates = { x: 0, y: 0 };
    const gameBoardWithRecord = createGameBoardController().receiveAttack(
      hitCoordinates,
      gameBoardWithoutRecord,
      createShipController(),
    );
    expect(() => {
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithRecord,
        createShipController(),
      );
    }).toThrow("board has already received an attack at the coordinates");
  });
  it("returns a board with hit recorded and ship hit count increased", () => {
    const testGameBoard = createGameBoardController().createGameBoard(10, 10);
    testGameBoard.board[0][0] = 1;
    const testShip = {
      length: 1,
      hitCount: 1,
      id: 0,
    };
    testGameBoard.ships.push(testShip);
    const hitCoordinates = { x: 0, y: 0 };
    const placeCoordinates = { beginning: 0, end: 0, vertical: false };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithShip = createGameBoardController().placeShip(
      placeCoordinates,
      createShipController().createShip(1),
      gameBoardWithoutShip,
    );

    expect(
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithShip,
        createShipController(),
      ),
    ).toEqual(testGameBoard);
  });
  it("returns a board with hit recorded and ship hit count increased when there are two ships on board", () => {
    const testGameBoard = createGameBoardController().createGameBoard(10, 10);
    const testShipOne = {
      length: 1,
      hitCount: 0,
      id: 0,
    };
    testGameBoard.board[0][0] = testShipOne;
    const testShipTwo = {
      length: 1,
      hitCount: 1,
      id: 1,
    };
    testGameBoard.board[4][4] = 1;
    testGameBoard.ships.push(testShipOne, testShipTwo);
    const testShipOnePlaceCoordinates = {
      beginning: 0,
      end: 0,
      vertical: false,
    };
    const gameBoardWithoutShip = createGameBoardController().createGameBoard(
      10,
      10,
    );
    const gameBoardWithOneShip = createGameBoardController().placeShip(
      testShipOnePlaceCoordinates,
      createShipController().createShip(1),
      gameBoardWithoutShip,
    );
    const testShipTwoPlaceCoordinates = {
      beginning: 4,
      end: 4,
      vertical: true,
    };
    const gameBoardWithTwoShip = createGameBoardController().placeShip(
      testShipTwoPlaceCoordinates,
      createShipController().createShip(1),
      gameBoardWithOneShip,
    );
    const hitCoordinates = { x: 4, y: 4 };
    expect(
      createGameBoardController().receiveAttack(
        hitCoordinates,
        gameBoardWithTwoShip,
        createShipController(),
      ),
    ).toEqual(testGameBoard);
  });
});
