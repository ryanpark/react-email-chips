import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
const Chips = ({ pattern, chips, placeholder, save, maxlength, title, forwardedRef }) => {
	const [newChips, setNewChips] = useState(chips);

	if (!chips || typeof chips !== 'object') {
		return null;
	}

	useEffect(() => {
		save(newChips);
	}, [newChips]);

	const getObjKeyName = (obj) => {
		if (obj && typeof obj === 'object') {
			return Object.keys(obj)[0];
		}
	};
	const removeChip = (evt, selectedChip) => {
		const key = getObjKeyName(selectedChip);
		const selectedChips = newChips.filter((chip) => chip[key] !== selectedChip[key]);
		setNewChips(selectedChips);
		evt.preventDefault();
	};

	const renderChips = (chips) => {
		if (chips?.length === 0) return;
		const renderElem = chips?.map((chip, index) => {
			const key = getObjKeyName(chip);

			return (
				<Button variant={chip.valid ? 'primary' : 'secondary'} key={index}>
					{chip[key]}

					<Badge variant='secondary' style={{ backgroundColor: 'white', color: 'black', marginLeft: '10px' }} onClick={(evt) => removeChip(evt, chip)}>
						x
					</Badge>
				</Button>
			);
		});

		return renderElem;
	};

	const updateChips = (evt) => {
		let currentVal = evt.current ? evt.current.value : evt.target.value;
		if (currentVal === '') return;

		// Todo

		setNewChips((newChips) => [...newChips, { email: currentVal, valid: pattern.test(currentVal) }]);
		forwardedRef.current.value = '';

		save(newChips);
	};
	const handleChange = (evt) => {
		if (evt.which === 13) {
			evt.preventDefault();
			updateChips(evt);
		}
	};
	const validChips = newChips?.filter((chip) => chip.valid === true);
	const memoRenderChips = useMemo(() => renderChips(newChips), [newChips]);
	return (
		<div>
			<Form.Group className='mb-3' controlId=''>
				<Form.Label style={{ display: 'block' }}>{title}</Form.Label>
				{memoRenderChips}
				<div style={{ display: 'flex' }}>
					<Form.Control type='text' style={{ display: 'inline-block', marginRight: '10px' }} placeholder={placeholder} name='sender' onKeyDown={handleChange} maxLength={maxlength} required={validChips.length === 0} ref={forwardedRef} />
					<Button onClick={() => updateChips(forwardedRef)}> Add </Button>
				</div>
			</Form.Group>
		</div>
	);
};

export default Chips;

Chips.propTypes = {
	pattern: PropTypes.object.isRequired,
	chips: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	saved: PropTypes.func,
};

Chips.defaultProps = {
	limit: 10,
	maxlength: 50,
};
