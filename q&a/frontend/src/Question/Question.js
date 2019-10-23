import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const useQuestion = id => {
  const [question, setQuestion] = useState(null)

  const fetchQuestion = async () => {
    const result = await axios(`http://localhost:8081/${id}`)
    const question = result.data
    setQuestion(question)
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  return [question]
}

const Question = () => {
  const { id } = useParams()
  const [question] = useQuestion(id)

  if (question === null) return <p>Loading ...</p>
  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
          <h1 className="display-3">{question.title}</h1>
          <p className="lead">{question.description}</p>
          <hr className="my-4" />
          <p>Answers:</p>
          {question.answers.map((answer, index) => (
            <p className="lead" key={index}>
              {answer.answer}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Question
