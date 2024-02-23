import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';


export default function AddCategory() {
    const navigate = useNavigate('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const saveData = async (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        if (category === "") {
            toast.error('Category is Required')
        } else if (description === "") {
            toast.error('Description is Required')
        } else if (status === "") {
            toast.error('Status is Required')
        } else {
            let res = await fetch('http://localhost:5000/add_category', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ category, description, status })
            })
            res = await res.json()
            if (res.status === 201) {
                setCategory('')
                setDescription('')
                setStatus('')
                navigate('/categories')
                setTimeout(() => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Record Added Sucessfully",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }, 500)
            }
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
                        <span className='head_product' onClick={() => navigate('/categories')}>Add Category</span></div>
                    <div className='col-md-4  mb-4'>
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
                    <button className='save_btn1' onClick={(e) => saveData(e)}>Save</button>
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
