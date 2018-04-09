import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { opcionesMenuPrincipal } from './tileData';
import {FormControl, FormHelperText, Input, InputLabel, ListItem, ListItemText} from "material-ui";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    searchTools: {
        textAlign: 'left',
        backgroundColor:'white',
    },
});

class MenuPrincipal extends React.Component {
    state = {
        minDate: new Date(),
        maxDate: new Date(),
        facturas: [
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            },
            {
                rfc: "234234",
                nombre: "Juan Pérez",
                monto: 2342,
                folio: 234234,
                folioFiscal:"324234234234",
            }

        ],
    };

    handleDateChange = (date) => {
        // this.setState({ selectedDate: date });
    }

    render() {
        const { classes } = this.props;

        const drawer = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'left'}
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>{opcionesMenuPrincipal}</List>
            </Drawer>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, classes[`appBar-left`])}
                    >
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>Menú Principal
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.searchTools}>
                            <FormControl className={classes.formControl} aria-describedby="name-helper-text">
                                <InputLabel htmlFor="name-helper">Nombre/RFC</InputLabel>
                                <Input id="name-helper" value={this.state.name} onChange={this.handleChange} />
                                <FormHelperText id="name-helper-text">Introduzca el nombre o RFC del cliente</FormHelperText>
                            </FormControl>
                        </div>
                        <List>
                            {this.state.facturas.map(factura => {
                                return <ListItem>
                                    <ListItemText
                                        primary={`${factura.nombre} ${factura.rfc}`}
                                        secondary={`monto= $${factura.monto}`}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </main>
                </div>
            </div>
        );
    }
}

MenuPrincipal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuPrincipal);