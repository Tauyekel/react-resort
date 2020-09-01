import React, {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

const getUnique = (items, value) => [...new Set(items.map(item => item[value]))];

const RoomFilter = ({rooms}) => {
	const context = useContext(RoomContext);
	const {
		handleChange,
		type,
		capacity,
		price,
		minPrice,
		maxPrice,
		minSize,
		maxSize,
		breakfast,
		pets
	} = context;

	let types = getUnique(rooms, 'type');
	types = ['all', ...types];
	types = types.map((item, index) => <option value={item} key={index}>{item}</option>);

	let people = getUnique(rooms, 'capacity');
	people = ['not selected', ...people];
	people = people.map((item, index) => <option value={item} key={index}>{item}</option>);

	return (
		<section className='filter-container'>
			<Title title='search rooms' />
			<form className='filter-form'>
				{/*select type*/}
				<div className='form-group'>
					<label htmlFor="type">room type</label>
					<select
						id='type'
						name='type'
						value={type}
						onChange={handleChange}
						className='form-control'
					>
						{types}
					</select>
				</div>
				{/*end select type*/}

				{/*guests type*/}
				<div className='form-group'>
					<label htmlFor="capacity">guests</label>
					<select
						id='capacity'
						name='capacity'
						value={capacity}
						onChange={handleChange}
						className='form-control'
					>
						{people}
					</select>
				</div>
				{/*end guests type*/}

				{/*room price*/}
				 <div className="form-group">
					 <label htmlFor="price">
						 room price ${price}
					 </label>
					 <input
						 type='range'
						 id='price'
						 name='price'
						 min={minPrice}
						 max={maxPrice}
						 value={price}
						 onChange={handleChange}
						 className='form-control'
					 />
				 </div>
				{/*end of room price*/}

				{/*size*/}
				<div className="form-group">
					<label htmlFor="size">room size</label>
					<div className="size-inputs">
						<input
							type='number'
							id='size'
							name='minSize'
							value={minSize}
							onChange={handleChange}
							className='size-input'
						/>
						<input
							type='number'
							id='size'
							name='maxSize'
							value={maxSize}
							onChange={handleChange}
							className='size-input'
						/>
					</div>
				</div>
				{/*end of size*/}

				{/*extras*/}
				<div className="form-group">
					<div className="single-extra">
						<input
							type='checkbox'
							id='breakfast'
							name='breakfast'
							checked={breakfast}
							onChange={handleChange}
						/>
						<label htmlFor="breakfast">breakfast</label>
					</div>
					<div className="single-extra">
						<input
							type='checkbox'
							id='pets'
							name='pets'
							checked={pets}
							onChange={handleChange}
						/>
						<label htmlFor="pets">pets</label>
					</div>
				</div>
				{/*end of extras*/}
			</form>
		</section>
	);
};

export default RoomFilter;
