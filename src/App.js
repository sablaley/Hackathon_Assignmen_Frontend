import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function App() {
	const navigate = useNavigate('')

	useEffect(() => {
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
		} 
		else {
			navigate('/home')
		}
	}

	return (
		<div className='wrapper vh-100'>
			<Header />
			<div className='main_div'>
				<Sidebar />
				<Main />
			</div>
		</div>
	)
}

