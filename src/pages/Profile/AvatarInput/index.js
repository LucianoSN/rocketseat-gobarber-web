import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

const AvatarInput = () => {
	const { defaultValue, registerField } = useField('avatar');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);

	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'avatar_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref, registerField]);

	const handleChange = async evt => {
		const data = new FormData();
		data.append('file', evt.target.files[0]);

		const response = await api.post('files', data);
		const { id, url } = response.data;

		setFile(id);
		setPreview(url);
	};

	return (
		<Container>
			<label for="avatar">
				<img
					src={
						preview ||
						'https://api.adorable.io/avatars/50/abott@adorable.png'
					}
					alt=""
				/>

				<input
					type="file"
					name="avatar"
					id="avatar"
					accept="image/*"
					data-file={file}
					onChange={handleChange}
					ref={ref}
				/>
			</label>
		</Container>
	);
};

export default AvatarInput;
