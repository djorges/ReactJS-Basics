import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 8
    },
    appBar: {
        backgroundColor: "black"
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        }
    }
}));

export default function Navbar(props) { 
    const classes = useStyles();

    function onKeyUpInput(e){
        //Call handlerSearchArticulo
        props.searchArticulo(e.target.value.toString());
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky"className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {props.titulo}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search…" classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput}}
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyUp={onKeyUpInput}
                    />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}