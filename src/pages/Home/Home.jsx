import style from './home.module.scss';
import { useState, useEffect } from 'react';

export default function Home() {

    const [player, setPlayer] = useState("player1");
    const [currLinePosition, setCurrLinePosition] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [blocks, setBlocks] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ])

    const update = (coordinateX, coordinateY) => {
        let temp = blocks;
        let sign = "";
        if(player == "player1") {
            temp[coordinateX][coordinateY] = "X";
            setPlayer("player2");
            sign = "X";
        } else {
            temp[coordinateX][coordinateY] = "O";
            setPlayer("player1");
            sign = "O";
        }
        
        if(temp[0][0] != 0 && temp[0][0] == temp[0][1] && temp[0][1] == temp[0][2]) {
            setCurrLinePosition(style.top);
            setIsPlaying(false);
        } else if(temp[0][0] != 0 && temp[0][0] == temp[1][1] && temp[1][1] == temp[2][2]) {
            setCurrLinePosition(style.cross);
            setIsPlaying(false);
        } else if(temp[0][0] != 0 && temp[0][0] == temp[1][0] && temp[1][0] == temp[2][0]) {
            setCurrLinePosition(style.left);
            setIsPlaying(false);
        } else if(temp[0][1] != 0 && temp[0][1] == temp[1][1] && temp[1][1] == temp[2][1]) {
            setCurrLinePosition(style.midy);
            setIsPlaying(false);
        } else if(temp[0][2] != 0 && temp[0][2] == temp[1][2] && temp[1][2] == temp[2][2]) {
            setCurrLinePosition(style.right);
            setIsPlaying(false);
        } else if(temp[0][2] != 0 && temp[0][2] == temp[1][1] && temp[1][1] == temp[2][0]) {
            setCurrLinePosition(style.crossReverse);
            setIsPlaying(false);
        } else if(temp[1][0] != 0 && temp[1][0] == temp[1][1] && temp[1][1] == temp[1][2]) {
            setCurrLinePosition(style.midx);
            setIsPlaying(false);
        } else if(temp[2][0] != 0 && temp[2][0] == temp[2][1] && temp[2][1] == temp[2][2]) {
            setCurrLinePosition(style.bottom);
            setIsPlaying(false);
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
            <div className={`mt-36 grid relative ${style.playground} ${!isPlaying && style.stop}`}>
                <div className={`h-1 rounded bg-neutral-100 absolute ${style.finishLine} ${currLinePosition}`}></div>
                <table>
                    <tbody>
                        <tr>
                            {
                                blocks[0].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(0, index)} className={`w-14 h-14 text-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></td>
                                ))
                            }
                        </tr>
                        <tr>
                            {
                                blocks[1].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(1, index)} className={`w-14 h-14 text-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></td>
                                ))
                            }
                        </tr>
                        <tr>
                            {
                                blocks[2].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(2, index)} className={`w-14 h-14 text-center border-2 border-rose-500 ${style.block}`}><span>{item}</span></td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}
