import style from './home.module.scss';
import { useState, useEffect } from 'react';

export default function Home() {

    const [player, setPlayer] = useState("player1");
    const [blocks, setBlocks] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ])

    const update = (coordinateX, coordinateY) => {
        let temp = blocks;
        if(player == "player1") {
            temp[coordinateX][coordinateY] = "X";
            setPlayer("player2");
        } else {
            temp[coordinateX][coordinateY] = "O";
            setPlayer("player1");
        }

        
        setBlocks([...temp]);
    }

    useEffect(() => {
        console.log("blocks changed", blocks);
    }, [blocks])

    return  (
        <main className={`flex flex-col items-center text-slate-50 ${style.main}`}>
            <h1 className={`text-center text-5xl mt-14 ${style.title}`}>
                Tic
                <span className="text-pink-500">-o-</span>
                Tac
                <span className="text-blue-600">-x-</span>
                Toe
            </h1>

            <div className={`grid grid-cols-3 mt-36 ${style.playground}`}>
                {
                    blocks[0].map((item, index) => (
                        <div key={index} onClick={() => item == 0 && update(0, index)} className={`w-14 h-14 flex justify-center items-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></div>
                    ))
                }
                {
                    blocks[1].map((item, index) => (
                        <div key={index} onClick={() => item == 0 && update(1, index)} className={`w-14 h-14 flex justify-center items-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></div>
                    ))
                }
                {
                    blocks[2].map((item, index) => (
                        <div key={index} onClick={() => item == 0 && update(2, index)} className={`w-14 h-14 flex justify-center items-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></div>
                    ))
                }
            </div>
        </main>
    )
}
