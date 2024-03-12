import { useState } from 'react'
import productImage from './assets/image-rose.png'
import avatar from './assets/avatars/elyse.png'

// import './App.css'

  const products = [
    {
      id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '#',
      votes: 24,
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    },
    {
      id: 2,
      title: 'Supermajority: The Fantasy Congress League',
      description: 'Earn points when your favorite politicians pass legislation.',
      url: '#',
      votes: 35,
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
    },
    {
      id: 3,
      title: 'Tinfoild: Tailored tinfoil hats',
      description: 'We already have your measurements and shipping address.',
      url: '#',
      votes: 30,
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
    },
    {
      id: 4,
      title: 'Haught or Naught',
      description: 'High-minded or absent-minded? You decide.',
      url: '#',
      votes: 29,
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
    },
  ];

function App() {

  return (
    <>
      <ProductList></ProductList>
    </>
  );
}

function Product(props) {
  return (
    <>
      <div className='flex mb-4 w-full'>
        <div className="w-[175px] mr-4">
          <img src={productImage} alt="" />
        </div>
        <div  className='flex flex-col justify-center'>
          <div className='flex mb-2'>
            <a className='mr-2 cursor-pointer text-xl text-orange-600'>^</a>
            <div className='font-semibold text-xl'>{props.votes}</div>
          </div>
          <a className='cursor-pointer text-blue-500'>{props.title}</a>
          <p>{props.description}</p>
          <div className='flex items-center mt-2'>
            <p className='mr-2 text-gray-400'>Submitted by:</p>
            <div className=''>
              <img src={avatar} alt="" className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductList() {
  const [prods, setProds] = useState(products);

  const productComps = prods.map((product) => (
    <Product
      key={"product-" + product.id}
      id={product.id}
      votes={product.votes}
      title={product.title}
      description={product.description}
    />
  ));
  console.log(products);
  return (
    <>
      <div className="w-3/5 mx-auto">
        <div className="text-center text-3xl mt-6 border-b mb-10">
          <p>Popular Products</p>
        </div>

        <div className="">
          {productComps}
        </div>
      </div>
    </>
  );
}
export default App;
