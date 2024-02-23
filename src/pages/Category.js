import React, { useEffect, useContext, useState } from 'react'
import './Category.css'
import Table from 'react-bootstrap/Table';
import img2 from '../images/image 269.jpg'
import img3 from '../images/image 270.jpg'
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context'
import img1 from '../images/image 213.jpg'
import Swal from 'sweetalert2';

export default function Category() {
  const { contextData, setContextData } = useContext(LoginContext)
  const navigate = useNavigate('')
  // console.log('category', contextData);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadDetails()
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
      // console.log('error page redirect');
    }
    else {
      console.log("user verify");
      setContextData(data)
      navigate('/categories')
    }
  }

  const loadDetails = async () => {
    let token = localStorage.getItem('token')
    let result = await fetch('http://localhost:5000/getCategoryData', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    result = await result.json()
    if (result.status === 201) {
      setCategories(result.msg)
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

    const confirmDelete = async (id) => {
      let result = await fetch('http://localhost:5000/categoryDelete/' + id, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      result = await result.json()
      if (result.status === 201) {
        // console.log('record deleted');
        loadDetails()
        setTimeout(()=>Swal.fire({
          title: "Deleted!",
          text: "Your Record has been deleted.",
          icon: "success",
          timer: 1500
        }),200);
      }
    }
    // let msg = window.confirm('Do you want to Delete?')
    // if (msg) {
    //   let result = await fetch('http://localhost:5000/categoryDelete/' + id, {
    //     method: "Delete",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": token
    //     }
    //   })
    //   result = await result.json()
    //   if (result.status === 201) {
    //     // console.log('record deleted');
    //     loadDetails()
    //   }
    // }
  }

  const searchHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let token = localStorage.getItem('token')
      let result = await fetch('http://localhost:5000/search_category/' + key, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      result = await result.json()
      if (result.status === 201) {
        // loadDetails()
        setCategories(result.msg)
      }
    } else {
      loadDetails()
    }
  }
  return (
    <>
      {
        contextData ?
          <section className='category_section'>
            <div className='category_nav'>
              <div className='product_section_head'>
                <img src={img1} />
                <h6 className='product_head'>Category</h6>
              </div>
              <div className='search_box'>
                <span className="material-symbols-outlined search_icon">
                  search
                </span>
                <input type="search" className="form-control" onChange={searchHandle} />
              </div>
              <div className='btn_wrapper'>
                <button className='search_btn1' onClick={() => navigate('/add_category')}>Add New</button>
              </div>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr style={{ background: "red" }}>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.length > 0 ? categories.map((elem, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{elem.category[0].toUpperCase() + elem.category.slice(1)}</td>
                      <td>{elem.description[0].toUpperCase() + elem.description.slice(1)}</td>
                      <td style={{ color: elem.Status === 'Active' ? 'green' : 'red' }}>{elem.Status}</td>
                      <td>
                        <Link to={`/edit_category/${elem._id}`}><img src={img3} className='edit' /></Link>
                        <img src={img2} className='delete' onClick={() => deleteProduct(elem._id)} />
                      </td>
                    </tr>
                  )
                    :
                    'No Categories Found'
                }
              </tbody>
            </Table>
          </section>
          :
          null
      }
    </>
  )
}
