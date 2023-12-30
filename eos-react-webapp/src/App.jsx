import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Catalog from './Catalog';
import Kart from './Kart';
import CatalogList from './CatalogList';
import Payment from './Payment';
import Order from './Order';
import Profile from './Profile';
import Success from './Success';



function App() {
	return (
		<main className="App">
			<Router>
				<Routes>
					<Route path="/signup" exact element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/catalog-add" element={<Catalog />} />
					<Route path="/" element={<CatalogList />} />
					<Route path='/kart' element={<Kart/>}/>
					<Route path='/payment' element={<Payment/>}/>
					<Route path='/order' element={<Order/>}/>
					<Route path='/profile' element={<Profile/>}/>
					<Route path='/success' element={<Success/>}/>
				</Routes>
			</Router>
		</main>
	);
}

export default App;
