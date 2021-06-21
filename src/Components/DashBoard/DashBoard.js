import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import { Grid, Box, TableRow, TableBody ,TableCell, Table, TableContainer,Paper} from "@material-ui/core";
import ref from '../../firebase/firebase'

const useStyles = makeStyles({
  root: {
    display:"flex",
    flexDirection:"row",
    justify:"space-around"

  },
  content:{
    backgroundColor: "#2E2D57",
    width:"30em",
    margin:"3em"
  },
  title: {
    color: "white",
    fontSize: "20px",
    textAlign:"center"
  },
  pos: {
    color: "white",
    fontSize: "15px",
    textAlign:"right"
  },

  tableTitle:{
    color:"black",
    fontSize: "20px",
    textAlign:"center"
  },
  tableContainer:{
    width:"30em",
    margin:"3em"
      // marginLeft:"4%"
  },
  div:{
    // marginLeft:"8%"
  }
});
const DashBoard = () => {
  const [customerNumber, setcustomerNumber] = useState(0)
  const [totalOrders , setTotalOrders] = useState(0);
  const [totalPrice , setTotalPrice ] = useState(0);
  const [todayOrder, settodayOrder] = useState(0)
  const [todayPending, setTodayPending] = useState(0);
  const [todayDelivered, setTodayDelivered] = useState(0);
    const [todayRejected, setTodayRejected] = useState(0);
    const [thisWeekPending, setthisWeekPending] = useState(0);
    const [thisWeekDelivered, setthisWeekDelivered] = useState(0);
      const [thisWeekRejected, setthisWeekRejected] = useState(0);
      const [thisWeekOrder, setthisWeekOrder] = useState(0)
      const [thisMonthPending, setthisMonthPending] = useState(0);
      const [thisMonthDelivered, setthisMonthDelivered] = useState(0);
        const [thisMonthRejected, setthisMonthRejected] = useState(0);
        const [thisMonthOrder, setthisMonthOrder] = useState(0)
  
  ref.firestore().collection('users').get().then(snap => {
    setcustomerNumber(snap.size) // will return the collection size

  });
  // //console.log(customerNumber)
  ref.firestore().collection('orders').get().then(snap => {
    setTotalOrders(snap.size) // will return the collection size
  });
  
  //  ref.firestore().collection("orders").onSnapshot((querySnapshot) => {
    
    //   querySnapshot.forEach((doc) => {
      
      //     doc.data().total_price
      
      //   });
      //   // setOrders(items);
      //   // setLoading(false);
      //   // //console.log("accepted Orders");
        // }
        var st = 0
        ref.firestore().collection("orders").onSnapshot((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            if(doc.get("total_price")){

              st = doc.get("total_price")+st
            }
            
            // //console.log(st)
          })
          setTotalPrice(st)
        })
        const reference = ref.firestore().collection("orders")
        let today =  Date()
        let counter = 0;
        let pending = 0;
        let delivered = 0;
        let rejected = 0;
        // //console.log(today)
        reference.onSnapshot((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            //  //console.log(moment(doc.get("order_time")).format('l'))
            // //console.log("this week" +moment(doc.get("order_time")).calendar())
            // //console.log("this" + moment(today).calendar())
            if(moment(doc.get("order_time")).format('l')==moment(today).format('l')){
              counter = counter+1;
              if(doc.get("order_status")==="Pending"){
                pending = pending + 1;
              }
              else if(doc.get("order_status")==="Delivered"){
                delivered = delivered + 1;
              }
              else if(doc.get("order_status")==="Rejected"){
                rejected = rejected + 1;
              }
            }
            // //console.log("counter "+moment(today).format('l'))
          })
          // //console.log("counter "+counter)
          // //console.log(pending)
          setTodayPending(pending)
          setTodayDelivered(delivered)
          setTodayRejected(rejected)
          settodayOrder(counter)
          // setTotalPrice(st)
        })




        let counter2 = 0;
        let pending2 = 0;
        let delivered2 = 0;
        let rejected2 = 0;
        // //console.log(moment().startOf('week').format("l"));
        reference.onSnapshot((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            //  //console.log(moment(doc.get("order_time")).format('l'))
            if(moment(doc.get("order_time")).calendar()>=moment().startOf('week').format("l")){
              counter2 = counter2+1;
              if(doc.get("order_status")==="Pending"){
                pending2 = pending2 + 1;
              }
              else if(doc.get("order_status")==="Delivered"){
                delivered2 = delivered2 + 1;
              }
              else if(doc.get("order_status")==="Rejected"){
                rejected2 = rejected2 + 1;
              }
            }
            // //console.log("counter3 "+moment(today).format('l'))
          })
          //console.log("counter2 "+counter2)
          // //console.log(pending3)
          setthisWeekPending(pending2)
          setthisWeekDelivered(delivered2)
          setthisWeekRejected(rejected2)
          setthisWeekOrder(counter2)
        })



        let counter3 = 0;
        let pending3 = 0;
        let delivered3 = 0;
        let rejected3 = 0;

        reference.onSnapshot((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            //  //console.log(moment(doc.get("order_time")).format('l'))
            if(moment(doc.get("order_time")).calendar()>=moment().startOf('month').format("l")){
              counter3 = counter3+1;
              if(doc.get("order_status")==="Pending"){
                pending3 = pending3 + 1;
              }
              else if(doc.get("order_status")==="Delivered"){
                delivered3 = delivered3 + 1;
              }
              else if(doc.get("order_status")==="Rejected"){
                rejected3 = rejected3 + 1;
              }
            }
            // //console.log("counter3 "+moment(today).format('l'))
          })
          // //console.log("counter3 "+counter3)
          // //console.log(pending3)
          setthisMonthPending(pending3)
          setthisMonthDelivered(delivered3)
          setthisMonthRejected(rejected3)
          setthisMonthOrder(counter3)
        })











        // //console.log("forcheck" +moment().subtract(6, 'days').calendar())


        function createData(name, calories ){
            return { name, calories };
          }
        const rows = [
          createData('Total Orders', todayOrder),
          // createData('Total Sales', 452),
          createData('Pending Orders', todayPending),
            createData('Delivered Orders', todayDelivered),
            createData('Rejected Orders', todayRejected),
        
          ]

      const weekrows = [
        createData('Total Orders', thisWeekOrder),
        // createData('Total Sales', 452),
        createData('Pending Orders', thisWeekPending),
          createData('Delivered Orders', thisWeekDelivered),
          createData('Rejected Orders', thisWeekRejected),
      
        ]

        const monthrows = [
          createData('Total Orders', thisMonthOrder),
          // createData('Total Sales', 452),
          createData('Pending Orders', thisMonthPending),
            createData('Delivered Orders', thisMonthDelivered),
            createData('Rejected Orders', thisMonthRejected),
        
          ]
        
        const classes = useStyles();
        return (
          <Card style={{width:"78vw",height:"80vh"}}>

      <div className={classes.root}>
        <CardContent className={classes.content} >
          <Typography className={classes.title}>Total Orders</Typography>
          <Typography className={classes.pos} color="textSecondary">
            {totalOrders}
          </Typography>
        </CardContent>
        <CardContent className={classes.content} >
          <Typography className={classes.title}>Total Customers</Typography>
          <Typography className={classes.pos} color="textSecondary">
          {customerNumber}
          </Typography>
        </CardContent>
        <CardContent className={classes.content} >
          <Typography className={classes.title}>Total Order Value</Typography>
          <Typography className={classes.pos} color="textSecondary">
            {totalPrice}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </div>
      <div className={classes.root}>

          <div className={classes.tableContainer}>
          <Typography variant="h4" className={classes.tableTitle}>
              Today
          </Typography>
              <TableContainer component={Paper} >

            <Table>
              <TableBody>
                  {rows.map(row=>(

                <TableRow>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.calories}
                    </TableCell>
                    <TableCell>
                        {row.fat}
                    </TableCell>


                </TableRow>
                  ))}
              </TableBody>
            </Table>
              </TableContainer>
          </div>
          <div className={classes.tableContainer}>
        <Typography variant="h4" className={classes.tableTitle}>
              This week
          </Typography>
              <TableContainer component={Paper} >

            <Table>
              <TableBody>
                  {weekrows.map(row=>(

                <TableRow>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.calories}
                    </TableCell>
                    <TableCell>
                        {row.fat}
                    </TableCell>


                </TableRow>
                  ))}
              </TableBody>
            </Table>
              </TableContainer>
          </div>
       
          <div className={classes.tableContainer}>
        <Typography variant="h4" className={classes.tableTitle}>
              This Month
          </Typography>
              <TableContainer component={Paper} >

            <Table>
              <TableBody>
                  {monthrows.map(row=>(

                <TableRow>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.calories}
                    </TableCell>
                    <TableCell>
                        {row.fat}
                    </TableCell>


                </TableRow>
                  ))}
              </TableBody>
            </Table>
              </TableContainer>
          </div>
      </div>
      

   


    </Card>
  );
};

export default DashBoard;
