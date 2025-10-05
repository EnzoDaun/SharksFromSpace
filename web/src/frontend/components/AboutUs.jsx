import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {useTheme, useMediaQuery} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import teamImg from '../assets/team1.jpg';
import usImg from '../assets/US.jpg';

import codeImg from '../assets/code.jpg';
import code2Img from '../assets/code2.jpg';
import projectImg from '../assets/Project.jpg';

const teamMembers = [
    {
        name: 'Mateus Berlingieri Lusvarghi',
        course: 'Law',
        university: 'UNAERP',
        role: 'PUBLIC RELATIONS',
    },
    {
        name: 'Mateus Mendonça de Ávila',
        course: 'Software Engineering',
        university: 'UNAERP',
        role: 'BACKEND/API OWNER',
    },
    {
        name: 'Marco Antônio Lonardon Junior',
        course: 'Software Engineering',
        university: 'UNAERP',
        role: 'RESORT FRONT END DEVELOPER',
    },
    {
        name: 'Miguel Ribas Berlese',
        course: 'Software Engineering',
        university: 'UNAERP',
        role: 'RESORT FRONT END DEVELOPER',
    },
    {
        name: 'Enzo Shimada Daun',
        course: 'Software Engineering',
        university: 'UNAERP',
        role: 'FRONTEND DEVELOPER & PO/TECH LEAD',
    },
];

const carouselImages = [
    {src: codeImg, alt: 'Code Development'},
    {src: code2Img, alt: 'Code Implementation'},
    {src: projectImg, alt: 'Project Overview'},
];

