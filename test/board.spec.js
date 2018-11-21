'use strict';
import mocha from 'mocha';
import chai from 'chai';

import { Board } from '../src/board';
import { NUM_ROWS, NUM_COLUMNS, STARTING_POSITION } from '../src/constants';
import { Snake } from '../src/snake';
import { createEmptyGrid } from '../src/utilities';

const {describe, it, beforeEach} = mocha;
const {expect} = chai;

let board;
const rows = 3;
const columns = 2;
let mockSnake = () => new Snake([2, 0]);
let mockGrid = () => createEmptyGrid(rows, columns);

describe('Board', () => {


  describe('initializes', function () {

    it('with a default grid if one is not passed', () => {
      board = new Board();
      expect(board.NUM_ROWS).to.eql(NUM_ROWS);
      expect(board.NUM_COLS).to.eql(NUM_COLUMNS);
    });

    it('with the provided grid', () => {
      board = new Board(mockGrid());
      expect(board.NUM_ROWS).to.eql(rows);
      expect(board.NUM_COLS).to.eql(columns);
    });

    it('with a default snake if one is not provided', () => {
      board = new Board();
      expect(board.snake).to.deep.eql(new Snake(STARTING_POSITION));
    });

    it('with the provided snake', () => {
      board = new Board(mockGrid(), mockSnake());
      expect(board.snake).to.eql(mockSnake());
    });


    it('puts snake on the board', function () {
      board = new Board(mockGrid(), mockSnake());
      expect(board.grid[2][0]).to.eq('s');
    });

  });


  describe('#setCell', function () {
    board = new Board();
    board.setCell([0, 2], 'm');
    expect(board.grid[0][2]).to.eq('m');
  });



  describe('#getEmptyCells', function () {
    beforeEach(() => {
      board = new Board(mockGrid(), mockSnake());
    });


    it('returns cells with no snake', function () {
      const actual = board.getEmptyCells();
      expect(actual.length).to.eq(5);
      expect(actual).not.to.contain([0, 2]);
    });

    it('returns empty array if no cells are empty', function () {
      const actual = board.getEmptyCells();
      expect(actual.length).to.eq(5);
      board.grid = [ [ 's', 's' ], [ 's', 's' ], [ 's', 's' ] ];
      expect(board.getEmptyCells()).to.deep.eq([]);
    });

  });


  describe('#getNextPosition', function () {
    beforeEach(() => {
      board = new Board(mockGrid(), mockSnake());
    });


    it('handles up', function () {
      const actual = board.getNextPosition('up');
      const expected = [1, 0];
      expect(actual).to.deep.eq(expected);
    });

  });

  describe('#isValidMove', function () {
    beforeEach(() => {
      board = new Board(mockGrid(), mockSnake());
    });


    it('identifies invalid move', function () {
      const actual = board.isValidMove([3, 1]);
      expect(actual).to.eq(false);
    });

    it('identifies valid move', function () {
      const actual = board.isValidMove([2, 1]);
      expect(actual).to.eq(true);
    });

  });


  describe('#move', function () {
    beforeEach(() => {
      board = new Board(mockGrid(), mockSnake());
    });

    it('moves', function () {
      board.move('right');
      expect(board.grid[2][1]).to.eq('s');
    });

    it('slides', function () {
      board.grid[2][1] = 'a';
      board.move('right');
      expect(board.grid[2][1]).to.eq('s');
      expect(board.grid[2][0]).to.eq('s');
      expect(board.snake.head).to.deep.eq([2, 1]);
      expect(board.snake.tail).to.deep.eq([2, 0]);
    });

  });








});
