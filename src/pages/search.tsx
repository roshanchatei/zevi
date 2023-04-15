import {AppBar, Box, Checkbox, Grid, Hidden, IconButton, Skeleton, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import {brandData, productDataGenerator, starData} from "@/utils/productDataHelper";
import AllFilters from "@/components/AllFilters";

const Index = () => {

    const [filter, setFilter] = useState({
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
            <AppBar
                color={"transparent"}
                elevation={0}
                position="fixed"
            >
                <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Hidden mdUp>
                        <IconButton>
                            <TuneIcon />
                        </IconButton>
                        <Box mr={2} />
                    </Hidden>
                    <TextField
                        sx={{
                            background: "#FFF",
                            py: 1,
                            px: 2,
                            borderRadius: "10px",
                            width: { lg: "500px", md: "500px", xs: "100%" },
                            boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.08)",
                            border: '0.3px solid #000'
                        }}
                        variant="standard"
                        size={"small"}
                        placeholder={"Search"}
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{mr: 2}} />,
                            disableUnderline: true,
                            endAdornment: (
                                <>
                                    {search.length > 0 && (
                                        <Box pt={0.5} onClick={() => setSearch('')}>
                                            <CloseIcon sx={{color: 'red'}} />
                                        </Box>
                                    )}
                                </>
                            ),
                        }}
                    />
                </Box>
            </AppBar>
           <Box width={'100%'} mt={10}>
               <Grid container spacing={0} height={'auto'}>
                   <Hidden mdDown>
                       <Grid item xs={0} md={2.5} height={'90vh'} overflow={'hidden'}>
                           <AllFilters mainRef={mainRef} filter={filter} setFilter={setFilter} />
                       </Grid>
                   </Hidden>
                   <Grid item xs={12} md={9.5}>
                       <Box width={'100%'} ref={mainRef}>
                           <Grid container spacing={2}>
                               {
                                   data.map((each) => (
                                       <Grid key={each.id} item xs={12} sm={6} md={4}>
                                           <Box bgcolor={'#e5e5e5'} width={'100%'} borderRadius={'15px'} overflow={'hidden'}>
                                               {/*{loading && <Skeleton variant="rectangular" width={'100%'} height={283} />}*/}
                                               <img src={each.img} alt={each.brand} width={'100%'} />
                                               <Box p={2}>
                                                   <h4>{each.name}</h4>
                                                   <p>Price: ${each.sellingPrice}</p>
                                                   <p>Brand: {each.brand}</p>
                                                   <p>Rating: {each.rating}</p>
                                               </Box>

                                               {/*<p>Rating: {product.rating}</p>*/}
                                           </Box>
                                       </Grid>
                                   ))
                               }
                           </Grid>
                       </Box>
                   </Grid>
               </Grid>
           </Box>
        </>
    );
};
export default Index;
