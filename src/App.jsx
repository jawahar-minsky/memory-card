import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let url = []
  const names = ["ditto","bulbasaur"]
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
          divElement.class = 'images'
          divElement.id = names[i]
          const image = document.createElement('img')
          image.src = urls[i]
          divElement.appendChild(image)
          document.querySelector('#cards').appendChild(divElement)
        }
      }
    } catch (error) {
      console.log('failed to get url')
    }
  }
  getURL()
  return (
    <div id='cards'>
    </div>
    
  )
}

export default App
