import axios from 'axios';

const APPID = '25072b50a44b42eea5039cf4dfcb0164';


export default axios.create({
	baseURL: `https://openexchangerates.org/api/latest.json`,
	responseType: 'json',
	params: {
		app_id: APPID,
		
	}
});