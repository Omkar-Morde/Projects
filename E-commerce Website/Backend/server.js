const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static("../frontend"));

// Mock API endpoint
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Fresh Apples", price: 2.99 },
    { id: 2, name: "Organic Bananas", price: 1.99 },
    { id: 3, name: "Sweet Oranges", price: 3.49 },
  ]);
});

app.post("/api/checkout", (req, res) => {
  // Process checkout
  console.log("Received order:", req.body);
  res.json({ success: true, message: "Order placed successfully!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
