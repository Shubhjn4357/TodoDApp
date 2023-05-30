import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2';
export const StyledGrid=styled(Grid)({
   '& .MuiCard-root':{
    margin:'0.5rem 0',
    padding:'1rem',
    minHeight:'8rem',
    borderRadius:'1.5rem',
    background:'var(--lightblack)',
    '& .MuiStack-root':{
        alignItems:'center',
        '& .MuiAvatar-root':{
            width:'1.5rem',
            height:'1.5rem',
            background:'linear-gradient(-30deg,var(--darkblue),var(--white))'
        },
        '& .MuiTypography-root':{
            color:'var(--white)',
            fontSize:'1.5rem',
            fontWeight:'bolder',
            marginLeft:'0.5rem',
        },
        '& .MuiIconButton-root':{
            width:'2rem',
            height:'2rem',
        }
    },'& .MuiTypography-root':{
        color:'var(--grey)',
        fontSize:'1rem',
        fontWeight:'bolder',
        textAlign:'start'
    }
   }
})