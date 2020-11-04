import { quizData } from './quizData'
import React, { Component } from 'react'
import './styles.css'

export class Quiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            //
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            // user can't go next until an option is selected
            disabled: true
        }
    }
    
    // set question based on curent index
    loadQuiz = () => {
        const {currentIndex} = this.state;
        this.setState(() => {
            return {
                question: quizData[currentIndex].question,
                options: quizData[currentIndex].options,
                correct: quizData[currentIndex].correct
            }
        })
    }

    //if user answer matches correct answer, increase score
    nextQuestionHandler = () => {
        const {userAnswer, correct, score} = this.state

        if(userAnswer === correct) {
            this.setState({
                score: score + 1
            })
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })
    }

    //change in state
    componentDidMount() {
        this.loadQuiz();
    }

    // check if user answer is correct 
    checkAnswer = correct => {
        this.setState({
            userAnswer: correct,
            disabled: false
        })
    }

    //change in currentstate, load another question and disable next until answer is selected
    componentDidUpdate(prevProps, prevState) {
        const {currentIndex} = this.state;
        if(this.state.currentIndex != prevState.currentIndex) {
            this.setState(() => {
                return {
                    //load next question
                    question: quizData[currentIndex].question,
                    options: quizData[currentIndex].options,
                    correct: quizData[currentIndex].correct
                }
            });

        }
    }

    // only respond to submit buuton
    finshHander =() => {
        if(this.state.currentIndex === quizData.length -1) {
            this.setState({
                quizEnd: true
            })
        }
    }

    render() {
        // all states
        const{question, options, currentIndex, userAnswer, quizEnd, correct} = this.state

        if(quizEnd) {
            return (
                <div>
                    <h1>You have succesfuly competed! </h1>
                    <h1>Your final score is {this.state.score} points</h1>
                    <p>The correct answers for this Triva are </p>
                    <ul>
                        {quizData.map((item, index) => {
                            <li key={index} className='options' >
                                {item.correct}        
                            </li>
                        })}
                    </ul>
                </div>
            )
        }


        return (
            <div>
                <span>{`Question ${currentIndex + 1} of ${quizData.length}`}</span>
                <h3>{question}</h3>
                
                {
                    options.map(option => 
                        //class based on if selected or not
                        <p key = {option.id} className={`options ${userAnswer === option? "selected": null}`}
                        onClick = {() => this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                        )
                }

                {/* display next button condictionally */}
                {currentIndex < quizData.length - 1 && 
                <button disabled = {this.state.disabled} onClick={this.nextQuestionHandler} className='nextbtn'>
                    Next Question
                    </button>}

                {currentIndex === quizData.length - 1 && 
                <button onClick={this.finshHander} disabled = {this.state.disabled} className='submitbtn'>
                    Submit</button>}
            </div>
        )
    }
}

export default Quiz
