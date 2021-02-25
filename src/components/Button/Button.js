import React, { useState, useEffect } from 'react';
import openexchange from '../../api/openexchange';

import RadioButton from '../RadioButton';

import s from './Button.module.scss';

const arr = [{checked: true},{checked: false},{checked: false},{checked: false}];
const acronym = ['UAH', 'USD', 'EUR', 'GBP']; 
const getAcronym = () => acronym.map((i, index) => {
	return <div key={index}>{i}</div>;
});

const Button = () => {
	const [button, setButton] = useState(arr);
	const [currentValue, setCurrentValue] = useState(acronym[0]);
	const [data, setData] = useState({});
	const [term, setTerm] = useState(0);


	const handlerChange = (e) => {
		let value = e.target.value
			.replace(/[^0-9.]/g, '')
			.replace(/\.{2,}/g, '.')
			.replace(/\.[0-9]+\./g, '.');	
		
		setTerm(value);
		
	};

	const evaluateValue = (currentValue) => {
		const base = data.USD;
		let rateUSD = (parseFloat(term) * base * data.USD) / (base * data.UAH);
		let rateEUR = (parseFloat(term) * base * data.EUR) / (base * data.UAH);
		let rateGBP = (parseFloat(term) * base * data.GBP) / (base * data.UAH);
		
		switch(currentValue) {
			case 'UAH' :
				return Number(term).toFixed(2) + ' UAH';
			case 'USD':
				return rateUSD.toFixed(2) + ' USD';
			case 'EUR':
				return rateEUR.toFixed(2) + ' EUR';
			case 'GBP':
				return rateGBP.toFixed(2) + ' GBP';
			default:
				return 'Hello';
		}
	};
	
	
	const fetchData = async () => {
		let responce = await openexchange.get('', {});
		
		let result = {};
		for(let key in responce.data.rates) {
			const p = responce.data.rates[key]
			if(key === 'USD' || key === 'EUR' || key === 'GBP' || key === 'UAH') { result[key] = p; }
		}

		setData(result);
		
		
		/** 
		Variant 2
		const result = Object.entries(responce.data.rates).
			filter((item) => {
				if(item[0] === 'USD' || item[0] === 'EUR' || item[0] === 'GBP' || item[0] === 'PLN') return item;
		});

		Variant 3
		let keys = Object.keys(responce.data.rates).
			filter(item => item === 'USD' || item === 'EUR' || item === 'GBP' || item === 'PLN');
				let result = keys.map(item => {
					return { [item] : responce.data.rates[item] };
				});		
		*/
	};
	
	useEffect(() => {	fetchData(); }, []); // fetchData() run only on the first render: mount

	
	
	const onClickButton = (id) => {
		let res = [...button]; //промежуточный массив
			res = res.map((item, index) => {
				item.checked = id === index;
				return item;
			}); 
		setButton(res);
		setCurrentValue(acronym[id]);
	};

	const getContent = () => {
		return arr.map((obj, index) => (
				<div onClick={() => onClickButton(index)} key={index}>
					<RadioButton checked={obj.checked} />	
				</div>
		));
	};

	const onFormSubmit = event => {
		// предотвращаем обновление при нажатии
		event.preventDefault();
	};

	return (
		<div className={s.wrapper} >
			<div className={s.box}>
				{getAcronym()}

				{getContent()}
			
			</div>
			<div className={s.box2}>
				<div>
					<form onSubmit={onFormSubmit}>
						<div>
							<label></label>
							<input 
								type="text"
								value={term}
								onChange={handlerChange}
							/>
							
						</div>
					</form>
				</div>
				<span>
					{evaluateValue(currentValue)}
				</span>

			</div>
			
		</div>

	);
}

export default Button;