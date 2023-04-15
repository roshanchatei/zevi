//@ts-nocheck
import {Box, Grid, Hidden, Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";

const Index = (props: any) => {
    const { setSearch } = props;

    //demo products
    const [products, setProducts] = useState([] as Array<object>);
    const [loading, setLoading] = useState(true);

    //generating products data using faker api
    useEffect(() => {
        const tempData : Array<object> = [];

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

    //dummy popular data
    const popular = [
        'Nature',
        'Wildlife',
        'Abstract',
        'Business',
        'Solid'
    ]

    return (
        <>
            <Hidden mdDown>
                <Box mb={1} fontSize={'18px'} fontWeight={600}>
                    Latest Trends
                </Box>
                {
                    products.length > 0 && (
                        <Grid container spacing={3} mb={3}>
                            {
                                products.map((each, index) => (
                                    <Grid key={index} item xs={2.4} sx={{cursor: 'pointer'}}>
                                        {loading && <Skeleton variant="rectangular" width={'100%'} height={200} />}
                                        <img
                                            src={each?.img}
                                            alt="picture"
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
            </Hidden>
            <Box fontSize={'18px'} fontWeight={600}>
                Popular Suggestions
            </Box>
            <Box mt={1}>
                {
                    products.length > 0 && (
                        <>
                            {
                                popular.map((each, index) => (
                                    <Box
                                        mb={0.3} key={index} fontSize={'14px'} color={'#545454'}
                                        sx={{
                                            "&:hover": {
                                                color: '#000'
                                            },
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setSearch(each.toLowerCase())}
                                    >
                                        {each}
                                    </Box>
                                ))
                            }
                        </>
                    )
                }
            </Box>
        </>
    );
};
export default Index;
