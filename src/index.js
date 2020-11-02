import ReactDom from 'react-dom'
import React from 'react'
import Quiz from './Quiz'

function App() {
    return (
        <div>
            Welcome To Trivia
            <Quiz></Quiz>

        </div>
    )
}

export default App;

const rootElement = document.getElementById('root')
ReactDom.render(<App></App>, rootElement)
