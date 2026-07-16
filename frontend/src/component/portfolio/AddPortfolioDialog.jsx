import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

function AddPortfolioDialog({
  open,
  stock,
  onClose,
  onSave,
}) {

  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {

    if (stock) {
      setBuyPrice(stock.Close);
      setQuantity("");
    }

  }, [stock]);

  const handleSave = () => {
  
  
    if (!quantity || !buyPrice) {
      return;
    }
  
    onSave({
      ...stock,
      Quantity: Number(quantity),
      BuyPrice: Number(buyPrice),
    });
  
  
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Add to Portfolio
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField
            label="Stock"
            value={stock?.Symbol || ""}
            disabled
            fullWidth
          />

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Buy Price"
            type="number"
            value={buyPrice}
            onChange={(e) =>
              setBuyPrice(e.target.value)
            }
            fullWidth
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddPortfolioDialog;