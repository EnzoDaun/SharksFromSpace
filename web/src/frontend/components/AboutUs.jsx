import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GalleryGrid from './GalleryGrid.jsx';

export default function AboutUs() {
    return (
        <Box
            id="about-us-section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                padding: { xs: 1, sm: 2, md: 3 },
                paddingTop: { xs: '10%', sm: '8%', md: '6%' },
                textAlign: 'center',
            }}
        >
            {/* Título Principal */}
            <Typography
                variant="h1"
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontSize: {
                        xs: '2rem',
                        sm: '2.8rem',
                        md: '3.5rem',
                        lg: '4rem',
                    },
                    mb: 2,
                    textTransform: 'uppercase',
                    letterSpacing: { xs: 1, md: 2 },
                }}
            >
                About Us
            </Typography>

            {/* Subtítulo */}
            <Typography
                variant="h5"
                sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 400,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    fontSize: {
                        xs: '1rem',
                        sm: '1.2rem',
                        md: '1.5rem',
                        lg: '1.8rem',
                    },
                    maxWidth: { xs: '90%', sm: '80%', md: '70%' },
                    lineHeight: 1.4,
                    letterSpacing: 0.5,
                    mb: { xs: 4, md: 6 },
                }}
            >
                Conheça a equipe por trás do projeto Sharks From Space
            </Typography>

            {/* Seções de Conteúdo */}
            <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                sx={{
                    maxWidth: '1200px',
                    width: '100%',
                    px: { xs: 1, sm: 2 },
                    justifyContent: 'center',
                }}
            >
                {/* Seção 1: Integrantes da Equipe */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            height: '100%',
                            minHeight: { xs: 'auto', md: '300px' },
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: { xs: 2, md: 3 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    mb: 2,
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Integrantes da Equipe
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    textAlign: 'left',
                                }}
                            >
                                • [Nome do Integrante 1]<br />
                                • [Nome do Integrante 2]<br />
                                • [Nome do Integrante 3]<br />
                                • [Nome do Integrante 4]<br />
                                • [Nome do Integrante 5]
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Seção 2: Curso e Universidade */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            height: '100%',
                            minHeight: { xs: 'auto', md: '300px' },
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: { xs: 2, md: 3 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    mb: 2,
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Formação Acadêmica
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    textAlign: 'left',
                                }}
                            >
                                • [Nome do Integrante 1] - [Curso] - [Universidade]<br />
                                • [Nome do Integrante 2] - [Curso] - [Universidade]<br />
                                • [Nome do Integrante 3] - [Curso] - [Universidade]<br />
                                • [Nome do Integrante 4] - [Curso] - [Universidade]<br />
                                • [Nome do Integrante 5] - [Curso] - [Universidade]
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Seção 3: Nome da Equipe - Patos Selvagens */}
                <Grid item xs={12}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            minHeight: { xs: 'auto', md: '200px' },
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: { xs: 2, md: 3 },
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    mb: 2,
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Por que "Patos Selvagens"?
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    textAlign: 'center',
                                }}
                            >
                                [Explicação sobre como foi decidido o nome da equipe "Patos Selvagens". 
                                Esta seção deve conter a história por trás da escolha do nome, 
                                refletindo o espírito colaborativo e inovador da equipe.]
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Seção 4: Nossa Proposta */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            height: '100%',
                            minHeight: { xs: 'auto', md: '320px' },
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: { xs: 2, md: 3 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    mb: 2,
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Nossa Proposta
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    textAlign: 'justify',
                                }}
                            >
                                [Descrição detalhada da proposta do projeto Sharks From Space. 
                                Incluir objetivos, metodologia, impacto esperado e contribuições 
                                para a conservação marinha e análise de dados oceanográficos 
                                utilizando tecnologia espacial.]
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Seção 5: Divisão de Funções */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            height: '100%',
                            minHeight: { xs: 'auto', md: '320px' },
                        }}
                    >
                        <CardContent
                            sx={{
                                padding: { xs: 2, md: 3 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    mb: 2,
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Divisão de Funções
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    textAlign: 'left',
                                }}
                            >
                                • [Nome] - [Função/Responsabilidade]<br />
                                • [Nome] - [Função/Responsabilidade]<br />
                                • [Nome] - [Função/Responsabilidade]<br />
                                • [Nome] - [Função/Responsabilidade]<br />
                                • [Nome] - [Função/Responsabilidade]
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Seção Galeria */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px', // Reduzido para controlar tamanho
                    mt: { xs: 6, md: 8 },
                    mb: { xs: 4, md: 6 },
                }}
            >
                {/* Título da Galeria */}
                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize: {
                            xs: '1.8rem',
                            sm: '2.2rem',
                            md: '2.8rem',
                            lg: '3.2rem',
                        },
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: { xs: 1, md: 2 },
                        textAlign: 'center',
                    }}
                >
                    Galeria
                </Typography>

                {/* Subtítulo da Galeria */}
                <Typography
                    variant="h6"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 400,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                        fontSize: {
                            xs: '0.9rem',
                            sm: '1rem',
                            md: '1.2rem',
                        },
                        maxWidth: { xs: '90%', sm: '80%', md: '70%' },
                        lineHeight: 1.4,
                        letterSpacing: 0.5,
                        mb: { xs: 4, md: 5 },
                        mx: 'auto',
                        textAlign: 'center',
                    }}
                >
                    Momentos capturados durante o desenvolvimento do projeto Sharks From Space
                </Typography>

                {/* Carrossel da Galeria - Container com altura controlada */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        maxHeight: { xs: '250px', sm: '300px', md: '360px' }, // Altura máxima controlada
                        position: 'relative',
                    }}
                >
                    <GalleryGrid />
                </Box>
            </Box>
        </Box>
    );
}