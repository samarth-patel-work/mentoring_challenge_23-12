
const fs = require("fs");

let data = fs.readFileSync("english_words.txt", "utf8").split("\n");
// console.log(data);

// const makePartitions = () => {
//     let data = fs.readFileSync("english_words.txt", "utf8").split("\n");

//     let start = 0;
//     let end;
//     for (let i = 0; i < 10; i++) {
//         console.log(data.slice(start).length);
//         if (start > data.length - 1000) {
//             console.log("not here");
//             end = start + data.slice(start).length - 1;
//         } else {
//             console.log("here");
//             end = start + 999;
//         }
//         console.log(start, end);
//         fs.writeFile(
//             `part${i}.txt`,
//             data.slice(start, end).join(""),
//             function (err) {
//                 if (err) return console.log(err);
//             }
//         );
//         start = end + 1;
//     }
// };

// const findInFile = (element) => {
//     for (let i = 0; i < 10; i++) {
//         let data = fs.readFileSync(`part${i}.txt`, "utf8").split("\n");
//         console.log(data);
//         if (data.indexOf(element) != -1) {
//             return true;
//         }
//     }
//     return false;
// };

let numberMapping = {
    //telecommunications - 835326668642284667
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
    x: [],
    y: [],
};

const suggestions = (input) => {
    let originalLength = input.length;
    while (input.length > 1) {
        for (let arr1 = 0; arr1 < numberMapping[input[0]].length; arr1++) {
            for (let arr2 = 0; arr2 < numberMapping[input[1]].length; arr2++) {
                numberMapping["x"].push(
                    numberMapping[input[0]][arr1] +
                        numberMapping[input[1]][arr2]
                );
            }
        }
        numberMapping["y"] = [...numberMapping["x"]];
        input = input.split("");
        input.shift();
        input.shift();
        input.unshift("y");
        input = input.join("");
        numberMapping["x"] = [];
    }
    let answer = numberMapping["y"].filter(
        (element) => element.length === originalLength
    );
    if (originalLength === 1) {
        answer = numberMapping[input[0]];
    }
    // makePartitions();

    let finalAnswer = answer.filter(
        (element) => data.indexOf(`${element}\r`) != -1
    );
    console.log(finalAnswer);
    return finalAnswer;
};

suggestions("23");
