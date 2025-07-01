// import React from "react";
// import { Box, Typography, Divider } from "@mui/material";

// export default function CartItem({ item }) {
//     return (
//         <Box sx={{ mb: 1 }}>
//             <Typography>{item.title} - ${item.price.toFixed(2)}</Typography>
//             <Divider sx={{ my: 1 }} />
//         </Box>
//     );
// }
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function CartItem({ item }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>
          {item.title} - ${item.price.toFixed(2)}
        </Typography>
        <Box
          component="img"
          src={item.thumbnail}
          alt={item.title}
          sx={{
            width: 50,
            height: 50,
            objectFit: "contain",
            borderRadius: 1,
            ml: 2,
          }}
        />
      </Box>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}
