import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [url,setUrl] = useState()
  const [clicked, setClicked] = useState([])
  const [bestScore,setBestScore] = useState(0)
  const [names,setNames] = useState(["ditto","bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","rattata","raticate"])
  let a = names
  let b = url
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
      return urls
    } catch (error) {
      console.error('Error fetching URL', error);
    }
  }
  useEffect(()=>{
    getURL().then(result => {
      setUrl([...result])
    })
  },[])
  const shuffleArray = (array1,array2) => {
    let currentIndex = array1.length;
    let randomIndex;
    while (currentIndex!==0) {
      randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex--;
      [array1[currentIndex], array1[randomIndex]] = [array1[randomIndex], array1[currentIndex]];
      [array2[currentIndex], array2[randomIndex]] = [array2[randomIndex], array2[currentIndex]];
    }
    return [array1, array2]
  }
  const handleClick=(e) => {
    let value = ''
    if (e.target.id) {
      value = e.target.id
    }
    else {
      value = e.target.parentElement.id
    }
    if(value) {
      if(!clicked.includes(value)) {
        setClicked([...clicked, value])
        if (clicked.length===names.length-1) {
          setBestScore(names.length)
          setClicked([])
          alert('Congrats!, You have achieved maximum score')
        }
      }
      else if (clicked.includes(value)) {
        setClicked([])
        if (clicked.length>localStorage.getItem('bestScore')) {
          setBestScore(clicked.length)
          localStorage.setItem('bestScore', clicked.length)
          alert(`You have achieved new best score ${clicked.length}!`)
        }
        else {
          alert(`Your score is ${clicked.length}`)
        }
      }
    }
    [a, b] = shuffleArray(names,url)
    setNames(a)
    setUrl(b)
  }
  return (
    <>
    <h1>Memory Card Game</h1>
    <p id='description'>Don't click on a card more than once</p>
    <div id='scores'>
      <h2 id='score'>Score: {clicked.length}</h2>
      <h2 id='bestScore'>Best Score: {localStorage.getItem('bestScore')?localStorage.getItem('bestScore'):bestScore}</h2>
    </div>
    <div id='layout'>
      {names.map((name,index) => (
        <div key={name} id={name} className='card' onClick={handleClick}>
          {url?<img src={url[index]} alt={name}/>:<p>Loading...</p>}
          <p>{name.charAt(0).toUpperCase()+name.slice(1)}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
