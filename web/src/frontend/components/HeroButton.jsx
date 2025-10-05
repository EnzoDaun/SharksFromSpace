import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {styled, useTheme} from '@mui/material/styles';
import {useMediaQuery} from '@mui/material';

const Outer = styled(Box)(({theme}) => ({
    display: 'inline-block',
    padding: 6,
    borderRadius: 999,
    background: 'linear-gradient(90deg, rgba(15,124,130,1) 0%, rgba(6,105,111,1) 100%)',
    [theme.breakpoints.down('sm')]: {
        padding: 4,
    }
}));

const LearnButton = styled(Button)(({theme}) => ({
    borderRadius: 999,
    textTransform: 'uppercase',
    padding: '10px 28px',
    fontWeight: 700,
    background: 'linear-gradient(180deg, #ff7aa3 0%, #ff3b81 100%)',
    color: '#fff',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15), inset 0 -2px 0 rgba(0,0,0,0.06)',
    fontSize: 13,
    letterSpacing: 1,
    minWidth: 140,
    '&:hover': {
        background: 'linear-gradient(180deg, #ff6b94 0%, #ff166d 100%)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.18)',
    },
    '&:active': {
        transform: 'translateY(1px)'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '8px 20px',
        fontSize: 11,
        minWidth: 120,
    },
    [theme.breakpoints.down('xs')]: {
        padding: '6px 16px',
        fontSize: 10,
        minWidth: 100,
    }
}));

function HeroButton({onClick, children = 'GET STARTED', sx}) {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Outer>
            <LearnButton onClick={onClick} disableRipple sx={sx}>
                {children}
            </LearnButton>
        </Outer>
    );
}

export default HeroButton
