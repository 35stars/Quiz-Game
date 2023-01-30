const questions = [
    {
        question: `JavaScript is a______language?`,
        a: 'Object-Oriented',
        b: 'Object-Based',
        c: 'Procedural',
        d: 'None of the above',
        answer: 'Object-Oriented'
    },
    {
        question: `Which of the following keywords is used to define a variable in Javascript?`,
        a: 'var',
        b: 'let',
        c: 'Both A and B',
        d: 'None of the above',
        answer: 'Both A and B'           
    },
    {
        question: `Which of the following methods is used to access HTML elements in Javascript??`,
        a: 'getElementById()',
        b: 'getElementsByClassName()',
        c: 'Both A and B',
        d: 'None of the above',
        answer: 'Both A and B'          
    },
    {
        question: `Upon encountering empty statements, what does the Javascript Interpreter do?`,
        a: 'Throws an error',
        b: 'Ignores the statements',
        c: 'Gives a warning',
        d: 'None of the above',
        answer: 'Ignores the statements'           
    },
    {
        question: `Which of the following methods can be used to display data in some form using Javascript?`,
        a: 'document.write()',
        b: 'console.log()',
        c: 'window.alert()',
        d:'All of the above',
        answer: 'All of the above'           
    },
    {
        question: `How can a datatype be declared to be a constant type?`,
        a: 'const',
        b: 'var',
        c: 'let',
        d: 'CONSTANT',
        answer: 'const'       
    },  
    
]


let container = document.querySelector('.container')

let rootDiv = document.getElementById('root')    

let innerScore = document.querySelector('.score')
let innerResult = document.querySelector('.result')

let resultDiv = document.getElementById('score-and-result-div')

let parEl = document.createElement('p')
    parEl.className = 'answer'

let results = document.createElement('div')
    results.className = 'results-div'    

let restartBtn = document.createElement('button')
    restartBtn.className = 'restart'
    restartBtn.textContent = 'Restart'

let index = 0    
let score = 0   

const myAnswers = []  

showQtn(questions)
function showQtn(questions){

    let result = questions.map(qtn=>{
        return `
        <article id="question">
            <h2 id="title">${qtn.question}</h2>
            <p class="option">
                <span id="a"> &nbsp ${qtn.a}</span>
            </p>
            <p class="option">
                <span id="b"> &nbsp ${qtn.b}</span>
            </p>
            <p class="option">
                <span id="c"> &nbsp ${qtn.c}</span>
            </p>
            <p class="option">
                <span id="d"> &nbsp ${qtn.d}</span>
            </p>
        </article>
        `
    }) 
    rootDiv.innerHTML = result[index]
    
    rootDiv.querySelectorAll('.option').forEach(function(option){
        option.addEventListener('click', clickEvent)   
    })
}


function clickEvent(){
        
    rootDiv.insertAdjacentElement("beforebegin", parEl)   
    
    myAnswers.push(this.innerHTML)

    if(this.innerText.match(questions[index].answer))correctAns()
    else wrongAns()
}





function nextQuestion(){

    if(index < questions.length - 1){ 
        ++index
        showQtn(questions)
    } else if(index == questions.length -1 && score == questions.length){
        innerResult.textContent = ` PERFECT!`
        new Audio('winfantasia-6912.mp3').play()
        displayResults() 
    } else if(index == questions.length -1 && innerScore.textContent >=3){
        new Audio('winfantasia-6912.mp3').play()
        innerResult.textContent = ` PASSED!`

        displayResults()
    } else {
        displayResults()
        innerResult.textContent = ` FAILED`
    }
}


function displayResults(){   
    rootDiv.querySelectorAll('.option').forEach(option=>{
        option.removeEventListener('click', clickEvent)
    })

    let correctAnswers = document.createElement('ol')
    correctAnswers.className = 'show-answers-div'

    let yourAnswers = document.createElement('ol')
    yourAnswers.className = 'your-answers-div'

    let div = document.createElement('div')
    div.className = 'wrapper'

    let correctAns = document.createElement('span')
    correctAns.textContent = 'Correct Answers'

    let yourAns = document.createElement('span')
    yourAns.textContent = 'Your Answers'

    for(let answer of myAnswers){
        yourAnswers.innerHTML += `<li>${answer}</li>`
        results.appendChild(yourAnswers)
    }
    
    for(let li of yourAnswers.children){
        for(let index of questions){
            if(li.firstElementChild.textContent.match(index.answer)){
                li.firstElementChild.style.color='blue'
                li.classList.add('list')
            } else {
                li.firstElementChild.classList.add('red-color')
            }
        }
    }

    for(let index of questions){
        correctAnswers.innerHTML += 
        `<li>${index.answer}</li>`

        results.appendChild(correctAnswers)
    }

    div.append(yourAns, correctAns)

    container.prepend(div)

    div.insertAdjacentElement("afterend",results)
    
    resultDiv.insertAdjacentElement("afterend",restartBtn)  
    
}



restartBtn.onclick=function(){

    myAnswers.splice(0)

    this.remove()

    container.querySelector('.wrapper').remove()
    results.querySelector('.show-answers-div').remove()
    results.querySelector('.your-answers-div').remove()

    new Audio('interface-1-126517.mp3').play()
    
    index = 0
    score = 0

    innerResult.textContent = ''
    innerScore.textContent = ` ${score}`
    
    showQtn(questions)  
}



function correctAns(){
    innerScore.textContent = ` ${++score}`
    
    nextQuestion()

    new Audio('good-6081.mp3').play()

    setTimeout(() => {
        parEl.textContent = ''
    }, 900, parEl.textContent = 'Correct!')       
}



function wrongAns(){

    nextQuestion()

    new Audio('error-2-36058.mp3').play()

    setTimeout(() => {
        parEl.textContent = ''
    }, 900, parEl.textContent = 'Wrong.')
}
