import React, { Component } from "react";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
  TableHead,
  Button,
} from "@material-ui/core";
import Moment from "react-moment";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
  }

  calculateTotal() {
    var total = 0;
    for (let index = 0; index < this.props.order.order_items.length; index++) {
      const element = this.props.order.order_items[index];
      total += parseFloat(element.quantity);
    }
    return total;
  }

  render() {
    //console.log(this.props.order)
    const style = {
      margin: "1em",
      
    };
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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Typography style={{fontWeight:"bold"}}>*********THAI SUN*********</Typography>
        </div>
        {this.props.order.payment_method == "Cash" ?
        (
          <Typography variant="h6" style={style}>
            Have here
          </Typography>
        )
        :
        (
         this.props.order.order_type == "Collection" ?
         <Typography variant="h6" style={style}>
           Paypal Collection
         </Typography> :  
         <Typography variant="h6" style={style}>
         Paypal Delivery
       </Typography>
       ) 
        }



        <TableContainer component={Paper} style={style}>
          <div style={{width:"98%"}}>
            <div style={{width:"98%",borderLeft:"0.5px solid",borderRight:"0.5px solid",borderTop:"0.5px solid"}}>
              {/* <TableCell style={{border:"0.5px solid"}}> */}
              <Typography style={{padding:"2%"}}>
              <Moment format="YYYY/MM/DD HH:mm">
                {this.props.order.order_time}
                </Moment>
                </Typography>
                {/* </TableCell> */}
              </div>
          <Table style={{width:"98%"}}>
            <TableHead>
              <TableRow>
                <TableCell style={{border:"0.5px solid"}}>Description</TableCell>
                <TableCell style={{border:"0.5px solid"}}>Quantity</TableCell>
                <TableCell style={{border:"0.5px solid"}}>Total</TableCell>
                {/* <TableCell >size</TableCell> */}
                {/* <TableCell>extra </TableCell>
                <TableCell>message</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.order.order_items.map((row) => (
                <TableRow >
                  <TableCell style={{border:"0.5px solid"}}>
                    <Typography>
                  {row.food.food_name}
                      </Typography>
                      <Typography>
                          {row.message} 
                        </Typography>
                          {Object.values(row.extras).length > 0 ?
                        <div style={{display:"flex"}}>
                          (
                      {Object.values(row.extras).map((list) =>
                          list.map(
                            (extra) =>
                            <Typography>
                                {/* `${Object.keys(row.extras)} (${
                                  extra.extra_name
                                }),` */}
                                {extra.extra_name},
                              </Typography>
                          )
                          )}
                          )
                          </div>:null
                        }
                          
                          </TableCell>
                  <TableCell style={{border:"0.5px solid"}}>{row.quantity}</TableCell>
                  <TableCell style={{border:"0.5px solid"}} style={{border:"0.5px solid"}}>{row.total_price
                  
                }</TableCell>
                  {/* <TableCell>{row.sizes!==0?row.extras.map(extra=>(
                    `(${extra.extra_name} , ${extra.extra_price}),`
                  )):"null"}</TableCell> */}

                  {/* <TableCell>
                    {
                    }
                    </TableCell>
                    
                  <TableCell>{row.message}</TableCell> */}
                  {/* <TableCell>
                          {row.sizes>0?row.sizes.map(size=>(
                            
                            size.size_name+ ", "
                            
                            )):null}
                          </TableCell> */}
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell style={{border:"0.5px solid"}}>Total</TableCell>
                <TableCell style={{border:"0.5px solid"}}>{this.calculateTotal()}</TableCell>
                <TableCell style={{border:"0.5px solid"}}>{this.props.order.order_total}</TableCell>
              </TableRow> */}
              {/* createCustomerData("Name", this.props.order.customer_name),
      createCustomerData("Address", this.props.order.order_for_address),
      createCustomerData("Area", this.props.order.order_for_area),
    createCustomerData("Telephone", this.props.order.order_for_tel), */}
            </TableBody>
            
          </Table>
          <div style={{width:"98%",borderLeft:"0.5px solid",borderRight:"0.5px solid",borderBottom:"0.5px solid",display:"flex"
          ,justifyContent:"flex-end"
        }}>
          <div style={{width:"25%"}}>
                  <Typography style={{padding:"2%"}}>
                  Amount : {parseFloat(this.props.order.order_total)}
                  </Typography>
                  <Typography style={{padding:"2%"}}>
                  Net Amount : {parseFloat(this.props.order.order_total)}
                  </Typography>
            </div>
               
              </div>
              <div style={{width:"98%",borderLeft:"0.5px solid",borderRight:"0.5px solid",borderBottom:"0.5px solid"}}>
                  <Typography style={{padding:"2%"}}>
                  {this.props.order.customer_name},{this.props.order.order_for_address},{this.props.order.order_for_area}, Phone:{this.props.order.order_for_tel}
                    </Typography>
               
              </div>
        </div>
        </TableContainer>
        {/* <Typography variant="h6" style={style}>Customer Detials</Typography>
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
              </TableContainer> */}
      </div>
    );
  }
}
class Example extends React.Component {
  render() {
    return (
      <div>
        <ComponentToPrint
          order={this.props.order}
          ref={(el) => (this.componentRef = el)}
        />
        <ReactToPrint
          trigger={() => (
            <Button startIcon={<PrintIcon />}>Print this out!</Button>
          )}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default Example;
