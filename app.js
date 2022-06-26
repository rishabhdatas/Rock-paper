const express = require("express");
const app = express();
const port = process.env.port || 3000;




app.get("/rockPaperScissors", (req, res) => {
    try {

        function winResult(firstPlayerValue, secondPlayerValue) {
            // let firstPlayerConvertedValue = (firstPlayerValue == "Stone") ? 1 : (firstPlayerValue == "Paper") ? 2 : 3;
            // let secondPlayerConvertedValue = (firstPlayerValue == "Stone") ? 1 : (firstPlayerValue == "Paper") ? 2 : 3;
            if (firstPlayerValue == secondPlayerValue) {
                return 0;
            } else {
                if (firstPlayerValue == "Stone") {
                    if (secondPlayerValue == "Paper")
                        return 2;
                    if (secondPlayerValue == "Scissors")
                        return 1;
                } else if (firstPlayerValue == "Paper") {
                    if (secondPlayerValue == "Stone")
                        return 1;
                    if (secondPlayerValue == "Scissors")
                        return 2;
                }
                else {
                    if (secondPlayerValue == "Stone")
                        return 2;
                    if (secondPlayerValue == "Paper")
                        return 1;
                }
            }
        }

        function returnPlayerValue() {
            let randomNumber = Math.floor(Math.random() * 3) + 1;
            return (randomNumber == 1) ? "Stone" : (randomNumber == 2) ? "Paper" : "Scissors"
        }

        let returnResult = [];
        for (let index = 0; index < 50; index++) {
            let pushValue = {};
            pushValue.playerValues = {
                player1: returnPlayerValue(),
                player2: returnPlayerValue(),
                player3: returnPlayerValue(),
                player4: returnPlayerValue()
            }
            pushValue.playerWin = {
                player1: [],
                player2: [],
                player3: [],
                player4: []
            }
            for (let index1 = 0; index1 < 4; index1++) {
                // pushValue.playerWin[`player${index1+1}`]
                for (let index2 = index1; index2 < 4; index2++) {
                    if (index1 == index2) {
                        pushValue.playerWin[`player${index1 + 1}`][index2] = "-";
                    } else {
                        let win = winResult(pushValue.playerValues[`player${index1 + 1}`], pushValue.playerValues[`player${index2 + 1}`]);
                        if (win == 0) {
                            if (index != 0) {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = returnResult[index - 1].playerWin[`player${index1 + 1}`][index2];
                                pushValue.playerWin[`player${index2 + 1}`][index1] = returnResult[index - 1].playerWin[`player${index2 + 1}`][index1];
                            } else {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = 0;
                                pushValue.playerWin[`player${index2 + 1}`][index1] = 0;
                            }
                        } else if (win == 1) {
                            if (index != 0) {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = returnResult[index - 1].playerWin[`player${index1 + 1}`][index2] + 1;
                                pushValue.playerWin[`player${index2 + 1}`][index1] = returnResult[index - 1].playerWin[`player${index2 + 1}`][index1];
                            } else {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = 1;
                                pushValue.playerWin[`player${index2 + 1}`][index1] = 0;
                            }
                        } else {
                            if (index != 0) {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = returnResult[index - 1].playerWin[`player${index1 + 1}`][index2];
                                pushValue.playerWin[`player${index2 + 1}`][index1] = returnResult[index - 1].playerWin[`player${index2 + 1}`][index1] + 1;
                            } else {
                                pushValue.playerWin[`player${index1 + 1}`][index2] = 0
                                pushValue.playerWin[`player${index2 + 1}`][index1] = 1;
                            }
                        }
                    }
                }
            }
            returnResult.push(pushValue);
        }

        res.status(200).send({ message: "Success", response: returnResult });

    } catch (error) {
        console.log(error);
        res.send({ message: error.message, error: error })
    }
})








app.listen(port,()=>{
    console.log(`server  running  on ${port}`);
});