import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import BubbleBG from './BubbleBG.jsx';
import HeroButton from './HeroButton.jsx';
// Importando as imagens
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
		console.log(`Navegando para: ${cardTitle}`);
	};

	return (
		<Box id="hub-section">
			<BubbleBG>
				<Box
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
					{/* Título principal */}
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
						Let's start Exploring
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
						Find your way throughout our website
					</Typography>

					{/* Cards Section */}
					<Grid
						container
						spacing={{ xs: 3, md: 4 }}
						sx={{
							maxWidth: '1400px',
							width: '100%',
							px: { xs: 1, sm: 2 },
							justifyContent: 'center',
						}}
					>
						{cardData.map((card) => (
							<Grid item xs={12} md={4} key={card.id}>
								<Card
									sx={{
										background: 'rgba(255, 255, 255, 0.1)',
										backdropFilter: 'blur(10px)',
										borderRadius: '20px',
										border: '1px solid rgba(255, 255, 255, 0.2)',
										boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
										transition: 'all 0.3s ease',
										height: '100%',
										minHeight: { xs: 'auto', md: '380px' },
										maxHeight: { md: '380px' },
										display: 'flex',
										flexDirection: 'column',
										'&:hover': {
											transform: 'translateY(-8px)',
											boxShadow: '0 12px 40px rgba(255, 59, 129, 0.2)',
											background: 'rgba(255, 255, 255, 0.15)',
										},
									}}
								>
									<CardMedia
										component="img"
										height="150"
										image={card.image}
										alt={card.alt}
										sx={{
											objectFit: 'cover',
											borderRadius: '20px 20px 0 0',
											filter: 'brightness(0.9)',
											height: '150px',
											minHeight: '150px',
											maxHeight: '150px',
										}}
									/>
									<CardContent
										sx={{
											flexGrow: 1,
											display: 'flex',
											flexDirection: 'column',
											padding: { xs: 2, md: 2.5 },
											paddingBottom: '20px !important',
											height: 'calc(100% - 150px)',
											justifyContent: 'space-between',
										}}
									>
										<Box>
											<Typography
												variant="h5"
												sx={{
													color: 'white',
													fontWeight: 700,
													textTransform: 'uppercase',
													letterSpacing: 1,
													mb: 1.5,
													fontSize: { xs: '1.1rem', md: '1.3rem' },
													textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
													textAlign: 'center',
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
													fontSize: { xs: '0.85rem', md: '0.95rem' },
													textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
													textAlign: 'center',
													minHeight: { md: '45px' },
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
											}}
										>
											<HeroButton
												onClick={() => handleCardClick(card.title)}
												sx={{
													transform: 'scale(0.8)',
												}}
											>
												Let's Go
											</HeroButton>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</BubbleBG>
		</Box>
	);
}
