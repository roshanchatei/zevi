import {AppBar, Box, Checkbox, Grid, Hidden, IconButton, TextField} from "@mui/material";
import {useRef, useState} from "react";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import {brandData, starData} from "@/utils/productDataHelper";

const Index = () => {

    const [filter, setFilter] = useState({
        starFilter: [],
        brandFilter: [],
        priceFilter: [0,100],
    });

    const mainRef = useRef(null);

    const [search, setSearch] = useState( '');


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
                            border: '1px solid #000'
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
                       <Grid item xs={0} md={3} height={'90vh'} overflow={'hidden'}>
                           Filter
                       </Grid>
                   </Hidden>
                   <Grid item xs={12} md={9}>
                       Products
                   </Grid>
               </Grid>
           </Box>
        </>
    );
};
export default Index;
