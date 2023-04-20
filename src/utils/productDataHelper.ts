import {faker} from "@faker-js/faker";

//product data generator
const productDataGenerator = () => {
    const tempData = [];

    const brands = ['adidas', 'nike', 'nb', 'puma', 'yonex'];

    function generateRandomBrand() {
        const randomIndex = Math.floor(Math.random() * brands.length);
        return brands[randomIndex];
    }

    function generateRandomRating() {
        const rating = Math.floor(Math.random() * 50) + 1;
        return rating / 10;
    }

    for (let i = 0; i < 100 ; i++) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        const name = faker.commerce.productName();
        const sellingPrice = parseInt(faker.commerce.price(0, 100));
        const originalPrice = sellingPrice + (sellingPrice * 0.2);
        const brand = generateRandomBrand();
        const rating = generateRandomRating();
        const reviews = Math.floor(Math.random() * 900) + 100;
        const img = faker.image.abstract(480, 600, true)
        tempData.push({id, name, originalPrice, sellingPrice, brand, rating, reviews, img });
    }

   return tempData;
}

const starData = [
    // {label: '5 star', value: 5},
    {label: '4 star', value: 4},
    {label: '3 star', value: 3},
    {label: '2 star', value: 2},
    {label: '1 star', value: 1},
];

const brandData = [
    {label: 'Adidas', value: 'adidas'},
    {label: 'Nike', value: 'nike'},
    {label: 'NB', value: 'nb'},
    {label: 'Puma', value: 'puma'},
    {label: 'Yonex', value: 'yonex'},
];

export {productDataGenerator, starData, brandData};