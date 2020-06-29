import React from 'react';
import './userItem.css';
import womanUser from '../../../assets/images/persona.png';

const UserItem = ({ text }) => {
	return (
		<div className='user-item-container'>
			<div className='user-item-messages'>
				<label>{text}</label>
			</div>
			<img src={womanUser} alt='' />
		</div>
	);
};

export default UserItem;
