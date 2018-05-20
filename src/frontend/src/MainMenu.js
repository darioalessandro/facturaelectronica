import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import MenuIcon from "material-ui-icons/Menu";
import GoogleLogin from "react-google-login";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ContactsIcon from "material-ui-icons/PermContactCalendar";
import FacturasIcon from "material-ui-icons/Work";

import Clientes from "./Clientes";
import Facturas from "./Facturas";

const drawerWidth = 240;

const styles = theme => ({
  googleButton: {
    display: "inline-block",
    background: "rgb(209, 72, 54)",
    color: "rgb(255, 255, 255)",
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "2px",
    border: "1px solid transparent",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    background: "#e5e8e5"
  },

  card: {
    alignSelf: "center",
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "scroll",
    position: "relative",
    display: "flex",
    width: "100%",
    background: "#e5e8e5"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  flex: {
    flex: 1
  }
});

const Sections = {
  facturas: "Facturas",
  clientes: "Clientes"
};

class MainMenu extends React.Component {
  state = {
    mobileOpen: false,
    section: Sections.facturas,
    authToken: null
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, backendURL, isAuthDisabled } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <ListItem
          button
          onClick={() => this.setState({ section: Sections.clientes })}
        >
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary={Sections.clientes} />
        </ListItem>
        <ListItem
          button
          onClick={() => this.setState({ section: Sections.facturas })}
        >
          <ListItemIcon>
            <FacturasIcon />
          </ListItemIcon>
          <ListItemText primary={Sections.facturas} />
        </ListItem>
        <Divider />
      </div>
    );

    var selectedSession;

    switch (this.state.section) {
      case Sections.facturas:
        selectedSession = <Facturas backendURL={backendURL} />;
        break;
      case Sections.clientes:
        selectedSession = <Clientes backendURL={backendURL} />;
        break;
      default:
    }

    const mainMenu = (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Facturas Electrónicas
            </Typography>
            <Typography color="inherit">{this.state.name}</Typography>
            <Button color="inherit" onClick={this.logout.bind(this)}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {selectedSession}
        </main>
      </div>
    );

    const auth = (
      <div className={classes.login}>
        <Card className={classes.card}>
          <CardHeader title="Factura Electrónica" />
          <CardContent>
            <GoogleLogin
              className={classes.googleButton}
              clientId={this.props.gauthId}
              buttonText="Entrar con Google"
              onSuccess={this.loginSuccess.bind(this)}
              onFailure={this.loginFailure.bind(this)}
            />
          </CardContent>
        </Card>
      </div>
    );

    if (isAuthDisabled && !this.state.authToken) {
      this.loginSuccess({
        tokenId: "mock token",
        profileObj: {
          name: "Dario Talarico",
          email: "darioalessandro@me.com"
        }
      });
    }

    if (!backendURL) {
      return <Typography>Backend URL is not defined...</Typography>;
    }
    return !this.state.authToken ? auth : mainMenu;
  }

  loginSuccess(response) {
    console.log(JSON.stringify(response));
    this.setState({ authToken: response.tokenId });
    this.setState({ name: response.profileObj.name });
    this.setState({ email: response.profileObj.email });
    fetch(`${this.props.backendURL}/auth/log/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        token: this.state.authToken
      })
    });
  }

  loginFailure() {
    this.setState({ authToken: null });
  }

  logout() {
    fetch(`${this.props.backendURL}/auth/log/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        token: this.state.authToken
      })
    });
    window.open("https://accounts.google.com/logout", "_newtab");
    this.setState({ authToken: null });
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainMenu);
