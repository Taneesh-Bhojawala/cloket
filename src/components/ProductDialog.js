// import React from "react";

// // Original Context usage
// // import { useCart } from "../context/CartContext";
// // import { useUser } from "../context/UserContext";

// // Redux imports
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart } from "../slices/cartSlice"; // import addToCart action

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   CardMedia,
//   Divider,
//   Rating,
// } from "@mui/material";

// export default function ProductDialog({ open, product, onClose }) {
//   // useContext
//   // const { user } = useUser();
//   // const { cartItems, addToCart } = useCart();

//   // Redux state
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const cartItems = useSelector((state) => {
//   const user = state.cart?.user;
//   const itemsByUser = state.cart?.itemsByUser || {};
//   return user && itemsByUser[user] ? itemsByUser[user] : [];
// });


//   const isInCart = cartItems.some((item) => item.id === product?.id);

//   const handleAddToCart = () => {
//     if (!user) {
//       alert("Please login first!");
//       return;
//     }

//     if (!isInCart) {
//       dispatch(addToCart(product));
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>{product?.title}</DialogTitle>
//       <Divider sx={{ borderBottomWidth: "2px" }} />
//       <DialogContent>
//         <CardMedia
//           component="img"
//           image={product?.thumbnail}
//           alt={product?.title}
//           sx={{ height: 250, objectFit: "contain", mb: 2 }}
//         />
//         <DialogContentText>
//           <strong>Brand:</strong> {product?.brand} <br />
//           <strong>Category:</strong> {product?.category} <br />
//           <strong>Price:</strong> ${product?.price} <br />
//           <strong>Rating:</strong>
//           <Rating value={product?.rating} readOnly sx={{ verticalAlign: "middle", ml: 1 }} />
//           <br /><br />
//           {product?.description}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           sx={{
//             color: "black",
//             backgroundColor: isInCart ? "#ccc" : "rgb(226, 208, 45)",
//             cursor: isInCart ? "not-allowed" : "pointer",
//           }}
//           disabled={isInCart}
//           onClick={handleAddToCart}
//         >
//           {isInCart ? "✔️ Added to cart" : "Add to cart"}
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ color: "black", backgroundColor: "rgb(230, 0, 0)" }}
//           onClick={onClose}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import React from "react";

// Original Context usage
// import { useCart } from "../context/CartContext";
// import { useUser } from "../context/UserContext";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CardMedia,
  Divider,
  Rating,
} from "@mui/material";

export default function ProductDialog({ open, product, onClose, fromCart = false }) {
  const dispatch = useDispatch();

  // Redux state
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => {
    const user = state.cart?.user;
    const itemsByUser = state.cart?.itemsByUser || {};
    return user && itemsByUser[user] ? itemsByUser[user] : [];
  });

  const isInCart = cartItems.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    if (!isInCart) {
      dispatch(addToCart(product));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product?.title}</DialogTitle>
      <Divider sx={{ borderBottomWidth: "2px" }} />
      <DialogContent>
        <CardMedia
          component="img"
          image={product?.thumbnail}
          alt={product?.title}
          sx={{ height: 250, objectFit: "contain", mb: 2 }}
        />
        <DialogContentText>
          <strong>Brand:</strong> {product?.brand} <br />
          <strong>Category:</strong> {product?.category} <br />
          <strong>Price:</strong> ${product?.price} <br />
          <strong>Rating:</strong>
          <Rating value={product?.rating || 0} readOnly sx={{ verticalAlign: "middle", ml: 1 }} />
          <br /><br />
          {product?.description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {fromCart ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              color: "black",
              backgroundColor: isInCart ? "#ccc" : "rgb(226, 208, 45)",
              cursor: isInCart ? "not-allowed" : "pointer",
            }}
            disabled={isInCart}
            onClick={handleAddToCart}
          >
            {isInCart ? "✔️ Added to cart" : "Add to cart"}
          </Button>
        )}

        <Button
          variant="contained"
          sx={{ color: "black", backgroundColor: "rgb(230, 0, 0)" }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
