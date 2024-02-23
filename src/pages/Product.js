import React, { useEffect, useContext, useState } from 'react'
import './Product.css'
import Table from 'react-bootstrap/Table';
import img2 from '../images/image 269.jpg'
import img3 from '../images/image 270.jpg'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context'
import { Link } from 'react-router-dom'
import img1 from '../images/image 213.jpg'
import Swal from 'sweetalert2';

export default function Product() {
  const navigate = useNavigate('')
  const [products, setProducts] = useState([])
  const { contextData, setContextData } = useContext(LoginContext)
  // console.log('product', contextData);

  useEffect(() => {
    loadProducts()
    validDashboardUser()
  }, [])

  const validDashboardUser = async () => {
    let token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/validAdminUser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.status === 401 || !data) {
      navigate('/')
      console.log('error page redirect');
    }
    else {
      console.log("user verify");
      setContextData(data)
      navigate('/products')
    }
  }

  const loadProducts = async () => {
    let token = localStorage.getItem('token')
    let result = await fetch('http://localhost:5000/getData', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    result = await result.json()
    if (result.status === 201) {
      setProducts(result.msg)
    }
  }

  const deleteProduct = (id) => {
    let token = localStorage.getItem('token')
    Swal.fire({
      title: "Delete",
      text: "Are You Sure You Want To Delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#662672",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(id)
      }
    });
  }

  const confirmDelete = async (id) => {
    let token = localStorage.getItem('token')
    let result = await fetch('http://localhost:5000/product_delete/' + id, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    result = await result.json()
    if (result.status === 201) {
      loadProducts()
      setTimeout(()=>Swal.fire({
        title: "Deleted!",
        text: "Your Record has been deleted.",
        icon: "success",
        timer: 1500
      }),200);
    }
  }

  const searchHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let token = localStorage.getItem('token')
      let result = await fetch('http://localhost:5000/search_category_product/' + key, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      result = await result.json()
      console.log(result);
      if (result.status === 201) {
        // loadDetails()
        setProducts(result.msg)
      }
    } else {
      loadProducts()
    }
  }

  return (
    <>
      {contextData ?
        <section className='product_section'>
          <div className='product_nav'>
            <div className='product_section_head'>
              <img src={img1} alt="image" />
              <h6 className='product_head'>Product</h6>
            </div>
            <div className='search_box'>
              <span className="material-symbols-outlined search_icon">
                search
              </span>
              <input type="search" className="form-control" onChange={searchHandle} />
            </div>
            <div className='btn_wrapper'>
              <button className='search_btn1' onClick={() => navigate('/add_product')}>Add New</button>
            </div>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Pack Size</th>
                <th>Category</th>
                <th>MRP</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.length > 0 ?
                  products.map((elem, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{elem.product_name[0].toUpperCase() + elem.product_name.slice(1)}</td>
                      <td>{elem.pack_size}</td>
                      <td>{elem.category[0].toUpperCase() + elem.category.slice(1)}</td>
                      <td>Rs.  {elem.price}</td>
                      <td><img src={`http://localhost:5000/uploads/${elem.product_image}`} style={{ width: '30px', height: '30px' }} /></td>
                      <td style={{ color: elem.Status === 'Inactive' ? 'red' : 'green' }}>{elem.Status}</td>
                      <td>
                        <Link to={`/edit_product/${elem._id}`}><img src={img3} className='edit' alt="Edit" /></Link>
                        <img src={img2} className='delete' alt="Delete" onClick={() => deleteProduct(elem._id)} />
                      </td>
                    </tr>
                  ) :
                  'No Products Found'
              }
            </tbody>
          </Table>
        </section>
        :
        null}
    </>
  )
}