export default function AboutUs() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box
            id="about-us"
            sx={{
                minHeight: '100vh',
                py: {xs: 4, sm: 6, md: 8},
                position: 'relative',
            }}
        >
            <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1}}>
                {/* Header Section */}
                <Box sx={{textAlign: 'center', mb: {xs: 4, sm: 6, md: 8}}}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            fontSize: {
                                xs: '2.5rem',
                                sm: '3.5rem',
                                md: '4rem',
                                lg: '4.5rem',
                            },
                            mb: 2,
                            textTransform: 'uppercase',
                            letterSpacing: {xs: 1, sm: 2},
                        }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 300,
                            fontSize: {
                                xs: '1rem',
                                sm: '1.2rem',
                                md: '1.3rem',
                            },
                            maxWidth: '80%',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Meet the Wild Ducks team and discover our mission
                    </Typography>
                </Box>

                <Box sx={{mb: {xs: 6, sm: 8, md: 10}}}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: {xs: 3, sm: 4, md: 5},
                            fontSize: {
                                xs: '1.8rem',
                                sm: '2.5rem',
                                md: '3rem',
                            },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        Our Team
                    </Typography>

                    <Card
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 3,
                            p: {xs: 2, sm: 3, md: 4},
                        }}
                    >
                        <Grid container spacing={{xs: 2, sm: 3}}
                              sx={{mb: {xs: 4, sm: 5}, justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item xs={12} sm={5} sx={{display: 'flex', justifyContent: 'center'}}>
                                <Box
                                    component="img"
                                    src={usImg}
                                    alt="Team Photo 1"
                                    sx={{
                                        width: '100%',
                                        maxWidth: {xs: '280px', sm: '100%'},
                                        height: {xs: '280px', sm: '320px', md: '380px'},
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        filter: 'brightness(0.9)',
                                        display: 'block',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Box
                                    component="img"
                                    src={teamImg}
                                    alt="Team Photo 2"
                                    sx={{
                                        width: '100%',
                                        height: {xs: '280px', sm: '320px', md: '380px'},
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        filter: 'brightness(0.9)',
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={{xs: 1.5, sm: 2}} sx={{justifyContent: 'center'}}>
                            {teamMembers.map((member, index) => (
                                <Grid item xs={6} sm={4} md={2.4} key={index}>
                                    <Card
                                        sx={{
                                            height: {xs: '180px', sm: '200px', md: '210px'},
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(5px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{
                                            p: {xs: 1.5, sm: 2},
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                    fontSize: {
                                                        xs: '0.85rem',
                                                        sm: '0.95rem',
                                                        md: '1rem',
                                                    },
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {member.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    mb: 0.5,
                                                    fontSize: {
                                                        xs: '0.75rem',
                                                        sm: '0.8rem',
                                                        md: '0.85rem',
                                                    },
                                                }}
                                            >
                                                {member.course}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    mb: 1,
                                                    fontSize: {
                                                        xs: '0.7rem',
                                                        sm: '0.75rem',
                                                        md: '0.8rem',
                                                    },
                                                }}
                                            >
                                                {member.university}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#ff3b81',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 0.3,
                                                    fontSize: {
                                                        xs: '0.65rem',
                                                        sm: '0.7rem',
                                                        md: '0.75rem',
                                                    },
                                                    lineHeight: 1.1,
                                                }}
                                            >
                                                {member.role}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Box>

                <Box sx={{mb: {xs: 6, sm: 8, md: 10}}}>
                    <Card
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 3,
                            p: {xs: 3, sm: 4, md: 5},
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#ff3b81',
                                fontWeight: 'bold',
                                mb: 3,
                                textAlign: 'center',
                                fontSize: {
                                    xs: '1.5rem',
                                    sm: '2rem',
                                    md: '2.5rem',
                                },
                            }}
                        >
                            Why "Wild Ducks"?
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.8,
                                textAlign: 'center',
                                fontSize: {
                                    xs: '1rem',
                                    sm: '1.1rem',
                                    md: '1.2rem',
                                },
                                maxWidth: '80%',
                                mx: 'auto',
                            }}
                        >
                            The team name "Wild Ducks" was chosen at random using an online celestial map.
                            It references the Wild Duck Cluster, also known as Messier 11.
                        </Typography>
                    </Card>
                </Box>

                <Box sx={{mb: {xs: 6, sm: 8, md: 10}}}>
                    <Grid container spacing={{xs: 1.5, sm: 12}}>
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 3,
                                    p: {xs: 3, sm: 4},
                                    height: {md: '100%'},
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#ff3b81',
                                        fontWeight: 'bold',
                                        mb: 3,
                                        textAlign: 'center',
                                        fontSize: {
                                            xs: '1.3rem',
                                            sm: '1.8rem',
                                            md: '2rem',
                                        },
                                    }}
                                >
                                    Our Proposal
                                </Typography>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                            mb: 2,
                                        }}
                                    >
                                        Our purpose is driven by an inspiring commitment: to protect sharks and humanity
                                        through the power of cutting-edge technology and robust data.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                            mb: 2,
                                        }}
                                    >
                                        We believe that safeguarding shark populations is crucial for maintaining the
                                        balance
                                        of our oceans, which directly impacts the health and future of our planet. By
                                        harnessing
                                        satellite data, intelligent tracking, and advanced predictive algorithms, we
                                        create a
                                        bridge between conservation science and human safety—empowering societies to
                                        make informed
                                        decisions that preserve both marine life and human interests.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                            mb: 2,
                                        }}
                                    >
                                        Our project isn't just about observing the migration of sharks; it's about
                                        pioneering
                                        a new era where technology serves as a guardian for nature and humankind.
                                        Through accurate,
                                        real-time insights, we enable communities, researchers, and policymakers to act
                                        effectively,
                                        fostering harmony between sustainable development, marine protection, and global
                                        well-being.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                        }}
                                    >
                                        With every innovation, we reaffirm our purpose: protect the sharks, protect
                                        people,
                                        and protect the future—using the best that science and technology have to offer.
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 3,
                                    p: {xs: 3, sm: 4},
                                    height: {md: '100%'},
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#ff3b81',
                                        fontWeight: 'bold',
                                        mb: 3,
                                        textAlign: 'center',
                                        fontSize: {
                                            xs: '1.3rem',
                                            sm: '1.8rem',
                                            md: '2rem',
                                        },
                                    }}
                                >
                                    About the Challenge
                                </Typography>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                            mb: 2,
                                        }}
                                    >
                                        Earth's ocean is one of the most powerful habitats in our universe, supporting a
                                        range
                                        of life that sustains ecosystems and habitability across the globe. It is common
                                        to
                                        measure photosynthetic activity in the ocean from space, but far more
                                        challenging to
                                        track top predators.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                            mb: 2,
                                        }}
                                    >
                                        Your challenge is to create a mathematical framework for identifying sharks and
                                        predicting
                                        their foraging habitats using NASA satellite data, and also to suggest a new
                                        conceptual
                                        model of a tag (a small electronic device that can be attached to an animal to
                                        track and
                                        study its movement) that could measure not only where sharks are, but also what
                                        they are
                                        eating, and in real time transmit that data back to users to enable development
                                        of
                                        predictive models. (Earth Science Division)
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: 1.7,
                                            textAlign: 'justify',
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '1rem',
                                                md: '1.05rem',
                                            },
                                        }}
                                    >
                                        We are a team of software enthusiasts fascinated by technology and information.
                                        Driven by this passion, we decided to participate in the NASA Space Apps
                                        Challenge
                                        with the intention of giving our best and above all learning a lot!
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{mb: {xs: 4, sm: 6}}}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: {xs: 3, sm: 4, md: 5},
                            fontSize: {
                                xs: '1.8rem',
                                sm: '2.5rem',
                                md: '3rem',
                            },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        Our Work
                    </Typography>

                    <Box
                        sx={{
                            position: 'relative',
                            maxWidth: {xs: '100%', sm: '80%', md: '70%'},
                            mx: 'auto',
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        }}
                    >
                        <Box
                            component="img"
                            src={carouselImages[currentImageIndex].src}
                            alt={carouselImages[currentImageIndex].alt}
                            sx={{
                                width: '100%',
                                height: {xs: '250px', sm: '350px', md: '400px'},
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />

                        <IconButton
                            onClick={prevImage}
                            sx={{
                                position: 'absolute',
                                left: 16,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <ArrowBackIosIcon/>
                        </IconButton>

                        <IconButton
                            onClick={nextImage}
                            sx={{
                                position: 'absolute',
                                right: 16,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            <ArrowForwardIosIcon/>
                        </IconButton>

                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {carouselImages.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: currentImageIndex === index
                                            ? '#ff3b81'
                                            : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#ff3b81',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
