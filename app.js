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
        question: `What will be the output of the following code snippet?`,
        a: 'Compilation error',
        b: 14,
        c: 'Runtime error',
        d: 59,
        answer: 59        
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



let rootDiv = document.getElementById('root')    

let scoreEl = document.querySelector('.score')
let resultEl = document.querySelector('.result')

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

const arr = []  

showQtn(questions)
function showQtn(questions){

    let result = questions.map(qtn=>{
        return `
        <article id="question">
            <h2 id="title">${qtn.question}</h2>
            <p class="option">
                <span id="a"> &nbsp${qtn.a}  
                </span>
            </p>
            <p class="option">
                <span id="b"> &nbsp${qtn.b}  
                </span>
            </p>
            <p class="option">
                <span id="c"> &nbsp${qtn.c}
                </span>
            </p>
            <p class="option">
                <span id="d"> &nbsp${qtn.d}
                </span>
            </p>
        </article>
        `
    }) 
    rootDiv.innerHTML = result[index]

    rootDiv.querySelectorAll('.option').forEach(function(option){
        option.addEventListener('click', clickEvent) 
        
    })
}


function nextQuestion(){

    if(index < questions.length - 1){ 
        ++index

        showQtn(questions)
    } else if(index == questions.length -1 && score == questions.length){
        resultEl.textContent = ` PERFECT!`
        let sound = new Audio('winfantasia-6912.mp3').play()
        displayResults() 
    } else if(index == questions.length -1 && scoreEl.textContent >=3){
        let sound = new Audio('winfantasia-6912.mp3').play()
        resultEl.textContent = ` PASSED!`

        displayResults()
    } else {
        displayResults()
        resultEl.textContent = ` FAILED`

    }
}



function clickEvent(){
        
    rootDiv.insertAdjacentElement("beforebegin", parEl)  
    
    arr.push(this.innerHTML)
    
    if((this.textContent).match(questions[index].answer)){
                           
        correctAns(this)
            
    } else {
        wrongAns(this)
    }       
    
}


function displayResults(){
    
    (function removeClickEvent(){
    rootDiv.querySelectorAll('.option').forEach(option=>{
        option.removeEventListener('click', clickEvent)
    })
    })()

    parEl.insertAdjacentElement("beforebegin",results)
    
    results.innerHTML = `
        <div class='header-text'>
            <span> correct answers </span>
            <span> your answers </span>    
        </div>

        <div class='wrapper'>
            <ol class='show-answers-div'>
                <li class='correct'> 
                    ${questions[0].answer}
                </li>
                <li class='correct'> 
                    ${questions[1].answer}
                </li>
                <li class='correct'> 
                    ${questions[2].answer}
                </li>
                <li class='correct'> 
                    ${questions[3].answer}
                </li>
                <li class='correct'> 
                    ${questions[4].answer}
                </li>
                <li class='correct'> 
                    ${questions[5].answer}
                </li>
                <li class='correct'> 
                    ${questions[6].answer}
                </li>
            </ol>

            <ol class='show-answers-div'>
                <li> 
                    ${arr[0]}
                </li>
                <li> 
                    ${arr[1]}
                </li>
                <li> 
                    ${arr[2]}
                </li>
                <li> 
                    ${arr[3]}
                </li>
                <li> 
                    ${arr[4]}
                </li>
                <li> 
                    ${arr[5]}
                </li>
                <li> 
                    ${arr[arr.length-1]}
                </li>
            </ol>
        </div>
    `
    resultDiv.insertAdjacentElement("afterend",restartBtn)            
}



restartBtn.onclick=function(){
    this.remove()
    results.remove()
    let sound = new Audio('interface-1-126517.mp3').play()

    resultEl.textContent = ''
    index = 0
    score = 0
    scoreEl.textContent = ` ${score}`
    showQtn(questions)  

    arr.splice(0)
}



function correctAns(e){

    scoreEl.textContent = ` ${++score}`

    nextQuestion()  

    let sound = new Audio('good-6081.mp3').play()

    setTimeout(() => {
        parEl.textContent = ''
    }, 1000, parEl.textContent = 'Correct!')    
    
    
}



function wrongAns(e){

    let sound = new Audio('error-2-36058.mp3').play()

    setTimeout(() => {
        parEl.textContent = ''
    }, 1000, parEl.textContent = 'Wrong.') 
     
    nextQuestion()
}
