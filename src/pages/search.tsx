import {Box} from "@mui/material";
import {useState} from "react";


const Index = () => {

    const [search, setSearch] = useState(localStorage.getItem('search-query') || '');

    return (
        <>
           <Box>
               Search
           </Box>
        </>
    );
};
export default Index;
