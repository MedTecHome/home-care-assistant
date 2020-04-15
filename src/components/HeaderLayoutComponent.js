import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function HeaderLayoutComponent(){
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <div className={classes.title}>
                <Button color="inherit">Inicio</Button>
            </div>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
}

export default HeaderLayoutComponent;