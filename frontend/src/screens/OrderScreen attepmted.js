import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

import { Flex, Box, Text, Heading } from "rebass";
import styled from "styled-components";
//import logo from "./logo.svg";
import { FormComponent, FormContainer } from "react-authorize-net"; 

const clientKey = "9e24H7GqU26wNV5m";
const apiLoginId = "734DkGFLgU";
console.log(clientKey,apiLoginId)

type State = {
    status: "paid" | "unpaid" | ["failure", string[]];
  };

  const Button = styled.button({
    "&:hover": { cursor: "pointer" },
    padding: "10px",
    backgroundColor: "white",
    border: "2px solid black",
    fontWeight: 600,
    borderRadius: "2px"
  });

  const ErrorComponent = (props: {
    errors: string[];
    onBackButtonClick: () => void;
  }) => (
    <div>
      <Text fontSize={3} fontWeight={"500"} mb={3}>
        Failed to process payment
      </Text>
      {props.errors.map(error => (
        <Text py={2}>{error}</Text>
      ))}
      <Button onClick={props.onBackButtonClick}>Go Back</Button>
    </div>
  );
  
  const Header = props => (
    <Flex py={4}>
      <Heading>react-authorize-net-example</Heading>
    </Flex>
  );




export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
            <ul>











  onErrorHandler = (response: any) => {
    this.setState({
      status: ["failure", response.messages.message.map(err => err.text)]
    })
}

  onSuccessHandler = (response: any) => {
    // Process API response on your backend...
    this.setState({ status: ["failure", []] })

  };

  render() {
    return (
      <Box className="App" p={3}>
        <Header />
        {this.state.status === "paid" ? (
          <Text fontWeight={"500"} fontSize={3} mb={4}>
            Thank you for your payment!
          </Text>
        ) : this.state.status === "unpaid" ? (
          <FormContainer
            environment="sandbox"
            onError={this.onErrorHandler}
            onSuccess={this.onSuccessHandler}
            amount={23}
            component={FormComponent}
            clientKey={clientKey}
            apiLoginId={apiLoginId}
          /> 
        ) : this.state.status[0] === "failure" ? (
          <ErrorComponent
            onBackButtonClick={() => this.setState({ status: "unpaid" })}
            errors={this.state.status[1]}
          />
        ) : null}
      </Box>
    );
  }
}




            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationNet;