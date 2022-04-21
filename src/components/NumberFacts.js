import { useState, useEffect } from 'react'
import styles from './NumberFacts.module.css'

const NumberFacts = () => {
  const [numberFact, setNumberFact] = useState(42)
  const [number, setNumber] = useState(42)
  const [typeFact, setTypeFact] = useState('trivia')

  function fetchNumberFact(number, type = 'trivia') {
    fetch(`http://numbersapi.com/${number}/${type}/?json`)
      .then((res) => {
        if (res.status === 400) return { text: "Couldn't find anything aproppriate" }
        return res.json()
      })
      .then((json) => setNumberFact(json.text))
  }

  useEffect(() => {
    fetchNumberFact(42)
  }, [])

  const onChangeSelect = (e) => setTypeFact(e.target.value)

  const onChangeNumber = (e) => {
    e.preventDefault()
    setNumber(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    setNumberFact(fetchNumberFact(number, typeFact))
  }

  const plusNumber = (e) => {
    e.preventDefault()
    setNumber(+number + 1)
  }

  const minusNumber = (e) => {
    e.preventDefault()
    setNumber(+number - 1)
  }

  return (
    <section className={styles.numberFact}>
      <h1 className='title'>Facts about numbers</h1>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <span className={styles.number}>
          <input type='number' value={number} autoFocus={true} onChange={onChangeNumber} />
          <button type='button' className={styles.numberMinus} onClick={(e) => minusNumber(e)}>
            -
          </button>
          <button type='button' className={styles.numberPlus} onClick={(e) => plusNumber(e)}>
            +
          </button>
        </span>
        <select onChange={onChangeSelect}>
          <option value='trivia'>trivia</option>
          <option value='math'>math</option>
          <option value='year'>year</option>
          <option value='date'>date</option>
        </select>
        <br />
        <input type={'submit'} value='Get interesting fact' />
      </form>
      <div className={styles.fact}>{numberFact}</div>
    </section>
  )
}

export default NumberFacts
