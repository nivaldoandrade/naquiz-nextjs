import axios from 'axios';

export const opentdb = axios.create({
	baseURL: 'https://opentdb.com/'
})