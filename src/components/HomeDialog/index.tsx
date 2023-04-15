import {Box, Grid, Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

const Index = ({dialogRef}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tempData = [];

        for (let i = 0; i < 5 ; i++) {
            const name = faker.commerce.productName();
            const img = faker.image.abstract(480, 600, true)
            tempData.push({name, img });
        }

        setProducts(tempData);

    }, []);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <Box
                ref={dialogRef}
                mt={3}
                width={{md: '80%', xs: '100%'}}
                bgcolor={"#FFF"}
                borderRadius={'6px'}
                p={4}
                boxShadow={'5px 20px 31px rgba(0, 0, 0, 0.2)'}
            >
                <Box mb={1} fontSize={'18px'} fontWeight={600}>
                    Latest Trends
                </Box>
                {
                    products.length > 0 && (
                        <Grid container spacing={3} >
                            {
                                products.map((each, index) => (
                                    <Grid key={index} item xs={2.4} sx={{cursor: 'pointer'}}>
                                        {loading && <Skeleton variant="rectangular" width={'100%'} height={200} />}
                                        <img
                                            src={each?.img}
                                            alt="Picture of the author"
                                            width={'100%'}
                                            onLoad={handleImageLoad}
                                            // height={500}
                                        />
                                        <Box fontSize={'14px'} color={'#545454'} width={'100%'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                                            {each.name}
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                }
                <Box mt={3} fontSize={'18px'} fontWeight={600}>
                    Popular Suggestions
                </Box>
                <Box mt={1}>
                    {
                        products.length > 0 && (
                            <>
                                {
                                    products.map((each, index) => (
                                        <Box
                                            mb={0.3} key={index} fontSize={'14px'} color={'#545454'}
                                            sx={{
                                                "&:hover": {
                                                    color: '#000'
                                                },
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {faker.commerce.productName()}
                                        </Box>
                                    ))
                                }
                            </>
                        )
                    }
                </Box>

            </Box>
        </>
    );
};
export default Index;
