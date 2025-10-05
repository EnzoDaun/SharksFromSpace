// Hero.jsx
import React, { useState } from 'react';
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
  { text: 'Info', id: 'info' },
  { text: 'Analysis', id: 'analysis' },
  { text: 'About us', id: 'about-us' }
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
        // Scroll para a próxima seção (Hub)
        const hubSection = document.querySelector('#hub-section');
        if (hubSection) {
            hubSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (itemId) => {
        setActiveItem(itemId);
        console.log(`Navegando para: ${itemId}`);
    };

    return (
        <>
            {/* Hero Section */}
            <Box sx={heroStyle}>
                {/* opcional: overlay leve para garantir contraste do texto */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.06) 40%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />

                {/* Logo e NavBar - Layout específico para cada dispositivo */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '4%', sm: '20%', md: '20%', lg: '12%' }, // 20% para tablet e laptop, 12% para desktop
                        left: { xs: '4%', sm: '10%', md: '10%', lg: '18%' }, // 10% para tablet e laptop, 18% para desktop
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 4, md: 4, lg: 4 },
                        flexWrap: 'nowrap',
                    }}
                >
                    {/* Logo */}
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

                    {/* Navigation - diretamente ao lado do logo em desktop, tablet e laptop */}
                    <Box sx={{
                        display: { xs: 'none', sm: 'flex', md: 'flex' }, // Oculta no mobile
                        gap: { sm: 3, md: 3 }, // Same gap for tablet and desktop
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
                                    letterSpacing: { sm: 1, md: 1 }, // Same spacing for tablet and desktop
                                    px: { sm: 1.5, md: 1.5 }, // Same padding for tablet and desktop
                                    py: { sm: 1, md: 1 }, // Same padding for tablet and desktop
                                    minWidth: 'auto',
                                    fontSize: { sm: '1rem', md: '1rem' }, // Same font size for tablet and desktop
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

                    {/* Navigation buttons para mobile - ao lado do logo */}
                    <Box sx={{
                        display: { xs: 'flex', sm: 'none' },
                        gap: { xs: 1 },
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

                {/* Título principal - layout consistente */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: '2%', sm: '18%', md: '18%' }, // Same left position for tablet and desktop
                        right: { xs: '4%', sm: '4%' },
                        top: { xs: '22%', sm: '40%', md: '40%' }, // Same top position for tablet and desktop
                        maxWidth: { xs: '92%', sm: 480, md: 480 }, // Same maxWidth for tablet and desktop
                        color: '#fff',
                        zIndex: 2,
                        textAlign: { xs: 'center', sm: 'left', md: 'left' }, // Same alignment for tablet and desktop
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            margin: 0,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: { xs: 1, sm: 0.92, md: 0.92 }, // Same lineHeight for tablet and desktop
                            letterSpacing: { xs: 1, sm: 1, md: 1 }, // Same letterSpacing for tablet and desktop
                            fontSize: {
                                xs: '2rem',
                                sm: '3.5rem', // Same as desktop
                                md: '3.5rem',
                                lg: '4.8rem'
                            },
                            whiteSpace: { xs: 'nowrap', sm: 'pre-line', md: 'pre-line' }, // Same for tablet and desktop
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        {isMobile ? 'SHARKS FROM SPACE' : 'SHARKS\nFROM\nSPACE'}
                    </Typography>
                </Box>

                {/* Botão - posição idêntica para tablet e desktop */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: '4%', sm: '18%', md: '18%' }, // Same left position for tablet and desktop
                        right: { xs: '4%', sm: '4%' },
                        bottom: { xs: '12%', sm: 'auto', md: 'auto' },
                        top: { xs: 'auto', sm: '78%', md: '78%' }, // Same top position for tablet e desktop
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
                    }}
                >
                    <HeroButton onClick={handleButtonClick} />
                </Box>
            </Box>
        </>
    );
}