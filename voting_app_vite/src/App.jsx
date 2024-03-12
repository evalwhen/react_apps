import { useState } from 'react'
import productImage from './assets/image-rose.png'
import avatar from './assets/avatars/elyse.png'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Product></Product>
    </>
  );
}

function Product() {
  return (
    <>
      <div className='w-[175px]'>
        <img src={productImage} alt="" />
      </div>
      <div>
        <span>\f0d8</span>
        <div>45</div>
      </div>
      <p>Haught or Naught</p>
      <p>High-minded or absent-minded? You decide.</p>
      <div>
        <p>Submitted by:</p>
        <div><img src={avatar} alt="" className='w-10 h-10' /></div>
      </div>
    </>
  );
}

export default App
