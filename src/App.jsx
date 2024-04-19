import {useState} from 'react'
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import BackspaceIcon from '@mui/icons-material/Backspace';
import './App.css'

function App() {
  const [fn, setFn] = useState(false)
  const [output, setOutput] = useState('')
  const [lastClick, setLastClick] = useState(null)
  const [prev, setPrev] = useState(null)
  const [counter, setCounter] = useState(0)
  const lower = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const upper = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ']

  const handleClick = (section) => {
    const currTime = new Date().getTime()
    let diff = 0
    if (lastClick) {
      diff = currTime - lastClick
    }
    setLastClick(currTime)
    const len = lower[section].length

    if (prev === section && diff < 1000) {
      const newCounter = counter + 1  // to deal with async delay
      setCounter(newCounter)
      if (fn) {
        setOutput(output.slice(0, -1) + upper[section][newCounter % len])
      } else {
        setOutput(output.slice(0, -1) + lower[section][newCounter % len])
      }
    } else {
      setCounter(0)
      if (fn) {
        setOutput(output + upper[section][0])
      } else {
        setOutput(output + lower[section][0])
      }
    }
    setPrev(section)
  }

  const handleSpace = () => {
    setCounter(0)
    setPrev(null)
    setOutput(output + ' ')
  }

  const handleDel = () => {
    setCounter(0)
    setPrev(null)
    setOutput(output.slice(0, -1))
  }

  return (
    <div className='app'>
      <input type="text" value={output} size={100} />
      <div className='whole'>
        <div className='row'>
          <div className='box'><span className='text' onClick={() => setFn(!fn)}>{fn ? 'fn' : 'FN'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(0)}>{fn ? 'ABC' : 'abc'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(1)}>{fn ? 'DEF' : 'def'}</span></div>
        </div>
        <div className='row'>
          <div className='box'><span className='text' onClick={() => handleClick(2)}>{fn ? 'GHI' : 'ghi'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(3)}>{fn ? 'JKL' : 'jkl'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(4)}>{fn ? 'MNO' : 'mno'}</span></div>
        </div>
        <div className='row'>
          <div className='box'><span className='text' onClick={() => handleClick(5)}>{fn ? 'PQRS' : 'pqrs'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(6)}>{fn ? 'TUV' : 'tuv'}</span></div>
          <div className='box'><span className='text' onClick={() => handleClick(7)}>{fn ? 'WXYZ' : 'wxyz'}</span></div>
        </div>
        <div className='row'>
          <div className='bottom-row'><span className='text' onClick={() => handleSpace()}>{<SpaceBarIcon />}</span></div>
          <div className='bottom-row'><span className='text' onClick={() => handleDel()}>{<BackspaceIcon />}</span></div>
        </div>
      </div>
    </div>
  )
}

export default App
