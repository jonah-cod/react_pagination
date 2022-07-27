import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'


  
function App() {

  const [page, setpage] = useState(1)
  const [rowcount, setrowcount] = useState(10)
  const [products, setproducts] = useState(null)
  const handlePrevious = ()=>{
    if (page===1) {
      return page
    }
    setpage(page-1)
  }

  const handleNext = ()=>{
    setpage(page+1)
  }

  useEffect(() => {
    setproducts(null)
    axios.post('http://localhost:5000/products', {page, rows:rowcount}).then(res=>{
      setproducts(res.data)
    })
    
  }, [page, rowcount])

  return (
    <div className="App">
      <div className="pages">
        <span onClick={handlePrevious}>previous</span>
        <span>{page} of pages</span>
        <span onClick={handleNext}>next</span>


        <input type="number" id='rowcount' value={rowcount} onChange={e=>setrowcount(e.currentTarget.value)}/>
        <label htmlFor="rowcount">No. of Rows</label>
      </div>
      {products? products.map(product=>(<div className="content">
        <span>{product.product_id}</span>
        <span>{product.product_name}</span>
        <span>{product.list_price}</span>
      </div>)):' Loading...'}
    </div>
  );
}

export default App;
