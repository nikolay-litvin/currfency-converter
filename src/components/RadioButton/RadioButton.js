import React from 'react';

//import s from './RadioButton.module.scss';

const RadioButton = ({ checked, ...props }) => {
	const getSVG = (color="#FF0000") => {
		return(
			<svg 
				width="50" 
				height="50" 
				viewBox="0 0 246 246" fill="none" 
				xmlns="http://www.w3.org/2000/svg" {...props}>
				<path 
					d="M236 123C236 185.408 185.408 236 123 236C60.5918 236 10 185.408 10 123C10 60.5918 60.5918 10 123 10C185.408 10 236 60.5918 236 123Z" 
					stroke={color} strokeWidth="10"/>
				
				{ checked ? <circle cx="123" cy="123" r="82" fill={color} /> : null }
			</svg>
		);
	}
	
	return(
		<div>
			{getSVG()}
		</div>
	);
}

export default RadioButton;