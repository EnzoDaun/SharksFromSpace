// Hero.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HeroButton from "./HeroButton.jsx";
import SharkBG from '../assets/SharkBG.png';
import SpaceSharkLogo from '../assets/SpaceSharkLogo.png';

const navItems = [
  { text: 'Info', id: 'info' },
  { text: 'Analysis', id: 'analysis' },
  { text: 'About us', id: 'about-us' }
];

export default function Hero() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const heroStyle = {
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${SharkBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const handleButtonClick = () => {
        // Scroll para a próxima seção (Hub)
        const hubSection = document.querySelector('#hub-section');
        if (hubSection) {
            hubSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleNavClick = (itemId) => {
        setActiveItem(itemId);
        console.log(`Navegando para: ${itemId}`);
        
        // Scroll para a seção correspondente
        let targetSection = null;
        switch (itemId) {
            case 'info':
                // Placeholder para futura seção de informações
                break;
            case 'analysis':
                targetSection = document.querySelector('#hub-section');
                break;
            case 'about-us':
                targetSection = document.querySelector('#about-us-section');
                break;
            default:
                break;
        }
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2, color: '#fff' }}>
            Navigation
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item.id)}
                  sx={{
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: activeItem === item.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderLeft: activeItem === item.id ? '4px solid #ff3b81' : 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&:focus': {
                      outline: '2px solid #ff3b81',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      letterSpacing: 1
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
    );

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

                {/* Logo e NavBar lado a lado */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '5%', sm: '8%', md: '12%' },
                        left: { xs: '2%', sm: '4%', md: '18%' },
                        right: { xs: '2%', sm: '4%' },
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 3, md: 4 },
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                    }}
                >
                    {/* Logo maior com efeito hover */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
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

                    {/* Links de navegação ao lado da logo (desktop) */}
                    {!isMobile && (
                        <Box sx={{
                            display: 'flex',
                            gap: { sm: 2, md: 3 },
                            flexWrap: 'wrap'
                        }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    onClick={() => handleNavClick(item.id)}
                                    sx={{
                                        color: '#fff',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        letterSpacing: 1,
                                        px: { xs: 0, sm: 1 },
                                        py: 1,
                                        minWidth: 'auto',
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        backgroundColor: 'transparent',
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
                    )}
                </Box>

                {/* Menu hambúrguer (mobile) */}
                {isMobile && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: '5%', sm: '8%' },
                            right: { xs: '2%', sm: '4%' },
                            zIndex: 3,
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            sx={{
                                color: '#fff',
                                padding: { xs: '8px', sm: '12px' },
                                '&:focus': {
                                    outline: '2px solid #ff3b81',
                                    outlineOffset: '2px',
                                }
                            }}
                        >
                            <MenuIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                        </IconButton>
                    </Box>
                )}

                {/* Drawer para mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 240,
                            backgroundColor: 'rgba(0, 34, 68, 0.95)',
                            backdropFilter: 'blur(10px)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Título principal - posição original com melhor responsividade */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: '2%', sm: '4%', md: '18%' },
                        right: { xs: '2%', sm: '4%' },
                        top: { xs: '15%', sm: '18%', md: '40%' },
                        maxWidth: { xs: '96%', sm: '92%', md: 480 },
                        color: '#fff',
                        zIndex: 2,
                        padding: { xs: '0 8px', sm: '0 16px', md: 0 },
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            margin: 0,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: { xs: 0.85, sm: 0.9, md: 0.92 },
                            letterSpacing: { xs: 0.5, sm: 0.8, md: 1 },
                            fontSize: {
                                xs: '1.8rem',
                                sm: '2.5rem',
                                md: '3.5rem',
                                lg: '4.8rem'
                            },
                            whiteSpace: 'pre-line',
                            textAlign: { xs: 'left', md: 'left' },
                        }}
                    >
                        SHARKS{'\n'}FROM{'\n'}SPACE
                    </Typography>

                    <Box sx={{
                        mt: { xs: 2, sm: 2.5, md: 3 },
                        display: 'flex',
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                    }}>
                        <HeroButton onClick={handleButtonClick} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
