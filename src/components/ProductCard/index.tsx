import {Box, Rating, Skeleton} from "@mui/material";
import {useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const Index = (props:any) => {
    const {each} = props;

    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };

    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };


    return (
        <>
            <Box width={'100%'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Box width={'100%'} position={'relative'}>
                    {loading && <Skeleton variant="rectangular" width={'100%'} height={250} />}
                    <img
                        src={each.img}
                        alt="Picture of the author"
                        width={'100%'}
                        onLoad={handleImageLoad}
                        // height={500}
                    />
                    <Checkbox
                        sx={{
                            position: 'absolute',
                            top: 3,
                            right: 3,
                            zIndex: 10
                        }}
                        icon={<FavoriteBorder sx={{color: '#FFF'}} />} checkedIcon={<Favorite sx={{color: 'red'}} />}
                    />
                    {
                        isHovering && !loading && (
                            <Box
                                p={1} textAlign={'center'}
                                position={'absolute'} bottom={6}
                                bgcolor={'rgba(49,158,255,0.7)'} width={'100%'}
                                color={'#FFF'}
                                sx={{cursor: 'pointer'}}
                            >
                                View Product
                            </Box>
                        )
                    }
                </Box>

                <Box fontWeight={500} fontSize={'15px'} color={'#545454'} width={'100%'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                    {each.name}
                </Box>
                <Box mt={1} display={'flex'} alignItems={'center'}>
                    <Box color={'rgba(84,84,84,0.53)'} fontSize={'14px'} sx={{textDecoration: 'line-through'}}>
                        ${each.originalPrice}
                    </Box>
                    <Box ml={1} fontWeight={600} fontSize={'16px'} color={'#319EFF'}>
                        ${each.sellingPrice}
                    </Box>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <Rating size={'small'} value={each.rating} readOnly />
                    <Box fontWeight={300} fontSize={'11px'} ml={0.5}>
                        ({each.reviews})
                    </Box>
                </Box>

            </Box>
        </>
    );
};
export default Index;
