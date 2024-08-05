import { useState } from "react";
import { Outlet } from "react-router";

import style from "./Sidebar.module.css";
import MuiDrawer from "@mui/material/Drawer";
import Drawer from "@mui/material/Drawer";
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from "@mui/material";

// icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarHeader = (props) => {
    const { children, open } = props;
    const theme = useTheme();
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "flex-end" : "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    };

    return (
        <div style={style}>
            {children}
        </div>
    )
}


export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const sidebarWidth = 240;

    const openAnimation = {
        width: sidebarWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    };

    const closeAnimation = {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    };

    const style = {
        width: open ? sidebarWidth : `calc(${theme.spacing(7)} + 1px)`,
        overflowX: "hidden",
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        '& .MuiDrawer-paper': open ? openAnimation : closeAnimation,
        ...open ? openAnimation : closeAnimation
    }

    const openSidebar = () => {
        setOpen(true);
    }

    const closeSidebar = () => {
        setOpen(false);
    }

    return (
        <Drawer
            open={open}
            variant="permanent"
            sx={style}
        >
            <SidebarHeader open={open}>
                {
                    open && // close
                    <IconButton onClick={closeSidebar}>
                        <ChevronLeftIcon />
                    </IconButton>
                }
                {
                    !open && // open
                    <IconButton onClick={openSidebar}>
                        <MenuIcon />
                    </IconButton>
                }
            </SidebarHeader>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
