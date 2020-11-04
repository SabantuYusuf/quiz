import {quizData} from './quizData'
import React, { Component } from 'react'
import './styles.css'

export class Quiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        }
    }
    
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


    componentDidMount() {
        this.loadQuiz();
    }

    checkAnswer = correct => {
        this.setState({
            userAnswer: correct,
            disabled: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const {currentIndex} = this.state;
        if(this.state.currentIndex != prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: quizData[currentIndex].question,
                    options: quizData[currentIndex].options,
                    correct: quizData[currentIndex].correct
                }
            });

        }
    }

    finshHander =() => {
        if(this.state.currentIndex === quizData.length -1) {
            this.setState({
                quizEnd:true
            })
        }
    }

    render() {
        const{question, options, currentIndex, userAnswer, quizEnd} = this.state

        if(quizEnd) {
            return (
                <div>
                    <h1>You have succesfuly competed! </h1>
                    <h1>Your final score is {this.state.score} points</h1>
                    <p>The correct answers for this Triva are </p>
                    <ul>
                        {quizData.map((item, index) => {
                            <li className='options'
                                key={index}>
                                    {item.correct}
                            </li>
                        })}
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <h3>{question}</h3>
                <span>{`Question ${currentIndex + 1} of ${quizData.length}`}</span>
                {
                    options.map(option => 
                        <p key = {option.id} className={`options ${userAnswer === option? "selected": null}`}
                        onClick = {() => this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                        )
                }

                {currentIndex < quizData.length - 1 && 
                <button disabled = {this.state.disabled} onClick={this.nextQuestionHandler} className='nextbtn'>
                    Next Question
                    </button>}
                {currentIndex === quizData.length - 1 && 
                <button  disabled = {this.state.disabled} onClick={this.finshHander}>
                    Submit</button>}
            </div>
        )
    }
}

export default Quiz
