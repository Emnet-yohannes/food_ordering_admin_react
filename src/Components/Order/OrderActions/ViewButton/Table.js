import React , {Component} from "react";
import {
    Table,
    TableContainer,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    TableHead,
    Button
  } from "@material-ui/core";
  import ReactToPrint from "react-to-print";
  import PrintIcon from '@material-ui/icons/Print';


class ComponentToPrint extends Component{
  constructor(props){
    super(props)
  }

  calculateTotal(){
    var total = 0;
    for (let index = 0; index < this.props.order.order_items.length; index++) {
      const element = this.props.order.order_items[index];
      total+=element.quantity;
    }
    return total;
  }


  
  render(){
    //console.log(this.props.order)
    const style={
       margin:"1em"
     }
        function createCustomerData(name, calories) {
            return { name, calories };
          }
          const customerRows = [
            createCustomerData("Name", this.props.order.customer_name),
            createCustomerData("Address", this.props.order.order_for_address),
            createCustomerData("Area", this.props.order.order_for_area),
            createCustomerData("Telephone", this.props.order.order_for_tel),
          ];
          function createOrderDetial(name, calories) {
            return { name, calories };
          }
        
          const orderRows = [
            createOrderDetial("Order Id", this.props.order.id),
            createOrderDetial("Order Date", this.props.order.order_date),
            // createOrderDetial("Order Types", 305),
            createOrderDetial("Payment Method", 262),
            createOrderDetial("Payment Status", this.props.order.payment_status),
            createOrderDetial("Order Message", 262),
          ];

        return (
            <div>
                <Typography variant="h6" style={style}>Customer Detials</Typography>
              <TableContainer component={Paper} style={style}>
                <Table>
                  <TableBody>
                    {customerRows.map((row) => (
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.fat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
    
              <Typography style={style} variant="h6">Order Detials</Typography>
              <TableContainer component={Paper} style={style}>
                <Table>
                <TableHead>
          <TableRow >
            <TableCell  >Order</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >extra</TableCell>
            <TableCell >Size </TableCell>
          </TableRow>
        </TableHead>
                  <TableBody>
                    {this.props.order.order_items.map((row) => (
                      <TableRow>
                        <TableCell>{row.food.food_name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.total_price}</TableCell>
                        <TableCell>{row.extras.map(extra=>(
                          extra.extra_name + ", "
                        ))}</TableCell>
                        {/* <TableCell>
                        {row.sizes.map(size=>(
                          size.FoodSizes.map(singleSize=>(
                            singleSize.size_name+ ", "
                          ))   
                        ))}
                        </TableCell> */}
                      </TableRow>
                    ))}
                    <TableRow >
            <TableCell  >Total</TableCell>
            <TableCell >{this.calculateTotal()}</TableCell>
            <TableCell >{this.props.order.order_total}</TableCell>
          </TableRow>
                  </TableBody>
                  
                </Table>
              </TableContainer>
              <Typography variant="h6" style={style}>Customer Detials</Typography>
              <TableContainer component={Paper} style={style}>
                <Table>
                  <TableBody>
                    {customerRows.map((row) => (
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.fat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
        )
    }
}
class Example extends React.Component {
    render() {
      return (
        <div>
          <ComponentToPrint order={this.props.order} ref={(el) => (this.componentRef = el)} />
          <ReactToPrint
            trigger={() => <Button startIcon={<PrintIcon/>}>Print this out!</Button>}
            content={() => this.componentRef}
          />
        </div>
      );
    }
  }
  
  export default Example;
