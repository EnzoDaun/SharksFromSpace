import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import phytoImg from '../assets/phyto.jpg';
import sharkReefImg from '../assets/sharkreef.jpeg';
import sharkImg from '../assets/Shark.jpg';

const sections = [
    {
        id: 1,
        title: 'Correlation Between Sharks, Phytoplankton and Temperature',
        image: phytoImg,
        alt: 'Phytoplankton',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 2,
        title: 'Importance of Sharks and Why We Should Preserve Them',
        image: sharkReefImg,
        alt: 'Shark Reef',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        id: 3,
        title: 'Data-Based Regulation',
        image: sharkImg,
        alt: 'Shark',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

export default function MoreInfo() {
    return (
        <Box
            id="info-section"
            sx={{
                minHeight: '100vh',
                py: {xs: 4, sm: 6, md: 8},
                position: 'relative',
            }}
        >
            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1}}>
                <Box sx={{textAlign: 'center', mb: {xs: 4, sm: 6, md: 8}}}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem'},
                            mb: 2,
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        Shark Conservation
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 300,
                            fontSize: {xs: '1rem', sm: '1.2rem', md: '1.3rem'},
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        Understanding the crucial role of sharks in marine ecosystems
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {sections.map((section, index) => {
                        const isImageLeft = index % 2 === 0;

                        return (
                            <Grid item xs={12} key={section.id}>
                                <Card
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(15px)',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s ease',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                                            border: '1px solid rgba(255, 255, 255, 0.25)',
                                            background: 'rgba(255, 255, 255, 0.12)',
                                        },
                                    }}
                                >
                                    <Box sx={{display: {xs: 'block', md: 'none'}}}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                height: '280px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={section.image}
                                                alt={section.alt}
                                                sx={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': {
                                                        filter: 'brightness(1) contrast(1.2) saturate(1.2)',
                                                        transform: 'scale(1.02)',
                                                    },
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '30%',
                                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                                    zIndex: 2,
                                                }}
                                            />
                                        </Box>

                                        <CardContent
                                            sx={{
                                                p: 3,
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 100%)',
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                component="h3"
                                                sx={{
                                                    color: '#fff',
                                                    fontWeight: 700,
                                                    fontSize: '1.3rem',
                                                    mb: 2,
                                                    lineHeight: 1.3,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 1,
                                                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {section.title}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.95)',
                                                    fontSize: '0.95rem',
                                                    lineHeight: 1.7,
                                                    textAlign: 'justify',
                                                    fontWeight: 400,
                                                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                                                    mb: 2,
                                                }}
                                            >
                                                {section.content}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    width: '80px',
                                                    height: '4px',
                                                    background: 'linear-gradient(45deg, #58c8da, #fff)',
                                                    borderRadius: '2px',
                                                    mx: 'auto',
                                                    boxShadow: '0 2px 8px rgba(88, 200, 218, 0.4)',
                                                }}
                                            />
                                        </CardContent>
                                    </Box>

                                    <Box sx={{display: {xs: 'none', md: 'flex'}, height: '400px'}}>
                                        {isImageLeft ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        width: '50%',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        image={section.image}
                                                        alt={section.alt}
                                                        sx={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                                                            transition: 'all 0.4s ease',
                                                            '&:hover': {
                                                                filter: 'brightness(1) contrast(1.2) saturate(1.2)',
                                                                transform: 'scale(1.02)',
                                                            },
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: '30%',
                                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                                            zIndex: 2,
                                                        }}
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        width: '50%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        p: 4,
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 100%)',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        component="h3"
                                                        sx={{
                                                            color: '#fff',
                                                            fontWeight: 700,
                                                            fontSize: '1.8rem',
                                                            mb: 3,
                                                            lineHeight: 1.3,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: 1,
                                                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        {section.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: 'rgba(255, 255, 255, 0.95)',
                                                            fontSize: '1.05rem',
                                                            lineHeight: 1.7,
                                                            textAlign: 'justify',
                                                            fontWeight: 400,
                                                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                                                            mb: 3,
                                                        }}
                                                    >
                                                        {section.content}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            width: '80px',
                                                            height: '4px',
                                                            background: 'linear-gradient(45deg, #58c8da, #fff)',
                                                            borderRadius: '2px',
                                                            boxShadow: '0 2px 8px rgba(88, 200, 218, 0.4)',
                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Box
                                                    sx={{
                                                        width: '50%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        p: 4,
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 100%)',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        component="h3"
                                                        sx={{
                                                            color: '#fff',
                                                            fontWeight: 700,
                                                            fontSize: '1.8rem',
                                                            mb: 3,
                                                            lineHeight: 1.3,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: 1,
                                                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        {section.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: 'rgba(255, 255, 255, 0.95)',
                                                            fontSize: '1.05rem',
                                                            lineHeight: 1.7,
                                                            textAlign: 'justify',
                                                            fontWeight: 400,
                                                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                                                            mb: 3,
                                                        }}
                                                    >
                                                        {section.content}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            width: '80px',
                                                            height: '4px',
                                                            background: 'linear-gradient(45deg, #58c8da, #fff)',
                                                            borderRadius: '2px',
                                                            boxShadow: '0 2px 8px rgba(88, 200, 218, 0.4)',
                                                        }}
                                                    />
                                                </Box>

                                                <Box
                                                    sx={{
                                                        width: '50%',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        image={section.image}
                                                        alt={section.alt}
                                                        sx={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                                                            transition: 'all 0.4s ease',
                                                            '&:hover': {
                                                                filter: 'brightness(1) contrast(1.2) saturate(1.2)',
                                                                transform: 'scale(1.02)',
                                                            },
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: '30%',
                                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                                                            zIndex: 2,
                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })}
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
                        <u>"Interesting Facts about Sharks:</u> Sharks do not have bones. They are a special type of
                        fish known as "elasmobranchs", which translates into fish made of cartilaginous tissues"
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
