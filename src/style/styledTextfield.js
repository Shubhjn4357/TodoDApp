import { TextField } from "@mui/material";
import styled from '@emotion/styled';
export const StyledTextField=styled(TextField)({
'& .MuiInputBase-root':{
    background:'var(--lightblack)',
    color:'var(--white)',
    borderRadius:'1rem',
    fontWeight:'bolder',
    '& .MuiInputAdornment-root':{
        '& .MuiTypography-root':{
            color:'var(--white)',
            fontWeight:'bolder',
        }
    }
}
})