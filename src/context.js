import React, {Component} from 'react';
import items from './data';

export const RoomContext = React.createContext();

export class RoomProvider extends Component {
	state = {
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
		type: 'all',
		capacity: 'not selected',
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false
	};

	componentDidMount() {
		let rooms = RoomProvider.formatData(items);
		// console.log(rooms);

		let featuredRooms = rooms.filter(room => room.featured);

		let minPrice = Math.min(...rooms.map(item => item.price));
		let maxPrice = Math.max(...rooms.map(item => item.price));

		let minSize = Math.min(...rooms.map(item => item.size));
		let maxSize = Math.max(...rooms.map(item => item.size));

		this.setState({
			rooms,
			featuredRooms,
			sortedRooms: rooms,
			loading: false,
			price: maxPrice,
			minPrice,
			maxPrice,
			minSize,
			maxSize
		})
	}

	static formatData(items) {
		return items.map(item => {
			let id = item.sys.id;
			let images = item.fields.images.map(image => image.fields.file.url);

			return {...item.fields, images, id}
		})
	}

	getRoom = (slug) => {
		const tempRooms = [...this.state.rooms];

		return tempRooms.find(room => room.slug === slug)
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		}, this.filterRooms)
	};

	filterRooms = () => {
		const {
			rooms,
			type,
			capacity,
			price,
			minSize,
			maxSize,
			breakfast,
			pets
		} = this.state;

		let tempRooms = [...rooms];

		if (type !== 'all') tempRooms = tempRooms.filter(room => room.type === type);

		if (capacity !== 'not selected') tempRooms = tempRooms.filter(room => room.capacity === +capacity);

		tempRooms = tempRooms.filter(room => room.price <= price);

		tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

		if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast);

		if (pets) tempRooms = tempRooms.filter(room => room.pets);

		this.setState({
			sortedRooms: tempRooms
		})
	};

	render() {
		return (
			<RoomContext.Provider
				value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}
			>
				{this.props.children}
			</RoomContext.Provider>
		);
	}
}

export const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<RoomConsumer>
				{value => <Component {...props} context={value} />}
			</RoomConsumer>
		)
	}
}

