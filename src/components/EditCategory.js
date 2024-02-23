import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function EditCategory() {
    const navigate = useNavigate('')
    const params = useParams('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        getSingleCategory()
    }, [])

    const updateData = async (e) => {
        e.preventDefault()
        if (category === "") {
            toast.error('Category is Required')
        } else if (description === "") {
            toast.error('Description is Required')
        } else if (status === "") {
            toast.error('Status is Required')
        } else {
            updateCategory()
        }
    }

    const updateCategory = async () => {
        let token = localStorage.getItem('token')
        let res = await fetch('http://localhost:5000/category_edit/' + params.id, {
            method: "PUT",
            body: JSON.stringify({ category, status, description }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        res = await res.json()
        if (res.status === 201) {
            navigate('/categories')
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
        } else {
            toast.error('something went wrong')
        }
    }

    const getSingleCategory = async () => {
        let token = localStorage.getItem('token')
        let res = await fetch('http://localhost:5000/single_category_get/' + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        res = await res.json()
        if (res.status === 201) {
            setCategory(res.msg.category)
            setDescription(res.msg.description)
            setStatus(res.msg.Status)
        }
    }

    return (
        <section className='add_category'>
            <div className='container'>
                <div className='row m-0'>
                    <div className='col-12 mb-5 mt-4 d-flex'>
                        <span className="material-symbols-outlined arrow_icon" onClick={() => navigate('/categories')}>
                            keyboard_backspace
                        </span>
                        <h6 className='head_product' onClick={() => navigate('/categories')}>Edit Category</h6></div>
                    <div className='col-md-4 mb-4'>
                        <input type='text' className='form-control' placeholder='Category Name' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <input type='text' className='form-control' placeholder='Description'
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='col-md-4 mb-4'>
                        <select className='form-select' value={status} onChange={(e) => setStatus(e.target.value)} >
                            <option>Enter Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className='style_btns'>
                    <button className='cancel_btn1' onClick={() => navigate('/categories')}>Cancel</button>
                    <button className='save_btn1' onClick={(e) => updateData(e)}>Edit</button>
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
