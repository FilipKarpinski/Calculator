String.prototype.insert = function (index, string) {
    if (index > 0) {
        return this.substring(0, index) + string + this.substring(index, this.length);
    }
    return string + this;
}

function formattedInput() {
    let counter = 0
    let formattedInput = input
    for (let i = input.length; i > 0; i--) {
        if (input[i] >= '0' && input[i] <= '9')
            counter++
        else
            counter = 0
        if (counter == 3 && (input[i - 1] >= '0' && input[i - 1] <= '9')) {
            formattedInput = input.insert(i, ",")
            counter = 0
        }
    }
    return formattedInput
}

function displayInput(formattedInput){
    document.getElementById('input').innerHTML=formattedInput
}

function displayInputHistory(thing){
    document.getElementById('outcome').innerHTML=thing
}

function parseInput() {
    let num = []
    let temp = 0
    let check = false
    for (let i = 0; i < input.length; i++) {
        if (input[i] >= '0' && input[i] <= '9')
            num.push(input[i])
        else {
            ops.push(input[i])
            for (let j = num.length - 1; j >= 0; j--) {
                check = true
                temp += parseInt(num[j]) * Math.pow(10, num.length - 1 - j)
            }
            if (check)
                nums.push(temp)
            temp = 0
            num = []
            check = false
        }
    }
}

function calculate(){
    let outcome=0
    let temp=0
    for(let i=0;i<ops.length-1;i++){
        if(ops[i]=='x'||ops[i]=='/'){
            temp=insideCalculate(nums[i],nums[i+1],ops[i])
            nums[i+1]=temp
            nums.splice(i,1)
            ops.splice(i,1)
        }
    }
    if(ops.length==1)
    outcome=nums[0]
    for(let i=0;i<nums.length-1;i++){
        if(i==0)
        outcome=insideCalculate(nums[i],nums[i+1],ops[i])
        else
        outcome=insideCalculate(outcome,nums[i+1],ops[i])
    }
    document.getElementById('input').innerHTML=outcome
    return outcome
}

function insideCalculate(num1, num2, operator) {
    if (operator == '/' && num2 != 0)
        return num1 / num2
    else if (operator == 'x')
        return num1 * num2
    else if (operator == '-')
        return num1 - num2
    else if (operator == '+')
        return num1 + num2
    else return "Error"
}

////////////////////////////////////////////////////////////////////////////////////////
var input = ''
var outcome = ''
var result = ''
var ops = []
var nums = []

var numbers = document.querySelectorAll('.number')
var operators = document.querySelectorAll('.operator')

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        if (input.length < 19)
            input += this.innerHTML
        displayInputHistory(result)
        result=''
        displayInput(formattedInput())
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function () {
        let last = input[input.length - 1]
        if (last != '/' && last != 'x' && last != '-' && last != '+' && input.length < 19 && input.length > 0){
            input += this.innerHTML
        displayInputHistory(result)
        displayInput(formattedInput())
        }
    })
}

document.getElementById('C').addEventListener('click', function () {
    input = input.slice(0, -1)
    displayInput(formattedInput())
})
document.getElementById('CE').addEventListener('click', function () {
    input = ''
    displayInput(formattedInput())
    displayInputHistory('')
})

document.getElementById('=').addEventListener('click',function(){
    let last = input[input.length - 1]
    if (last != '/' && last != 'x' && last != '-' && last != '+'){
    input += this.innerHTML
    parseInput()
    result=calculate()
    displayInputHistory(input)
    displayInput(result)
    input=''
    nums=[]
    ops=[]
        }
})