import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from './api/axios';
import CatalogList from './CatalogList';
import Header from './Header';
const CATALOG_URL = '/v1/catalog';
const CATALOG_IMAGE_URL = '/v1/catalog/add-image';

const Catalog = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [itemName, setItemName] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(0);
	const [image, setImage] = useState();
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let item = {
				"itemName": itemName,
				"description": description,
				"amount": amount
			}
			let formData = new FormData()
			formData.append('item_photo', image)
			let response = await axios.post(CATALOG_URL, item, null);
			console.log(response.data);
			if (response.data == -1) {
				setErrMsg('Login Failed');
				setUser('');
				setPwd('');
				throw errMsg;
			} else {
				setUser('');
				setPwd('');
				setSuccess(true);
				await axios.put(`${CATALOG_IMAGE_URL}/${response.data.id}`, formData);
				if (success) {
					navigate('/')
				}

			}
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<Header />
				<div className="col-md-12 d-flex justify-content-center aligin-item-center mt-2">
					<section>
						<p
							ref={errRef}
							className={errMsg ? 'errmsg' : 'offscreen'}
							aria-live="assertive"
						>
							{errMsg}
						</p>
						<h1>Add Item</h1>
						<form onSubmit={handleSubmit}>
							<label htmlFor="itemName ,">Name:</label>
							<input
								type="text"
								id="itemName"
								ref={userRef}
								autoComplete="off"
								onChange={(e) => setItemName(e.target.value)}
								value={itemName}
								required
							/>

							<label htmlFor="description ,">Description:</label>
							<input
								type="text"
								id="description"
								ref={userRef}
								autoComplete="off"
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								required
							/>

							<label htmlFor="amount ,">Amount:</label>
							<input
								type="number"
								id="amount"
								ref={userRef}
								autoComplete="off"
								style={{ width: '150px', height: '37px' }}
								onChange={(e) => setAmount(e.target.value)}
								value={amount}
								min={0}
								required
							/>

							<label htmlFor="image ,">Image:</label>
							<input
								type="file"
								id="image"
								ref={userRef}
								onChange={(e) => setImage(e.target.files[0])}
								required
							/>
							<button className='btn btn-outline-primary'>Add Item</button>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Catalog;
