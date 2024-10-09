import React, { useEffect, useState } from "react";
import CartItem from "./CartItem"; // Assuming you have a CartItem component
import "./Cart.css";
import axios from "axios";
import { BaseURL } from "../../global";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import QRCode from '../../QRCode/google pay qrcode.jpg'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import toast from "react-hot-toast";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const [change, setChange] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [paymentType, setPaymentType] = useState('cash');
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState({ payment_type: "cash" });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`${BaseURL}/cart/get`, { headers: { 'auth-token': token } })
            .then((res) => {
                if (res.data.success) {
                    setCartItems(res.data.cart);
                    setOrders(res.data.orders)
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
                toast.error("Error fetching cart");
            });
    }, [change]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.amount, 0).toFixed(2);
    };

    const handleDelete = (id) => {
        setChange(true);
        axios.delete(`${BaseURL}/cart/delete/${id}`)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Product removed from the cart");
                    setChange(false);
                } else {
                    toast.error("Something went wrong");
                    setChange(false);
                }
            });
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        setChange(true);
        let token = localStorage.getItem('token');
        
        // Prepare the data for the request
        const data = { quantity: newQuantity };
    
        axios.put(`${BaseURL}/cart/update/${id}`, data, { headers: { 'auth-token': token } })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Cart updated successfully");
                } else {
                    toast.error("Something went wrong");
                }
                setChange(false);
            })
            .catch((error) => {
                console.error("Error updating cart:", error);
                toast.error("Error updating cart");
                setChange(false);
            });
    };

    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: '80vh', // Added maxHeight for scrolling
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Added scrolling
    };
    const style2 = {
         maxHeight: '80vh', // Added maxHeight for scrolling
        overflowY: 'auto', // Added scrolling
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "20px",
        //overflow: "hidden",
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
        setDetails({ ...details, [event.target.name]: event.target.value })
    };

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        setChange(true)
        let token = localStorage.getItem('token');
        let data = { ...details, amount: calculateTotal() }
        axios.post(`${BaseURL}/order/insert`, data, { headers: { 'auth-token': token } })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Order successful")
                    setChange(false)
                    handleClose()
                } else {
                    setChange(false)
                    toast.error("Something went wrong");
                }
            });
    }

    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const handleToggleDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="cart-page">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Shipping and Payment Details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField required onChange={handleChange} name="name" fullWidth label="Name" margin="normal" />
                        <TextField required onChange={handleChange} name="phone" fullWidth label="Phone" margin="normal" />
                        <TextField required type="email" title="Please Enter Correct Email" onChange={handleChange} name="email" fullWidth label="Email" margin="normal" />
                        <TextField required onChange={handleChange} name="address" fullWidth label="Address" margin="normal" multiline rows={3} />
                        <TextField required onChange={handleChange} name="pincode" fullWidth label="Pincode" margin="normal" />
                        <TextField
                            fullWidth
                            label="Total Amount"
                            margin="normal"
                            onChange={handleChange}
                            value={`Rs. ${calculateTotal()}`}
                            InputProps={{
                                readOnly: true,
                            }}
                            name="amount"
                        />
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Payment Type</FormLabel>
                            <RadioGroup
                                row
                                value={paymentType}
                                onChange={handlePaymentTypeChange}
                                name="payment_type"
                                required
                            >
                                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                            </RadioGroup>
                        </FormControl>
                        {paymentType === 'upi' && (
                            <>
                                <Typography variant="body1" component="div">
                                    UPI QR Code
                                </Typography>
                                <img style={{ height: "400px", width: "100%" }} src={QRCode} alt="UPI QR Code" />
                                <TextField
                                    fullWidth
                                    label="Transaction ID"
                                    margin="normal"
                                    name="transaction_id"
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ ...style2 }}>
                    <Typography id="modal-title" variant="h6" component="h2" gutterBottom
                        sx={{ fontWeight: "bold", color: "#333" }}
                    >
                        Order Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                        <Table aria-label="order details table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <React.Fragment key={order._id}>
                                        <TableRow>
                                            <TableCell>{order._id}</TableCell>

                                            <TableCell align="right">Rs.{order.amount}</TableCell>
                                            <TableCell align="right">{order.status}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleToggleDetails(order._id)}
                                                    endIcon={expandedOrderId === order._id ? <ExpandLess /> : <ExpandMore />}
                                                    sx={{ textTransform: "none" }}
                                                >
                                                    {expandedOrderId === order._id ? 'Hide Details' : 'Show Details'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {expandedOrderId === order._id && (
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <TableContainer component={Paper}>
                                                        <Table aria-label="product details table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                                                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Price</TableCell>
                                                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                                                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Total</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {order.product_details.map((product) => (
                                                                    <TableRow key={product.product_id._id}>
                                                                        <TableCell>{product.product_id.name}</TableCell>
                                                                        <TableCell align="right">Rs.{product.product_id.price}</TableCell>
                                                                        <TableCell align="right">{product.quantity}</TableCell>
                                                                        <TableCell align="right">Rs.{(product.product_id.price * product.quantity).toFixed(2)}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>

            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem 
                                handleDelete={handleDelete} 
                                onUpdateQuantity={handleUpdateQuantity}
                                key={item._id} 
                                item={item} 
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: "center" }}>Your cart is empty</p>
                    )}
                    <Button variant="contained" onClick={handleOpen2}>View Status</Button>
                </div>

                {cartItems.length > 0 && <div className="cart-summary">
                    <h2>Summary</h2>
                    <div className="summary-details">
                        <p>Total Items: {cartItems.length}</p>
                        <p>Total Price: Rs. {calculateTotal()}</p>
                    </div>
                    <button onClick={handleOpen} className="checkout-button">
                        Proceed to Checkout
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Cart;
