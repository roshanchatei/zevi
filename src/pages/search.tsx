//@ts-nocheck
import {Box, Grid, Hidden,} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {productDataGenerator} from "@/utils/productDataHelper";
import AllFilters from "@/components/AllFilters";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {FilterState} from "@/types/helper.model";

const Index = () => {

    const [filter, setFilter] = useState<FilterState>({
        starFilter: [],
        brandFilter: [],
        priceFilter: [0,100],
    });

    const mainRef = useRef(null);


    const [initial, setInitial] = useState([])
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setInitial(productDataGenerator());
    }, []);

    useEffect(() => {
        let _data = initial;
        if(search.length > 0){
            _data = _data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
        }
        if(filter.starFilter.length > 0){
            _data = _data.filter(e => e.rating >= filter.starFilter.sort()[0]);
        }
        if(filter.brandFilter.length > 0){
            _data = _data.filter(e => filter.brandFilter.indexOf(e.brand) > -1);
        }
        if(filter.priceFilter.length > 0){
            _data = _data.filter(e => filter.priceFilter[0] <= e.sellingPrice && e.sellingPrice <= filter.priceFilter[1]);
        }
        setData([..._data]);
    }, [filter, initial, search]);


    return (
        <>
            <Navbar search={search} setSearch={setSearch} mainRef={mainRef} filter={filter} setFilter={setFilter} />
            <Box width={'100%'} mt={10}>
                <Grid container spacing={0} height={'auto'}>
                    <Hidden mdDown>
                        <Grid item xs={0} md={2.5} height={'90vh'} overflow={'hidden'}>
                            <Box width={'100%'} overflow={'hidden'} height={'90vh'}>
                                <AllFilters mainRef={mainRef} data={data} filter={filter} setFilter={setFilter} />
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={9.5}>
                        <Box width={'100%'} ref={mainRef} height={'calc(100vh - 78px)'} overflow={'scroll'}>

                            {
                                data.length === 0 ? (
                                    <Box mt={2} width={'100%'} height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                        <img src={'/images/empty.svg'} alt={'percentage'} height={'220px'} />
                                        <Box mt={3} fontSize={'22px'}>
                                            Found Nothing!
                                        </Box>
                                    </Box>
                                ) : (
                                    <Grid container spacing={4} px={{md: 3, xs: 1}}>
                                        {
                                            data.map((each) => (
                                                <Grid id={each.id} key={each.id} item xs={6} sm={6} md={3}>
                                                    <ProductCard each={each}/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default Index;
