import React, { useContext } from 'react'
import './Header.css'
import logo from '../images/Group.png'
import { LoginContext } from './ContextProvider/Context'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';

export default function Header() {
    const navigate = useNavigate('')
    const { contextData, setContextData } = useContext(LoginContext)
    // console.log('header', contextData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        Swal.fire({
            title: "Log Out",
            text: "Are You Sure To Log Out?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#662672",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out"
          }).then((result) => {
            if (result.isConfirmed) {
              logoutFun()
            }
          });
    };
    const logoutFun = async () => {
        const token = localStorage.getItem('token')
        console.log(token);
        const res = await fetch('http://localhost:5000/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            }
        })
        const data = await res.json()
        console.log("data",data);
        if (data.status !== 201 || !data) {
            // console.log('error');
        } else {
            console.log("user logout");
            localStorage.removeItem('token')
            setContextData(false)
            navigate('/')
        }
    }

    return (
        <>
            {
                contextData ?
                    <header>
                        <div class="container-fluid">
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="#" title="DigitalFlake">
                                    <img src={logo} alt="DigitalFlake Logo" className="header_logo" />
                                </a>
                                <div className='right_img'>
                                    {contextData.validUserOne.name ? <Avatar className='avtar_style' onClick={handleClick}>{contextData.validUserOne.name[0].toUpperCase()}</Avatar> : <span class="material-symbols-outlined" >
                                        account_circle
                                    </span>}
                                </div>
                            </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </header> :
                    null
            }
        </>
    )
}
