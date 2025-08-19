import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let url = []
  const [score, setScore]=useState(0)
  const [clicked, setClicked] = useState([])
  const [bestScore,setBestScore] = useState(0)
  const names = ["ditto","bulbasaur","ivysaur"]
  async function fetchData(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json(); 
      return data.sprites.front_default
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function getURL () {
    try {
      const urls = await Promise.all(
        names.map((name)=> fetchData(name))
      )
      for (let i=0; i<urls.length; i++) {
        if(!document.querySelector(`#${names[i]}`)) {
          const divElement = document.createElement('div')
          divElement.className = 'cards'
          divElement.id = names[i]
          const image = document.createElement('img')
          image.src = urls[i]
          const label = document.createElement('p')
          label.textContent = names[i]
          divElement.append(image,label)
          document.querySelector('#layout').appendChild(divElement)
        }
      }
    } catch (error) {
      console.log('failed to get url')
    }
  }
  const handleClick=(e) => {
    console.log(e.target.id)
  }
  const game = async() => {
    await getURL();
    const elements = document.querySelectorAll('.cards')
    elements.forEach(element => {
      element.addEventListener('click',(e)=> {
        if (e.target.id) {
          if (!clicked.includes(e.target.id)) {
            setClicked([...clicked, e.target.id])
          }
        }
        else {
          if (!clicked.includes(e.target.parentElement.id)) {
            setClicked([...clicked, e.target.parentElement.id])
          }
          let value = e.target.parentElement.id
        }
        if (!clicked.includes(e.target.id) || !clicked.includes(e.target.parentElement.id)) {
          setClicked([...clicked, value])
        }
      })
    })
    // console.log(clicked)
    // document.querySelectorAll('.cards').addEventListener('click',(e)=>console.log(e.target.id))
  }
  
  useEffect(()=>{game()})
  console.log(clicked)
  // const elements = document.querySelectorAll('.cards')
  // elements.forEach(element => {
  //   element.addEventListener('click',(e)=> {
  //     console.log(e.target.id)
  //   })
  // })
  return (
    <>
    <h1>Memory Card Game</h1>
    <p id='description'>Don't click on a card more than once</p>
    <div id='scores'>
      <h2 id='score'>Score: {score}</h2>
      <h2 id='bestScore'>Best Score: {bestScore}</h2>
    </div>
    <div id='layout'>
    </div>
    </>
  )
}

export default App
