import ReactDom from 'react-dom'
import React from 'react'
import Quiz from './Quiz'

function App() {
    return (
        <div>
            <h1>Welcome to Trivia</h1>
            <Quiz></Quiz>

        </div>
    )
}

export default App;

const rootElement = document.getElementById('root')
ReactDom.render(<App></App>, rootElement)
