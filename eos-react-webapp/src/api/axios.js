import axios from 'axios';

export default axios.create({
	baseURL: 'http://prod-gateway.edshopper.com:80',
});
