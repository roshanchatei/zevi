import {AppBar, Box, Drawer, Hidden, IconButton, TextField} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import AllFilters from "@/components/AllFilters";

const Index = (props: any) => {
    const { search, setSearch, mainRef, filter, setFilter } = props;

    //Drawer Helper State
    const [mobOpen, setMobOpen] = useState(false);
    const handleMobDrawer = () => {
        setMobOpen(!mobOpen);
    };
    const drawerWidth = 300;

    return (
        <>
            <AppBar
                color={"transparent"}
                elevation={0}
                position="fixed"
                sx={{backgroundColor: '#FFF'}}
            >
                <Box p={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Hidden mdUp>
                        <IconButton onClick={handleMobDrawer}>
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
                                        <Box sx={{cursor: 'pointer'}} pt={0.5} onClick={() => setSearch('')}>
                                            <CloseIcon sx={{color: 'red'}} />
                                        </Box>
                                    )}
                                </>
                            ),
                        }}
                    />
                </Box>
            </AppBar>

            <Drawer open={mobOpen} onClose={handleMobDrawer}>
                <Box width={drawerWidth}>
                    <Box
                        width={"100%"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2,
                            pt: 4,
                            pb: 3,
                        }}
                        onClick={() => {
                            setMobOpen(false);
                        }}
                    >
                        <Box fontWeight={700} fontSize={'20px'} color={'#319EFF'}>
                            Filters
                        </Box>
                        <IconButton onClick={handleMobDrawer}>
                            <CloseIcon sx={{color: 'red'}} />
                        </IconButton>
                    </Box>
                    <AllFilters mainRef={mainRef} filter={filter} setFilter={setFilter} />
                </Box>
            </Drawer>
        </>
    );
};
export default Index;
