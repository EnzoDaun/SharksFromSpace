import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import HeroButton from "./HeroButton.jsx";
import SharkBG from '../assets/SharkBG.png';
import SpaceSharkLogo from '../assets/SpaceSharkLogo.png';

const navItems = [
    {text: 'Info', id: 'info'},
    {text: 'Analysis', id: 'analysis'},
    {text: 'About us', id: 'about-us'}
];

export default function Hero() {
    const [activeItem, setActiveItem] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mudando para sm para incluir tablets pequenos

    const heroStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${SharkBG})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? '64% center' : '60% center', // Ajustando posição para desktop/tablet
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
    };

    const handleButtonClick = () => {
        const hubSection = document.querySelector('#info-section');
        if (hubSection) {
            hubSection.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleNavClick = (itemId) => {
        setActiveItem(itemId);

        if (itemId === 'info') {
            const infoSection = document.querySelector('#info-section');
            if (infoSection) {
                infoSection.scrollIntoView({behavior: 'smooth'});
            }
        } else if (itemId === 'analysis') {
            const analysisSection = document.querySelector('#satellite-analysis');
            if (analysisSection) {
                analysisSection.scrollIntoView({behavior: 'smooth'});
            }
        } else if (itemId === 'about-us') {
            const aboutUsSection = document.querySelector('#about-us');
            if (aboutUsSection) {
                aboutUsSection.scrollIntoView({behavior: 'smooth'});
            }
        }
    };

    return (
        <>
            <Box sx={heroStyle}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.06) 40%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: {xs: '4%', sm: '20%', md: '20%', lg: '20%'},
                        left: {xs: '4%', sm: '10%', md: '10%', lg: '18%'},
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: {xs: 2, sm: 4, md: 4, lg: 4},
                        flexWrap: 'nowrap',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            flexShrink: 0,
                            '&:hover': {
                                transform: 'scale(1.6)',
                                filter: 'brightness(1.2) contrast(1.1)',
                                '& img': {
                                    filter: 'drop-shadow(0 4px 8px rgba(255, 59, 129, 0.3))',
                                }
                            }
                        }}
                    >
                        <img
                            src={SpaceSharkLogo}
                            alt="Space Shark Logo"
                            style={{
                                width: '60px',
                                height: '60px',
                                transition: 'filter 0.3s ease',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    <Box sx={{
                        display: {xs: 'none', sm: 'flex', md: 'flex'},
                        gap: {sm: 3, md: 3},
                        alignItems: 'center',
                        flexShrink: 0,
                    }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                onClick={() => handleNavClick(item.id)}
                                sx={{
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    letterSpacing: {sm: 1, md: 1},
                                    px: {sm: 1.5, md: 1.5},
                                    py: {sm: 1, md: 1},
                                    minWidth: 'auto',
                                    fontSize: {sm: '1rem', md: '1rem'},
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    backgroundColor: 'transparent',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#ff3b81',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:focus': {
                                        outline: '2px solid #ff3b81',
                                        outlineOffset: '2px',
                                    },
                                    ...(activeItem === item.id && {
                                        color: '#ff3b81',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '0',
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: '#ff3b81',
                                            borderRadius: '1px',
                                        }
                                    })
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{
                        display: {xs: 'flex', sm: 'none'},
                        gap: {xs: 1},
                        alignItems: 'center',
                        flexShrink: 0,
                    }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                onClick={() => handleNavClick(item.id)}
                                sx={{
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                    px: 0.8,
                                    py: 0.8,
                                    minWidth: 'auto',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    backgroundColor: 'transparent',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#ff3b81',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:focus': {
                                        outline: '2px solid #ff3b81',
                                        outlineOffset: '2px',
                                    },
                                    ...(activeItem === item.id && {
                                        color: '#ff3b81',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '0',
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: '#ff3b81',
                                            borderRadius: '1px',
                                        }
                                    })
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        left: {xs: '2%', sm: '18%', md: '18%'},
                        right: {xs: '4%', sm: '4%'},
                        top: {xs: '22%', sm: '40%', md: '40%'},
                        maxWidth: {xs: '92%', sm: 480, md: 480},
                        color: '#fff',
                        zIndex: 2,
                        textAlign: {xs: 'center', sm: 'left', md: 'left'},
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            margin: 0,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: {xs: 1, sm: 0.92, md: 0.92},
                            letterSpacing: {xs: 1, sm: 1, md: 1},
                            fontSize: {
                                xs: '2rem',
                                sm: '3.5rem',
                                md: '3.5rem',
                                lg: '4.8rem'
                            },
                            whiteSpace: {xs: 'nowrap', sm: 'pre-line', md: 'pre-line'},
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        {isMobile ? 'SHARKS FROM SPACE' : 'SHARKS\nFROM\nSPACE'}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        left: {xs: '4%', sm: '18%', md: '18%'},
                        right: {xs: '4%', sm: '4%'},
                        bottom: {xs: '12%', sm: 'auto', md: 'auto'},
                        top: {xs: 'auto', sm: '78%', md: '78%'},
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: {xs: 'center', sm: 'flex-start', md: 'flex-start'},
                    }}
                >
                    <HeroButton onClick={handleButtonClick}/>
                </Box>
            </Box>
        </>
    );
}