import styled from '@emotion/styled';
import {Drawer} from '@mui/material';
const drawerWidth = 250;
export const StyledDrawer=styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper':{
        background:'var(--black)',
        width: drawerWidth,
        borderLeft:'0.5rem solid var(--darkblu)',
        boxSizing: 'border-box',
        '& .MuiDivider-root':{
            borderColor:'var(--darkblue)'
        },
        '& .MuiList-root':{
            '& .MuiListItem-root':{
                padding:'0 1rem 0 0.5rem',
                '& .MuiListItemButton-root':{
                    borderRadius:'0.5rem',
                    '&:hover,&:active':{
                        background:'var(--lightblack)',
                        '& .MuiListItemText-root':{
                            color:'var(--white)',
                            transform:'scaleX(1.1)'
                        },
                        '& .MuiListItemIcon-root':{
                            color:'var(--white)'
                        }
                    },
                    '& .MuiListItemText-root':{
                        color:'var(--grey)'
                    },
                    '& .MuiListItemIcon-root':{
                        color:'var(--grey)'
                    }
                }
            }
        },
        '& .MuiIconButton-root':{
            '& svg':{
                color:'var(--white)'
            }
        }
    } 
})