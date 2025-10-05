import React from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

// Definindo as animações usando keyframes do Emotion
const wavesAnimation = keyframes`
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
`;

const bubblesAnimation = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`;

const bubbleAnimation = keyframes`
  0% { bottom: -10%; opacity: 0; }
  100% { bottom: 100%; }
`;

export default function BubbleBG({ children }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(0deg, #022244, #58c8da)',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
        // Pseudo-elementos para as ondas
        '&::after, &::before': {
          backgroundColor: 'white',
          width: '120%',
          height: '120px',
          position: 'absolute',
          content: '""',
          top: '-80px',
          left: '-10%',
          borderRadius: '100%',
          animation: `${wavesAnimation} 10s ease infinite`,
          opacity: 0.2,
        },
        '&::before': {
          top: '-60px',
          animationDelay: '5s',
          opacity: 0.1,
          left: '-5%',
        },
      }}
    >
      {/* Container das bolhas */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          animation: `${bubblesAnimation} 10s linear infinite`,
        }}
      >
        {/* Bolha 1 */}
        <Box
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '10%',
            opacity: 0.2,
            animation: `${bubbleAnimation} 10s ease-in-out infinite`,
            animationDelay: '3s',
            animationDuration: '10s',
          }}
        />

        {/* Bolha 2 */}
        <Box
          sx={{
            width: '30px',
            height: '30px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '40%',
            opacity: 0.1,
            animation: `${bubbleAnimation} 5s ease-in-out infinite`,
            animationDelay: '1s',
          }}
        />

        {/* Bolha 3 */}
        <Box
          sx={{
            width: '10px',
            height: '10px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '30%',
            opacity: 0.3,
            animation: `${bubbleAnimation} 20s ease-in-out infinite`,
            animationDelay: '5s',
          }}
        />

        {/* Bolha 4 */}
        <Box
          sx={{
            width: '35px',
            height: '35px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '40%',
            opacity: 0.2,
            animation: `${bubbleAnimation} 8s ease-in-out infinite`,
            animationDelay: '8s',
          }}
        />

        {/* Bolha 5 */}
        <Box
          sx={{
            width: '45px',
            height: '45px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '60%',
            opacity: 0.1,
            animation: `${bubbleAnimation} 15s ease-in-out infinite`,
            animationDelay: '10s',
          }}
        />

        {/* Bolha 6 */}
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '80%',
            opacity: 0.4,
            animation: `${bubbleAnimation} 30s ease-in-out infinite`,
            animationDelay: '3s',
          }}
        />

        {/* Bolha 7 */}
        <Box
          sx={{
            width: '15px',
            height: '15px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '90%',
            opacity: 0.3,
            animation: `${bubbleAnimation} 25s ease-in-out infinite`,
            animationDelay: '0s',
          }}
        />

        {/* Bolha 8 */}
        <Box
          sx={{
            width: '20px',
            height: '20px',
            borderRadius: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            bottom: '-10%',
            left: '50%',
            opacity: 0.2,
            animation: `${bubbleAnimation} 10s ease-in-out infinite`,
            animationDelay: '0s',
          }}
        />
      </Box>
    </Box>
  );
}
