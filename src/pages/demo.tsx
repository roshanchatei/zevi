import {Box, Button} from '@mui/material'
import {useEffect, useState} from "react";


const Index = () => {

    const PAGE_SIZE = 10

    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0)
    const [products, setProducts] = useState([]);

    // const [width, setWidth] = useState(0);
    // useEffect(() => {
    //     setWidth(window.innerWidth);
    // }, []);


    const getData = async () => {
        setLoading(true)
        try{
            const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
            const newProducts = await response.json();
            setProducts((prevProducts) => [...prevProducts, ...newProducts.products]);
            setSkip((prevSkip) => prevSkip + 10);
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const handleLoadMore = () => {
        setLoading(true)
    }

    useEffect(()=> {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight && !loading) {
                setLoading(true)
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if(loading)
            getData();
    }, [loading])


    return (
        <>
            <Box p={4}>

                {
                    products.length > 0 && (
                        <>
                            {
                                products.map((each) => (
                                    <Box key={each.id} mb={2}>
                                        <Box>
                                            {each?.title}
                                        </Box>
                                        <Box>
                                            {each?.price}
                                        </Box>
                                    </Box>
                                ))
                            }
                        </>
                    )
                }

                {loading && <div>Loading...</div>}

            </Box>
        </>
    )
};

export default Index;