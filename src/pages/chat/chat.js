import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import './chat.css';
import CatItem from './catItem/catItem';
import UserItem from './userItem/userItem';
import InputChat from './imputChat/impuChat';
import Select from './Select/Select';
import { doing, aboutMe } from '../../data/Actions';

const Chat = () => {
	let idCounter = 0;

	const [msg, setMsg] = useState({});

	const [openSelect, setOpenSelect] = useState(false);

	const [chat, setChat] = useState([
		{
			id: 0,
			emitter: 'Cat',
			msg: ['¡Hola!', '¡Cómo es tu nombre?']
		}
	]);

	function firstResponse(name) {
		let newChat = {
			id: idCounter + 2,
			emitter: 'Cat',
			msg: [
				'¡Mucho gusto,' + name + '!',
				'Mi nombre es Anthun, soy aún un catbot en desarrollo',

				'Haceme una pregunta de la lista, y con gusto te respondo...'
			]
		};
		if (newChat) {
			setChat([...chat, newChat]);
		}
	}

	useEffect(() => {
		if (chat.length === 2) {
			setTimeout(() => firstResponse(msg.msg), 500);
			setMsg({ ...msg, msg: '' });
			setTimeout(() => setOpenSelect(true), 600);
		}
	}, [chat]);

	function getMessage(value) {
		idCounter = idCounter + 1;
		setMsg({
			id: idCounter,
			emitter: 'User',
			msg: value
		});
	}

	function sendMessage(e) {
		e.preventDefault();
		setChat([...chat, msg]);
	}

	let options = [
		{ id: 'What are you doing?', text: 'Qué hacés' },
		//{ id: 'Send me a meme', text: 'Mandame un meme' },
		{ id: 'Tell me about you', text: 'Contame sobre vos' }
	];

	const [interactions, setInteractions] = useState([]);
	function handleSelectedOptions(value) {
		let result;
		switch (value) {
			case 'What are you doing?':
				result = doing[Math.floor(Math.random() * doing.length)];
				if (result) {
					setInteractions([...interactions, result.msg]);
				}
				break;
			case 'Tell me about you':
				result = aboutMe[Math.floor(Math.random() * aboutMe.length)];
				if (result) {
					setInteractions([...interactions, result.msg]);
				}
				break;
			default:
				console.log('No hay valores');
		}
	}

	return (
		<div className='chatbot-chat-container'>
			<div className='chatbot-chat-content'>
				<div className='chatbot-chat'>
					<div className='chatbot-chat-container-body'>
						{chat.map((message, index) =>
							message.emitter === 'Cat' ? (
								<CatItem key={index} text={message.msg} />
							) : (
								<UserItem key={index} text={message.msg} />
							)
						)}
						{openSelect && (
							<Fade rigth>
								<Select
									handleSelectedOptions={
										handleSelectedOptions
									}
									options={options}
								/>
							</Fade>
						)}
						{interactions.length > 0 &&
							interactions.map((interactions, index) => (
								<>
									<Fade left>
										<CatItem
											key={index}
											text={interactions}
										></CatItem>
									</Fade>
									<Fade rigth>
										<Select
											key={index}
											handleSelectedOptions={
												handleSelectedOptions
											}
											options={options}
										/>
									</Fade>
								</>
							))}
					</div>
					<div className='chatbot-chat-container-input'>
						<InputChat
							chat={chat}
							msg={msg}
							getMessage={getMessage}
							sendMessage={sendMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
