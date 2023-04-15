//@ts-nocheck
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Grid,
    InputAdornment, Slider,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {brandData, starData} from "@/utils/productDataHelper";
import StarIcon from '@mui/icons-material/Star';
import {useState} from "react";
import {Product} from "@/types/product.model";
import {FilterState} from "@/types/helper.model";

const Index = (props: any) => {
    const {data, mainRef, filter, setFilter} = props

    const handleChangeFilter = (event: any, each: any, filterName: keyof FilterState) => {
        mainRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const checked = event.target.checked;
        if(checked) {
            setFilter((filter: FilterState) => {
                filter[filterName].push(each.value);
                return {...filter};
            })
        }else {
            setFilter((filter: FilterState) => {
                filter[filterName] = filter[filterName].filter((e: string | number) => e !== each.value);
                return {...filter};
            })
        }
    }

    const handleChangeFilterSlider = (event: Event, newValue: number[] ) => {
        if (newValue.length === 2) {
            setFilter((filter: FilterState) => {
                filter['priceFilter'] = [newValue[0], newValue[1]];
                return { ...filter };
            });
        }
    }
    const handleChangeSliderWithInput = (event: any, index: number) => {
        let value = Number(event.target.value);
        if (value >= 0 && value <= 100) {
            setFilter((filter: FilterState) => {
                filter['priceFilter'][index] = value || 0; // use the default value of 0 if value is falsy
                return { ...filter };
            });
        }
    };

    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <Box width={'100%'}>
                <Accordion expanded={isOpen} onChange={() => setIsOpen(!isOpen)} sx={{background: 'transparent', boxShadow: 0}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Box fontWeight={600}>
                            RATINGS
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            {
                                starData.map((each, index, pos) => (
                                    <Box mt={-1.5} key={index} display={'flex'} alignItems={'center'}>
                                        <Checkbox
                                            checked={filter.starFilter.indexOf(each.value) > -1}
                                            onChange={(event) => handleChangeFilter(event, each, 'starFilter' )}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Box display={'flex'} alignItems={'center'}>
                                            <Box>
                                                {each.value}
                                            </Box>
                                            <StarIcon fontSize={'small'} sx={{color: '#ffd337'}} />
                                            <Box ml={0.5}>
                                                & above
                                            </Box>

                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{background: 'transparent', boxShadow: 0}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Box fontWeight={600}>
                            BRANDS
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            {
                                brandData.map((each, index, pos) => (
                                    <Box mt={-1.5} key={index} display={'flex'} alignItems={'center'}>
                                        <Checkbox
                                            checked={filter.brandFilter.indexOf(each.value) > -1}
                                            onChange={(event) => handleChangeFilter(event, each, 'brandFilter' )}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <Box ml={1}>
                                            {each.label}
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{background: 'transparent', boxShadow: 0}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Box fontWeight={600}>
                            Price
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box>
                                    Min Price
                                </Box>
                                <TextField
                                    size={'small'}
                                    variant="outlined"
                                    value={filter.priceFilter[0]}
                                    onChange={(event) => {
                                        handleChangeSliderWithInput(event, 0)
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    Max Price
                                </Box>
                                <TextField
                                    size={'small'}
                                    variant="outlined"
                                    value={filter.priceFilter[1]}
                                    onChange={(event) => {
                                        handleChangeSliderWithInput(event, 1)
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={1} />

                        <Box width={'100%'} px={1}>
                            <Slider
                                value={filter.priceFilter}
                                onChange={handleChangeFilterSlider}
                                min={0}
                                max={100}
                                size={'medium'}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};
export default Index;
