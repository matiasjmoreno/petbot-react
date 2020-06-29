import React from 'react';
import './catItem.css';
import catAvatar from '../../../assets/images/gato.png';

const CatItem = ({ text }) => {
	return (
		<div className='cat-item-container'>
			<img src={catAvatar} alt='' />
			<div className='cat-item-message'>
				{text.map((t, index) => (
					<label key={index}>{t}</label>
				))}
			</div>
		</div>
	);
};
export default CatItem;
