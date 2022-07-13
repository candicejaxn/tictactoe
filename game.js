import React, { useState } from 'react';
import { calculateWinner } from '../helpers';
import Board from './board';

const styles = {
    width: '200px',
    margin: '20px auto',
};

const Game = () => {
    const [history, setHistory] = useState(Array(9).fill(null));
    const [stepNumber, setstepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = i => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];
        //if user clicks on occupied square or if game is won, return
        if (winner || squares[i]) return;
        //Put x or o in clicked square
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setstepNumber(timeInHistory.length);
        setXisNext(!xIsNext);

    }

    const jumpTo = () => {
        setstepNumber(step);
        setXisNext(step % 2 === 0)

    };

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? 'Go to move#${move}' : 'Go to start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })
    )

        return (
            <>
            <Board squares={history[stepNumber]} onClick={{handleClick}} />
            <div style={styles}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
            
        )
    }

export default Game;