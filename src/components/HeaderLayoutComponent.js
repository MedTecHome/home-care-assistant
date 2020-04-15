import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function HeaderLayoutComponent({history}) {
    const classes = useStyles();

    const handleClickLogin = () => {
        history.push('/auth')
    };
    return <AppBar position="static">
        <Toolbar>
            <div className={classes.title}>
                <Button color="inherit">Inicio</Button>
            </div>
            <Button color="inherit" onClick={handleClickLogin}>Login</Button>
        </Toolbar>
    </AppBar>
}

export default withRouter(HeaderLayoutComponent);