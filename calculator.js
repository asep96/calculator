var equationArr = [];


function add(a, b){
    var sum = a+b;
    return sum
}

function subtract(a, b){
    var difference = a-b;
    return difference;
}

function multiply(a,b){
    var multiple=b*a;
    return multiple;
}

function divide(a, b){
    var quotient = a/b;
    return quotient;
}

function buttonClick(){
    var calcDigitButtons = document.querySelectorAll(".calcButton");
    for(let i=0; i<calcDigitButtons.length; i++){
        calcDigitButtons[i].addEventListener("click", function(){
            var inputBar = document.getElementById("inputBar");
            inputBar.textContent += this.innerHTML;
        })
    }

    var clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function(){
        inputBar.textContent="";
        equationArr.length = 0;
    });

    var addButton = document.getElementById("add");
    addButton.addEventListener("click", function(){
        equationArr.push(Number(inputBar.textContent));
        equationArr.push("+");
        inputBar.textContent = ""
    });
    
    var subtractButton = document.getElementById("subtract");
    subtractButton.addEventListener("click", function(){
        equationArr.push(Number(inputBar.textContent));
        equationArr.push("-");
        inputBar.textContent = "";
    });

    var multiplyButton = document.getElementById("multiply");
    multiplyButton.addEventListener("click", function(){
        equationArr.push(Number(inputBar.textContent));
        equationArr.push("X");
        inputBar.textContent = "";
    });

    var divideButton = document.getElementById("divide");
    divideButton.addEventListener("click", function(){
        equationArr.push(Number(inputBar.textContent));
        equationArr.push("/");
        inputBar.textContent = "";
        
    });    

    var calculateButton = document.getElementById("equals");
    calculateButton.addEventListener("click", function(){
        equationArr.push(Number(inputBar.textContent));
        inputBar.textContent = operate(equationArr);
    })

}

/*
operate checks the user's input and calculates their total via order of operations
first it iterates through the array checking for values that need to be multiplied or divded
then it iterates through the array a second time to check for values that need to be 
added or subtracted, if there is more than one element in the array
it then returns the only item in the array, which is the final answer
*/
function operate(equationArr){ 
    
    var index = 0;

    while(index<=equationArr.length){
        if(equationArr[index] == "X" || equationArr[index] == "/"){
            if (equationArr[index] == "X") {
                equationArr[index-1] = multiply(equationArr[index-1], equationArr[index+1]);
                equationArr.splice(index,2);
            }
            else{
                if(equationArr[index+1]==0){
                    alert("Are you seriously trying to divide by 0?" 
                    + "Refresh the page and try again!");
                }
                else{
                    equationArr[index-1] = divide(equationArr[index-1], equationArr[index+1]);
                    equationArr.splice(index,2);
                }
            }
        }
        else if(index==(equationArr.length) && equationArr.length>1){
            index=1;
            if(equationArr[index] == "+" || equationArr[index] == "-"){
                if (equationArr[index] == "+") {
                    equationArr[index-1] = add(equationArr[index-1], equationArr[index+1]);
                    equationArr.splice(index,2);
                }
                else{
                    equationArr[index-1] = subtract(equationArr[index-1], equationArr[index+1]);
                    equationArr.splice(index,2);
                }
            }
            index=0;
        }
        else {
            index++;
        }
        if(equationArr.length==1){
            return(equationArr[0].toFixed(3));
        }
    }
}

buttonClick();