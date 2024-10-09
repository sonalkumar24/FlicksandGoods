import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Styles from './SingleContent.module.css';
import { unavailable } from "../../config/config";
import { useEffect, useState } from "react";
import { BaseURL } from "../../global";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';


const Products = (props) => {
    const { open, handleClose, id } = props;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            await axios.get(`${BaseURL}/products/get/${id}`)
                .then((res) => {
                    setProducts(res?.data?.products);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchTrending();
    }, [id]);

    const opts = {
        width: "100%",
        host: "https://www.youtube.com",
        height: "400",
        playerVars: {
            autoplay: 1,
        },
    };
    
    const handleAddtoCart = async (pro) => {
        const token = localStorage.getItem("token");
        try {
            let { _id, price } = pro;
            const res = await axios.post(
                `${BaseURL}/cart/insert`,
                { _id, amount: price },
                { headers: { "auth-token": token } }
            );
            console.log(res.data);
            if (res.data.success) {
                toast.success("Added to cart successfully");
                // alert("Added to cart successfully");
            } else {
                toast.error("Something went wrong");
                // alert('Something went wrong');
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <div>
            <Dialog
                component="span"
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: "100%",
                        maxHeight: 600,
                    },
                }}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle id="draggable-dialog-title" component="span">
                    <h2>Products</h2>
                    {handleClose ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent component="span">
                    {products.length === 0 ? (
                        <p>Products currently unavailable.</p>
                    ) : (
                    products.map((pro) => (
                        <div style={{ display: "flex", marginBottom: "20px" }} key={pro._id}>
                            <div style={{ flex: 1 }} className={`${Styles.post} ${Styles.productContainer}`}>
                                <img
                                    className={Styles.image}
                                    style={{ height: "200px", width: "100%" }}
                                    src={pro?.photo ? `${BaseURL}/productImages/${pro?.photo}` : unavailable}
                                    alt={pro.name}
                                />
                                <b className={Styles.title}>{pro?.name}</b>
                            </div>
                            <div style={{ flex:2 , paddingLeft: "20px" }}>
                                <span style={{justifyContent:"space-around"}} className={Styles.typeAndDate}>
                                    <strong>Price:</strong> Rs.{pro?.price}
                                </span>
                                <span style={{justifyContent:"space-around"}}  className={Styles.typeAndDate}>
                                    <strong>Size: </strong> {pro?.size}
                                </span>
                                <span style={{justifyContent:"space-around"}} className={Styles.typeAndDate}>
                                    <strong>Color:</strong> {pro?.color}
                                </span>
                                <IconButton color="warning" onClick={() => handleAddtoCart(pro)} 
                                    sx={{
                                            "&:hover": {
                                            transform: "scale(1.1)",  // Scales the button to 110%
                                            transition: "transform 0.3s ease" // Smooth transition effect
                                        }
                                    }}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </div>
                        </div>
                    
                    ))
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Products;
