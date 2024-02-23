import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function AddProduct() {
    const navigate = useNavigate('')
    const params = useParams('')
    const [inputValue, setInputValue] = useState({
        product_name: '',
        pack_size: '',
        price: ''
    })

    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('active')
    const [image, setImage] = useState('')
    const [categories, setCategories] = useState([])

    const handleInput = (e) => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    //image set
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    //Add product
    const updateProduct = async (e) => {
        e.preventDefault()
        const { product_name, pack_size, price } = inputValue
        if (product_name === '') {
            toast.error('Product Name is Required')
        } else if (pack_size === '') {
            toast.error('Pack Size is Required')
        } else if (price === '') {
            toast.error('Price is Required')
        } else if (image === "") {
            toast.error('Product Image is Required.Only .jpg,.png,.jpeg format allowed')
        } else if (category === "") {
            toast.error('Category is Required')
        } else if (status === "") {
            toast.error('Status is Required')
        } else {
            const data = new FormData()
            data.append('product_name', product_name)
            data.append('pack_size', pack_size)
            data.append('price', price)
            data.append('product_image', image)
            data.append('category', category)
            data.append('status', status)
            const datas = await fetch('http://localhost:5000/product_edit/' + params.id, {
                method: "PUT",
                body: data
            })
            const res = await datas.json()
            if (res.status === 201) {
                navigate('/products')
                setTimeout(() => {
                    // toast.success('Record Updated Sucessfully')
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Record Updated Sucessfully",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }, 500)
            }
            else {
                toast.error('Something Went Wrong')
            }

        }
    }

    useEffect(() => {
        getSingleProduct()
        getCategories()
    }, [])

    const getCategories = async () => {
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

    const getSingleProduct = async () => {
        let token = localStorage.getItem('token')
        const data = await fetch('http://localhost:5000/single_product_get/' + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        const res = await data.json()
        if (res.status === 201) {
            const { product_name, pack_size, price } = inputValue
            setInputValue({ ...inputValue, product_name: res.msg.product_name, price: res.msg.price, pack_size: res.msg.pack_size })
            setCategory(res.msg.category)
            setStatus(res.msg.Status)
            setImage(res.msg.product_image)
        }
    }
    console.log(inputValue, category, status, image);

    return (
        <section className='add_product'>
            <div className='container'>
                <div className='row m-0'>
                    <div className='col-12 mb-5 mt-4 d-flex'>
                        <span className="material-symbols-outlined arrow_icon" onClick={() => navigate('/products')}>
                            keyboard_backspace
                        </span>
                        <h6 className='head_product' onClick={() => navigate('/products')}>Edit Product</h6></div>
                    <div className='col-md-4 mb-4'>
                        <select className='form-select' onChange={handleCategory} value={category}>
                            <option value=''>Select Category</option>
                            {
                                categories.length > 0 ?
                                    categories.map((elem, index) =>
                                        <>
                                            <option value={elem.category}>{elem.category[0].toUpperCase() + elem.category.slice(1)}</option>
                                        </>
                                    ) :
                                    null
                            }
                        </select>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <input type='text' className='form-control' placeholder='Product Name' name="product_name" onChange={handleInput} value={inputValue.product_name} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <input type='text' className='form-control' placeholder='Pack Size' name="pack_size"
                            onChange={handleInput} value={inputValue.pack_size} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <input type='number' className='form-control' placeholder='MRP' name="price" onChange={handleInput} value={inputValue.price} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <input type='file' className='form-control' placeholder='Product Image' name="product_image" onChange={handleImage} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <select className='form-select' onChange={handleStatus} value={status}>
                            <option value=''>Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className='style_btns'>
                    <button className='cancel_btn1' onClick={() => navigate('/products')}>Cancel</button>
                    <button className='save_btn1' onClick={(e) => updateProduct(e)}>Edit</button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    )
}
