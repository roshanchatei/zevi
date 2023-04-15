//@ts-nocheck
import {Box, Container, Dialog, Slide, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useEffect, useRef, useState} from "react";
import HomeDialog from "@/components/HomeDialog";
import {useRouter} from "next/router";


export default function Home() {

    const Router = useRouter();

    //state to know if the search field is focused
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    }

    const dialogRef = useRef(null);

    const inputRef = useRef(null);
    const [search, setSearch] = useState('');

    //helper to hide the dialog when we click outside inputRef & dialogRef
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setIsFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dialogRef]);

    // useEffect(() => {
    //     if (isFocused && inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, [isFocused]);

    const handleSearch = async () => {
        await Router.push('/search')
    }

    return (
        <>
            <Box
                width={"100%"}
                height={'100vh'}
                sx={{
                    background: `url('/images/home-bg.jpg')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    px: 2,
                    pt: 6,
                    pb: 3,
                }}
            >
                <Container maxWidth={'md'} sx={{mx: {xs: 0, md: 4}, mt: 8}}>
                    <TextField
                        fullWidth
                        sx={{
                            background: "#FFF",
                            py: 1.3,
                            px: 2,
                            borderRadius: "10px",
                        }}
                        variant="standard"
                        size={"medium"}
                        placeholder={"Search"}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <>
                                    {search.length > 0 && (
                                        <Box pt={0.3} sx={{cursor: 'pointer'}} onClick={handleSearch}>
                                            <SearchIcon />
                                        </Box>
                                    )}
                                </>
                            ),
                        }}
                        onFocus={handleFocus}
                        ref={inputRef}
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </Container>
                <Slide direction="up" in={isFocused} mountOnEnter unmountOnExit>
                    <Box
                        ref={dialogRef}
                        mt={3}
                        width={{md: '80%', xs: '100%'}}
                        bgcolor={"#FFF"}
                        borderRadius={'6px'}
                        p={4}
                        boxShadow={'5px 20px 31px rgba(0, 0, 0, 0.2)'}
                    >
                        <HomeDialog setSearch={setSearch} />
                    </Box>
                </Slide>
            </Box>
        </>
    )
}
