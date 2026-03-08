// Import images from assets folder
import kashiImage from '../assets/vaanashi.jpg';
import tirupatiImage from '../assets/gettyimages-2250108138-612x612.jpg';
import goldenImage from '../assets/golden-temple.jpg';

export const temples = [
{
id: 1,
name: "Kashi Vishwanath Temple",
location: "Varanasi, Uttar Pradesh",
image: kashiImage,
rating: 4.9,
description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
openTime: "04:00 AM",
closeTime: "11:00 PM",
price: 50
},

{
id: 2,
name: "Tirumala Venkateswara Temple",
location: "Tirupati, Andhra Pradesh",
image: tirupatiImage,
rating: 4.9,
description: "Also known as Tirupati Balaji.",
openTime: "06:00 AM",
closeTime: "09:00 PM",
price: 100
},

{
id: 3,
name: "Golden Temple",
location: "Amritsar, Punjab",
image: goldenImage,
rating: 4.9,
description: "The holiest Gurdwara in Sikhism.",
openTime: "04:00 AM",
closeTime: "11:00 PM",
price: 0
}
]

