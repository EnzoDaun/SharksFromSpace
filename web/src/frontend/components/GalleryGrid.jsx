/**
 * GalleryGrid - Componente de carrossel para exibir fotos do projeto
 * 
 * INSTRUÇÕES PARA ADICIONAR IMAGENS:
 * 1. Coloque as imagens na pasta: WEB/src/frontend/assets/gallery/
 * 2. As imagens serão carregadas automaticamente via import.meta.glob (Vite)
 * 3. Formatos suportados: .jpg, .jpeg, .png, .webp
 * 4. Nomeação sugerida: numeracao.descricao.extensao (ex: 1.team.jpeg)
 */

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function GalleryGrid() {
    const [galleryImages, setGalleryImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Carregamento automático de imagens usando Vite import.meta.glob
        const loadGalleryImages = async () => {
            try {
                const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true });
                
                const images = Object.entries(imageModules)
                    .filter(([path]) => !path.includes('README')) // Excluir README
                    .map(([path, module], index) => {
                        // Extrair nome do arquivo do caminho
                        const fileName = path.split('/').pop().split('.')[0];
                        // Gerar alt text baseado no nome do arquivo
                        const altText = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        
                        return {
                            id: index + 1,
                            src: module.default,
                            alt: `Foto do projeto - ${altText}`,
                            fileName: fileName
                        };
                    })
                    .sort((a, b) => a.fileName.localeCompare(b.fileName)); // Ordenação alfabética
                
                setGalleryImages(images);
            } catch (error) {
                console.warn('Erro ao carregar imagens da galeria:', error);
                setGalleryImages([]);
            }
        };

        loadGalleryImages();
    }, []);

    // Navegação do carrossel
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    // Controle por teclado
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                prevSlide();
            } else if (event.key === 'ArrowRight') {
                nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [galleryImages.length]);

    // Se não houver imagens, mostrar mensagem informativa
    if (galleryImages.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontStyle: 'italic'
                    }}
                >
                    Galeria em construção - adicione imagens na pasta assets/gallery/
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                aspectRatio: '16 / 10', // Aspect ratio consistente
            }}
        >
            {/* Imagem do slide atual */}
            <Box
                component="img"
                src={galleryImages[currentSlide]?.src}
                alt={galleryImages[currentSlide]?.alt}
                loading="lazy"
                decoding="async"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Sem distorção
                    display: 'block',
                }}
            />

            {/* Controles de navegação */}
            {galleryImages.length > 1 && (
                <>
                    {/* Botão anterior */}
                    <IconButton
                        onClick={prevSlide}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                background: 'rgba(0, 0, 0, 0.7)',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:focus': {
                                outline: '2px solid #ff3b81',
                                outlineOffset: '2px',
                            },
                            transition: 'all 0.2s ease',
                        }}
                        aria-label="Imagem anterior"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    {/* Botão próximo */}
                    <IconButton
                        onClick={nextSlide}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                background: 'rgba(0, 0, 0, 0.7)',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            '&:focus': {
                                outline: '2px solid #ff3b81',
                                outlineOffset: '2px',
                            },
                            transition: 'all 0.2s ease',
                        }}
                        aria-label="Próxima imagem"
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </>
            )}

            {/* Indicadores (dots) */}
            {galleryImages.length > 1 && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '20px',
                        padding: '8px 12px',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {galleryImages.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: currentSlide === index ? '#ff3b81' : 'rgba(255, 255, 255, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: currentSlide === index ? '#ff3b81' : 'rgba(255, 255, 255, 0.7)',
                                    transform: 'scale(1.2)',
                                }
                            }}
                        />
                    ))}
                </Box>
            )}

            {/* Contador de slides */}
            {galleryImages.length > 1 && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                        }}
                    >
                        {currentSlide + 1} / {galleryImages.length}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}