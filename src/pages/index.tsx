import {Box, Container, Dialog, Slide, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useEffect, useRef, useState} from "react";
import HomeDialog from "@/components/HomeDialog";


export default function Home() {

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }

    const dialogRef = useRef(null);
    const inputRef = useRef(null);

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
                            // boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.08)",
                        }}
                        variant="standard"
                        size={"medium"}
                        placeholder={"Search"}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{mr: 2}} />,
                            disableUnderline: true,
                        }}
                        onFocus={handleFocus}
                        ref={inputRef}
                    />
                </Container>
                <HomeDialog dialogRef={dialogRef} />
                {/*<Slide direction="up" in={isFocused} mountOnEnter unmountOnExit>*/}
                {/*    <HomeDialog dialogRef={dialogRef} />*/}
                {/*</Slide>*/}
            </Box>
        </>
    )
}
