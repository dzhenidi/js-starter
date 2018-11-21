'use strict';
import mocha from 'mocha';
import chai from 'chai';

import { Snake } from '../src/snake';

const {describe, it, beforeEach} = mocha;
const {expect} = chai;

let snake;

describe('snake', function () {

  it('initiates with a head', function () {
    const snake = new Snake(1);
    expect(snake.head).to.eql(1);
  });



  describe('growing', function () {
    beforeEach(() => {
      snake = new Snake(1);
      snake.growTo(2);
    });


    it('updates size', function () {
      expect(snake.size).to.eql(2);
    });

    it('updates head', function () {
      expect(snake.head).to.eql(2);
    });

    it('sets tail when snake gets a second cell', function () {
      expect(snake.tail).to.eql(1);
    });

    it('does not update tail when snake is bigger than 1', function () {
      snake.growTo(3);
      expect(snake.head).to.eql(3);
      expect(snake.tail).to.eql(1);
    });

  });


  describe('moveTo', function () {
    beforeEach(() => {
      snake = new Snake(1);
      snake.moveTo(2);
    });


    it('updates head', function () {
      expect(snake.head).to.eql(2);
    });

    it('does not update size', function () {
      expect(snake.size).to.eql(1);
    });

    it('does not set tail when size is 1', function () {
      expect(snake.tail).to.eql(null);
    });

    it('does not set tail when size is 1', function () {
      snake.growTo(3);
      snake.moveTo(4);
      expect(snake.tail).to.eql(3);
    });

  });



});
