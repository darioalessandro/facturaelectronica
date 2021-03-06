import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import AddShoppingCartIcon from "material-ui-icons/Add";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  fullbutton: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: 40,
    minWidth: 320,
    maxWidth: 500
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    overflowX: "auto"
  },
  tableRowStyle: {
    height: "10px",
    padding: "0px"
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

let id = 0;

function createData(productID, productDesc, productPrice, productStock) {
  id += 1;
  return { id, productID, productDesc, productPrice, productStock };
}

class Clientes extends React.Component {
  handleToggle = id => () => {
    const { checked } = this.state;
    const { calculateCost } = this.state;
    const { amount } = this.state;

    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    const newCost = [...calculateCost];

    if (currentIndex === -1) {
      newChecked.push(id);
      newCost.push(this.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
      amount: this.value
    });
  };

  constructor(props) {
    super();
    this.state = {
      products: [],
      checked: [0],
      category: "",
      firstName: "Johnny",
      lastName: "Appleseed",
      address: "1 Orchard Ln.",
      phoneNumber: "(123) 456 7890",
      calculateCost: [0],
      amount: 0
    };
  }

  async componentDidMount() {
    // wait until user selects an initial category

    this.setState({ category: "cultureboxes" });
    const products = await this.fetchProducts("cultureboxes");
    this.setState({
      products: products.map(o => {
        o.order_quantity = 0;
        return o;
      })
    });
  }

  fetchProducts(filter) {
    return fetch(`${this.props.backendURL}/customers`).then(result => result.json());
  }

  postOrder(order) {
    console.log("posting order", order);
    return fetch(`${this.props.backendURL}/customers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ order })
    });
  }

  incrementOrderQuantity(pcode) {
    var price = 0;
    var q = 0;
    const updated = this.state.products.map(product => {
      if (product.product_code == pcode) {
        q = 1;
        price = product.price;
      } else {
        q = 0;
      }
      return {
        ...product,
        order_quantity: product.order_quantity + q
      };
    });

    this.setState({
      products: updated,
      amount: this.state.amount + price
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async productCategoryChange(event) {
    //const products = this.fetchAllProducts();//this.fetchFilteredProducts(event.target.value);
    this.setState({ category: event.target.value });
    const products = await this.fetchProducts(event.target.value);
    this.setState({
      products: products.map(o => {
        o.order_quantity = 0;
        return o;
      })
    });
  }

  async submitOrder() {
    //get the set of order items
    var items = [];
    this.state.products.map(product => {
      if (product.order_quantity > 0) {
        items.push({
          product_company_id: product.company_id,
          product_category: product.category,
          product_code: product.product_code,
          quantity: product.order_quantity
        });
      }
    });

    //build order request body
    var orderBody = {
      customer_first_name: this.state.firstName,
      customer_last_name: this.state.lastName,
      customer_address: this.state.address,
      customer_phone: this.state.phoneNumber,
      items: items
    };
    console.log("SUBMITTING ORDER", orderBody);
    await this.postOrder(orderBody);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Clientes
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" gutterBottom>
                Añadir Cliente:
              </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  required
                  id="firstName"
                  label="Nombre"
                  className={classes.textField}
                  value={this.state.firstName}
                  onChange={this.handleChange("firstName")}
                />
                <TextField
                  required
                  id="required"
                  label="Apellidos"
                  className={classes.textField}
                  value={this.state.lastName}
                  onChange={this.handleChange("lastName")}
                />
                <TextField
                  required
                  id="required"
                  label="Dirección"
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange("address")}
                />
                <TextField
                  required
                  id="required"
                  label="Número telefónico"
                  className={classes.textField}
                  value={this.state.phoneNumber}
                  onChange={this.handleChange("phoneNumber")}
                />
              </form>
            </Paper>
            <Paper>
              <Button
                variant="raised"
                color="primary"
                className={classes.fullbutton}
                fullWidth
                onClick={this.submitOrder.bind(this)}
              >
                Añadir cliente
              </Button>
              <Divider light />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" gutterBottom>
                Clientes Registrados:
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow style={styles.tableRowStyle}>
                    <TableCell>Nombre</TableCell>
                    <TableCell>RFC</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.products.map(n => {
                    return (
                      <TableRow hover key={n.id}>
                        <TableCell>{`${n.first_name}${n.last_name}`}</TableCell>
                        <TableCell>{n.rfc}</TableCell>
                        <TableCell>{n.created_at}</TableCell>
                        <TableCell padding="checkbox">
                          <IconButton
                            color="primary"
                            className={classes.button}
                            aria-label="Add to shopping cart"
                            onClick={event =>
                              this.incrementOrderQuantity(n.product_code)
                            }
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Clientes);
