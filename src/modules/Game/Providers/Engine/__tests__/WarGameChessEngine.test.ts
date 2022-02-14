import {ShortMove} from 'chess.js'
import { getNewChessGame } from 'src/lib/chess/chess'
import { WarChessEngine } from 'src/modules/Engine/WarGameChessEngine'

describe('wargame engine test', () => {
  test('make a move to an empty square with wP3 and then with bP4', () => {
    const warGameEngine = new WarChessEngine(getNewChessGame())
    expect(warGameEngine.fen()).toEqual(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    )
    const moveWhite: ShortMove = {
      to: 'd4',
      from: 'd2',
    }
    warGameEngine.move(moveWhite, 'melee')
    expect(warGameEngine.fen()).toEqual(
      'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    )
    expect(warGameEngine.getPosition()['wP3']).toBe('d4')

    const moveBlack: ShortMove = {
      to: 'e5',
      from: 'e7',
    }
    warGameEngine.move(moveBlack,'melee')
    expect(warGameEngine.fen()).toEqual(
      'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 2',
    )
    expect(warGameEngine.getPosition()['bP4']).toBe('e5')
  })

  test(`make a move with wP3 on the square with bP4. 
        Both pawn with 2 health. 
        Expect positions to be the same but bP4 to have 1 health and turn to be black now`, () => {
    const warGameEngine = new WarChessEngine(getNewChessGame());
  
    //move with white wP3 to d4 and then black bP4 to e5 so it will have same setup as previously ended test.
    const moveWhite: ShortMove = {
      to: 'd4',
      from: 'd2',
    }
    warGameEngine.move(moveWhite, 'melee')
    const moveBlack: ShortMove = {
      to: 'e5',
      from: 'e7',
    }
    warGameEngine.move(moveBlack, 'melee')

    expect(warGameEngine.fen()).toBe('rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 2');
    expect(warGameEngine.turn()).toBe('w');


    //Move wP3 to e5 and attack bP4. Expect same positions but turn to be BLACK.

    const move: ShortMove = {
      from: 'd4',
      to: 'e5',
    }

    warGameEngine.move(move, 'melee')

    expect(warGameEngine.getPosition()['wP3']).toBe('d4')
    expect(warGameEngine.getPosition()['bP4']).toBe('e5')
    
    expect(warGameEngine.getHealth()['wP3']).toBe(2);
    expect(warGameEngine.getHealth()['bP4']).toBe(1);

    expect(warGameEngine.turn()).toBe('b')
    expect(warGameEngine.fen()).toBe('rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 2')

    //Move the other way, bP4 to hit back at wP3. 
    //Expect same positions but now both pieces to have 1 health and turn to be WHITE

    const reverseMove: ShortMove = {
      from: 'e5',
      to: 'd4'
    }

    warGameEngine.move(reverseMove, 'melee');

    expect(warGameEngine.getPosition()['wP3']).toBe('d4')
    expect(warGameEngine.getPosition()['bP4']).toBe('e5')

    expect(warGameEngine.getHealth()['wP3']).toBe(1);
    expect(warGameEngine.getHealth()['bP4']).toBe(1);

    expect(warGameEngine.turn()).toBe('w')

    expect(warGameEngine.fen()).toBe('rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 3')
  })

  test('swap turn and make first move with black', () => {
    const warGameEngine = new WarChessEngine(getNewChessGame());
    expect(warGameEngine.fen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',);
    warGameEngine.swapTurn();

    expect(warGameEngine.fen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1',)
    const move: ShortMove = {
      from: 'd7',
      to: 'd6'
    }
    const valid = warGameEngine.move(move, 'melee');
    expect(warGameEngine.fen()).toBe('rnbqkbnr/ppp1pppp/3p4/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2');
    expect(valid).toBeTruthy()
  })
})
