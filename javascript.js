const screen = document.querySelector(".screen");
let add = (number_a, number_b) => {
    return number_a + number_b;
}
let subtract = (number_a, number_b) => {
    return number_a - number_b;
}
let multiply = (number_a, number_b) => {
    return number_a * number_b;
}
let divide = (number_a, number_b) => {
    if (number_b === 0) return "ERROR! CAN'T DIVIDE ZERO";
    else return number_a / number_b;
}
let operate = (number_1, operator, number_2) => {
    let result;
    if (operator === "+") result = add(Number(number_1), Number(number_2));
    else if (operator === "-") result = subtract(Number(number_1), Number(number_2));
    else if (operator === "x") result = multiply(Number(number_1), Number(number_2));
    else if (operator === "/") result = divide(Number(number_1), Number(number_2));
    return result;
}
let display = (input) => {
    let item = document.createElement("div");
    item.textContent = input;
    item.style.cssText = `
            font-size: 35px;
            display: flex;
            flex-shrink: 1;
            justify-content: flex-end;
            font-family : 'Share Tech';
            padding: 15px;
            margin: 0;
            overflow-x: auto;
            white-space: nowrap;
        `
    screen.innerHTML = "";
    screen.appendChild(item);
}
let useCalc = () => {
    const mainBtn = document.querySelectorAll(".main-btn");
    const clearBtn = document.querySelector(".clear");
    const deleteBtn = document.querySelector(".delete")
    let number_1 = "";
    let number_2 = "";
    let operator = "";
    let numberSet = "0123456789.";
    let operatorSet = "+-x/=";
    let res = "";
    mainBtn.forEach(btn => {
        btn.addEventListener("click", (event) => {
            if (numberSet.includes(event.target.textContent)) {
                if (operator === "") {
                    if (event.target.textContent === "." && !number_1.includes(".")) {
                        if (number_1 === "") {
                            number_1 = "0.";
                            display(number_1);
                        }
                        else {
                            number_1 += event.target.textContent;
                            display(number_1);
                        }
                    }
                    else if (event.target.textContent != ".") {
                        number_1 += event.target.textContent;
                        display(number_1);
                    }
                }
                else {
                    if (event.target.textContent === "." && !number_2.includes(".")) {
                        if (number_2 === "") {
                            number_2 = "0.";
                            display(number_2);
                        }
                        else {
                            number_2 += event.target.textContent;
                            display(number_2);
                        }
                    }
                    else if (event.target.textContent != ".") {
                        number_2 += event.target.textContent;
                        display(number_2);
                        res = operate(number_1, operator, number_2);
                        number_1 = res;
                    }
                }
            }
            else if (operatorSet.includes(event.target.textContent)) {
                number_2 = "";
                operator = event.target.textContent;
                if (res != "") {
                    if (res == 0) display("0");
                    else display(res);
                }
            }
        });
    });
    deleteBtn.addEventListener("click", () => {
        if (number_1 != "" && number_2 === "") {
            number_1 = number_1.slice(0, -1);
            display(number_1);
        }
        else if (number_2 != "") {
            number_2 = number_2.slice(0, -1);
            display(number_2);
        }
    })
    clearBtn.addEventListener("click", () => {
        number_1 = "";
        number_2 = "";
        operator = "";
        res = "";
        screen.innerHTML = "";
    })
}

useCalc();
