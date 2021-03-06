import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";

import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import Checkbox from "material-ui/Checkbox";
import Grid from "material-ui/Grid";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

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
    marginRight: theme.spacing.unit
    // width: 200
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

class Facturas extends React.Component {
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  constructor(props) {
    super();
    this.state = {
      receipts: [],
      checked: [0],
      productCompany: "",
      productCategory: "",
      productCode: "",
      productDescription: "",
      productQuantity: 0,
      productPrice: 0
    };
  }

  async componentDidMount() {
    const receipts = await this.fetchProducts();
    this.setState({ receipts });
  }

    fetchProducts() {
    return fetch(`${this.props.backendURL}/receipts`).then(result =>
      result.json()
    );
  }

  async upsertProduct() {
    //get the set of order items
    await this.postProduct({
      company_id: this.state.productCompany,
      category: this.state.productCategory,
      product_code: this.state.productCode,
      description: this.state.productDescription,
      quantity: this.state.productQuantity,
      price: this.state.productPrice
    });

    //refresh ui with updated product list
    const receipts = await this.fetchProducts();
      console.log("posting receipts", JSON.stringify(receipts));
    this.setState({ receipts });
  }

  postProduct(product) {
    console.log("posting product", product);
    return fetch(`${this.props.backendURL}/product_upsert`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
  }

  render() {
    const {
      classes,
      theme,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;
    const { data, selected } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
          Facturas
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" gutterBottom>
                Product Information
              </Typography>

              <form className={classes.container} noValidate autoComplete="off">
                <InputLabel
                  htmlFor="productCategory"
                  className={classes.textField}
                >
                  Product Company
                </InputLabel>
                <Select
                  fullWidth
                  value={this.state.productCompany}
                  onChange={this.handleChange("productCompany")}
                  inputProps={{
                    name: "productCompany",
                    id: "productCompany"
                  }}
                  className={classes.textField}
                >
                  <MenuItem value={"EEP"}>EEP</MenuItem>
                  <MenuItem value={"Leaf Tech"}>Leaf Tech</MenuItem>
                </Select>
                <InputLabel
                  htmlFor="productCategory"
                  className={classes.textField}
                >
                  Product Category
                </InputLabel>
                <Select
                  fullWidth
                  value={this.state.productCategory}
                  onChange={this.handleChange("productCategory")}
                  inputProps={{
                    name: "productCategory",
                    id: "productCategory"
                  }}
                  className={classes.textField}
                >
                  <MenuItem value={"trees"}>Trees</MenuItem>
                  <MenuItem value={"seeds"}>Seeds</MenuItem>
                  <MenuItem value={"shrubs"}>Shrubs</MenuItem>
                  <MenuItem value={"culture"}>Culture Boxes</MenuItem>
                  <MenuItem value={"genomics"}>Genomics</MenuItem>
                  <MenuItem value={"processing"}>Processing</MenuItem>
                  <MenuItem value={"refrence"}>Reference Materials</MenuItem>
                </Select>

                <TextField
                  required
                  id="required"
                  label="Product Code"
                  fullWidth
                  value={this.state.productCode}
                  onChange={this.handleChange("productCode")}
                  className={classes.textField}
                />
                <TextField
                  required
                  fullWidth
                  value={this.state.productQuantity}
                  onChange={this.handleChange("productQuantity")}
                  id="required"
                  label="Quantity"
                  className={classes.textField}
                />
                <TextField
                  required
                  fullWidth
                  value={this.state.productDescription}
                  onChange={this.handleChange("productDescription")}
                  id="required"
                  label="Product Desc"
                  className={classes.textField}
                />
                <InputLabel
                  htmlFor="adornment-amount"
                  className={classes.textField}
                >
                  Retail Price *
                </InputLabel>
                <Input
                  required
                  fullWidth
                  id="adornment-amount"
                  className={classes.textField}
                  value={this.state.productPrice}
                  onChange={this.handleChange("productPrice")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </form>
              <Button
                variant="raised"
                color="primary"
                className={classes.fullbutton}
                fullWidth
                onClick={this.upsertProduct.bind(this)}
              >
                Crear factura
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" gutterBottom>
                Facturas:{" "}
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Folio</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Emisor</TableCell>
                    <TableCell>Receptor</TableCell>
                    <TableCell>Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.receipts.length === 0 ? (
                    <TableRow hover>
                      <TableCell colSpan={6}>
                        No se encontraron facturas
                      </TableCell>
                    </TableRow>
                  ) : (
                    this.state.receipts.map(p => {
                      const key = `${p.id}`;
                      return (
                        <TableRow hover key={key}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              onChange={this.handleToggle(p.id)}
                              checked={
                                this.state.checked.indexOf(p.id) !==
                                -1
                              }
                            />
                          </TableCell>
                          <TableCell>{p.id}</TableCell>
                          <TableCell>{'--'}</TableCell>
                          <TableCell>{`${p.emitter_details.first_name}${p.emitter_details.last_name}`}</TableCell>
                          <TableCell>{`${p.receiver_details.first_name}${p.receiver_details.last_name}`}</TableCell>
                          <TableCell numeric>{p.total}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Facturas);
