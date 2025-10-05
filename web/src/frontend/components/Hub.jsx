import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import HeroButton from './HeroButton.jsx';
import satelliteImg from '../assets/satellite.png';
import sharkImg from '../assets/Shark.jpg';
import usImg from '../assets/US.jpg';

const cardData = [
    {
        id: 1,
        title: 'More Info',
        subtitle: 'Why is important to analyse sharks and the ocean?',
        image: sharkImg,
        alt: 'Shark',
    },
    {
        id: 2,
        title: 'Satellite Analysis',
        subtitle: 'An detailled analisis about the ocean, sharks and their habitats',
        image: satelliteImg,
        alt: 'Satellite',
    },
    {
        id: 3,
        title: 'About US',
        subtitle: 'The team Behind the project and their pourposes',
        image: usImg,
        alt: 'US Team',
    },
];

export default function Hub() {
    const handleCardClick = (cardTitle) => {
        if (cardTitle === 'More Info') {
            const infoSection = document.querySelector('#info-section');
            if (infoSection) {
                infoSection.scrollIntoView({behavior: 'smooth'});
            }
        } else {
            console.log(`Navegando para: ${cardTitle}`);
        }
    };

    return (
        <Box id="hub-section" sx={{width: '100%', overflow: 'visible'}}>-
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: '100vh',
                    padding: {xs: 2, sm: 3},
                    paddingTop: {xs: '10%', sm: '6%'},
                    paddingBottom: {xs: '5%', sm: '3%'},
                    textAlign: 'center',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize: {
                            xs: '2rem',
                            sm: '3.5rem',
                            lg: '4rem',
                        },
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: {xs: 1, sm: 2},
                    }}
                >
                    Let's start Exploring
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 400,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        fontSize: {
                            xs: '1rem',
                            sm: '1.5rem',
                            lg: '1.8rem',
                        },
                        maxWidth: {xs: '90%', sm: '70%'},
                        lineHeight: 1.4,
                        letterSpacing: 0.5,
                        mb: {xs: 4, sm: 6},
                    }}
                >
                    Find your way throughout our website
                </Typography>

                <Grid
                    container
                    spacing={{xs: 3, sm: 4, md: 4}}
                    sx={{
                        maxWidth: '1400px',
                        width: '100%',
                        px: {xs: 1, sm: 2},
                        justifyContent: 'center',
                        mb: {xs: 3, sm: 0},
                    }}
                >
                    {cardData.map((card) => (
                        <Grid item xs={12} sm={4} md={4} key={card.id}>
                            <Card
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s ease',
                                    height: {xs: '380px', sm: '380px', md: '380px'},
                                    width: '100%',
                                    maxWidth: {xs: '350px', sm: '300px', md: '350px'},
                                    margin: '0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 40px rgba(255, 59, 129, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={card.image}
                                    alt={card.alt}
                                    sx={{
                                        objectFit: 'cover',
                                        borderRadius: '20px 20px 0 0',
                                        filter: 'brightness(0.9)',
                                        height: '150px',
                                        width: '100%',
                                        flexShrink: 0,
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: {xs: 2, sm: 2, md: 2.5},
                                        paddingBottom: '20px !important',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Box sx={{width: '100%'}}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: 'white',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                                mb: 1.5,
                                                fontSize: {xs: '1.1rem', sm: '1.2rem', md: '1.3rem'}, // Tamanho progressivo
                                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                                textAlign: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            {card.title}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.85)',
                                                lineHeight: 1.4,
                                                mb: 2,
                                                fontSize: {xs: '0.85rem', sm: '0.9rem', md: '0.95rem'}, // Tamanho progressivo
                                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                                textAlign: 'center',
                                                height: '45px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            {card.subtitle}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mt: 'auto',
                                            width: '100%',
                                        }}
                                    >
                                        <HeroButton
                                            onClick={() => handleCardClick(card.title)}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: {xs: 6, sm: 8, md: 10},
                        pt: {xs: 4, sm: 6},
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 300,
                            fontSize: {xs: '0.9rem', sm: '1rem'},
                            fontStyle: 'italic',
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <u>"Interesting Facts about Sharks:</u> Sharks have been around a very long time, scientists
                        hypothesize sharks first appeared in the ocean around 455 million years ago."
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}