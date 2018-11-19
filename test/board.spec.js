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
const mockSnake = new Snake([1, 1]);
const mockY = 3;
const mockX = 2;
const mockGrid = createEmptyGrid(mockY, mockX);
describe('Board', () => {


  describe('initializes', function () {

    it('with a default grid if one is not passed', () => {
      board = new Board();
      expect(board.Y).to.eql(NUM_ROWS);
      expect(board.X).to.eql(NUM_COLUMNS);
    });

    it('with the provided grid', () => {
      board = new Board(mockGrid);
      expect(board.Y).to.eql(mockY);
      expect(board.X).to.eql(mockX);
    });

    it('with a default snake if one is not provided', () => {
      board = new Board();
      expect(board.snake).to.deep.eql(new Snake(STARTING_POSITION));
    });

    it('with the provided snake', () => {
      board = new Board(mockGrid, mockSnake);
      expect(board.snake).to.eql(mockSnake);
    });
  });


  describe('#getEmptyCells', function () {
    beforeEach(() => {
      let snakeTriple = new Snake([0,0]);
      snakeTriple.growTo[0,1];
      snakeTriple.growTo[1,1];
      board = new Board(mockGrid, mockSnake);
    });


    it('returns cells with no snake', function () {
      const actual = board.getEmptyCells();
      // TODO
    });

  });






});
