import style from './home.module.scss';
import { useState, useEffect } from 'react';
import handshake from './../../assets/icons/handshake.svg';
import trophy from './../../assets/icons/trophy.svg';
import cross from './../../assets/icons/cross.svg';


export default function Home() {
    const [player, setPlayer] = useState("player1");
    const [currLinePosition, setCurrLinePosition] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [status, setStatus] = useState("playing");
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
            sign = "X";
        } else {
            temp[coordinateX][coordinateY] = "O";
            sign = "O";
        }
        setBlocks([...temp]);
        
        if(temp[0][0] != 0 && temp[0][0] == temp[0][1] && temp[0][1] == temp[0][2]) {
            setCurrLinePosition(style.top);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[0][0] != 0 && temp[0][0] == temp[1][1] && temp[1][1] == temp[2][2]) {
            setCurrLinePosition(style.cross);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[0][0] != 0 && temp[0][0] == temp[1][0] && temp[1][0] == temp[2][0]) {
            setCurrLinePosition(style.left);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[0][1] != 0 && temp[0][1] == temp[1][1] && temp[1][1] == temp[2][1]) {
            setCurrLinePosition(style.midy);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[0][2] != 0 && temp[0][2] == temp[1][2] && temp[1][2] == temp[2][2]) {
            setCurrLinePosition(style.right);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[0][2] != 0 && temp[0][2] == temp[1][1] && temp[1][1] == temp[2][0]) {
            setCurrLinePosition(style.crossReverse);
            setIsPlaying(false);
            setStatus(player);
            return false;
        } else if(temp[1][0] != 0 && temp[1][0] == temp[1][1] && temp[1][1] == temp[1][2]) {
            setCurrLinePosition(style.midx);
            setStatus(player);
            setIsPlaying(false);
            return false;
        } else if(temp[2][0] != 0 && temp[2][0] == temp[2][1] && temp[2][1] == temp[2][2]) {
            setCurrLinePosition(style.bottom);
            setStatus(player);
            setIsPlaying(false);
            return false;
        }

        const isTie = () => {
            let result = true;
            temp.map((row) => {
                row.map((item) => {
                    console.log("hmm", item)
                    if(item == 0) {
                        result = false;
                    }
                })
            })

            return result;
        }

        if(isTie()) {
            setStatus("tie");
        }

        if(player == "player1") {
            setPlayer('player2');
        } else {
            setPlayer('player1');
        }
    }

    return  (
        <main className={`flex flex-col items-center text-slate-50 ${style.main}`}>
            <h1 className={`text-center text-5xl mt-14 ${style.title}`}>
                Tic
                <span className="text-pink-500">-x-</span>
                Tac
                <span className="text-blue-600">-o-</span>
                Toe
            </h1>
            <div className={`mt-24 grid grid-flow-col auto-cols-auto gap-x-8 items-center ${style.playerTurns} ${status == "tie" && style.tie}`}>
                <div className={`relative ${style.player} ${status == "player1" && style.winner} ${player == "player2" && status == "playing" && style.passive}`}>
                    <div className={`absolute top-0 w-8 h-8 ${style.trophy}`}>
                        <img src={trophy} draggable="false" alt="Trophy" />
                    </div>
                    <p className={`px-4 py-2 bg-pink-500 rounded text-xl shadow-md ${style.text}`}>player1</p>
                </div>
                <div className={style.tie}>
                    <img src={handshake} draggable="false" alt="Tie" />
                </div>
                <div className={`relative ${style.player} ${status == "player2" && style.winner} ${player == "player1" && status == "playing" && style.passive}`}>
                    <div className={`absolute top-0 w-8 h-8 ${style.trophy}`}>
                        <img src={trophy} draggable="false" alt="Trophy" />
                    </div>
                    <p className={`px-4 py-2 bg-blue-500 rounded text-xl shadow-md ${style.text}`}>player2</p>
                </div>
            </div>
            <div className={`mt-24 grid relative ${style.playground} ${!isPlaying && style.stop}`}>
                <div className={`h-1 rounded bg-neutral-100 absolute ${style.finishLine} ${currLinePosition}`}></div>
                <table>
                    <tbody>
                        <tr>
                            {
                                blocks[0].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(0, index)} className={`w-24 h-24 text-center text-5xl border-2 border-rose-500 ${style.block}`}><span>
                                        {
                                            item == "O" ? (
                                                <div className={style.circle}></div>
                                            ) : item == "X" ? (
                                                <div className={style.img}>
                                                    <img src={cross} draggable="false" alt="X" />
                                                </div>
                                            ) : ""
                                        }
                                    </span></td>
                                ))
                            }
                        </tr>
                        <tr>
                            {
                                blocks[1].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(1, index)} className={`w-24 h-24 text-center text-5xl  border-2 border-rose-500 ${style.block}`}><span>
                                        {
                                            item == "O" ? (
                                                <div className={style.circle}></div>
                                            ) : item == "X" ? (
                                                <div className={style.img}>
                                                    <img src={cross} draggable="false" alt="X" />
                                                </div>
                                            ) : ""
                                        }
                                    </span></td>
                                ))
                            }
                        </tr>
                        <tr>
                            {
                                blocks[2].map((item, index) => (
                                    <td key={index} onClick={() => item == 0 && update(2, index)} className={`w-24 h-24 text-center text-5xl border-2 border-rose-500 ${style.block}`}><span>
                                        {
                                            item == "O" ? (
                                                <div className={style.circle}></div>
                                            ) : item == "X" ? (
                                                <div className={style.img}>
                                                    <img src={cross} draggable="false" alt="X" />
                                                </div>
                                            ) : ""
                                        }
                                    </span></td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}
