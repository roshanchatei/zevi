import {Box, Container, TextField} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";


export default function Home() {
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
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                pt: 6,
                pb: 3,
            }}
        >
            <Container maxWidth={'md'}>
                <TextField
                    fullWidth
                    sx={{
                        background: "#FFF",
                        py: 1.3,
                        px: 2,
                        mx: {xs: 0, md: 4},
                        borderRadius: "10px",
                        boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.08)",
                    }}
                    variant="standard"
                    size={"medium"}
                    placeholder={"Search"}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{mr: 2}} />,
                        disableUnderline: true,
                    }}
                />
            </Container>

        </Box>
    </>
  )
}
