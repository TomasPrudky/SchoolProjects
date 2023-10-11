import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({onSearch}) {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
        console.log(value);
    }


    const [isLogin, setIsLogin] = React.useState(true);

    React.useEffect(() => {
        if (localStorage.getItem("jwt") === null) setIsLogin(false)

        if (localStorage.getItem("roles") !== null && localStorage.getItem("roles").includes("ROLE_ADMIN")) setIsAdmin(true);
    }, []);

    const buttonText = isLogin ? <a style={{ textDecoration: 'none' }} href='/'>Log Out</a> : <a style={{ textDecoration: 'none' }} href='/signin'>Log In</a>;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleMenuProfile() {
        handleMenuClose();
    }

    function handleMenuLogout() {
        handleMenuClose();
        localStorage.clear();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isLogin && <MenuItem onClick={handleMenuProfile}><a style={{ textDecoration: 'none' }} href='/profile'>Profile</a></MenuItem>}
            {isAdmin && <MenuItem onClick={handleMenuProfile}><a style={{ textDecoration: 'none' }} href='/categories'>Category</a></MenuItem>}
            {isAdmin && <MenuItem onClick={handleMenuProfile}><a style={{ textDecoration: 'none' }} href='/ingredients'>Ingredients</a></MenuItem>}
            <MenuItem href='/signup' onClick={handleMenuLogout}>{buttonText}</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{cursor: 'pointer'}}>
                    <IconButton href='/'><FastfoodIcon/></IconButton>
                    <Search sx={{flexGrow: 10}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            fullWidth
                            value={searchTerm}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search'}}
                            onChange={handleInputChange}
                        />
                    </Search>
                    <Box sx={{ display: { md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}