import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Category from '../pages/Category'
import Product from '../pages/Product'
import AddCategory from './AddCategory'
import AddProduct from './AddProduct'
import Login from './Login'
import Error from './Error'
import EditProduct from './EditProduct'
import EditCategory from './EditCategory'

export default function Main() {
  return (
    <div className='right_div'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/categories' element={<Category />}></Route>
        <Route path='/products' element={<Product />}></Route>
        <Route path='/add_category' element={<AddCategory/>}></Route>
        <Route path='/edit_category/:id' element={<EditCategory/>}/>
        <Route path='/add_product' element={<AddProduct />}/>
        <Route path='/edit_product/:id' element={<EditProduct/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  )
}
