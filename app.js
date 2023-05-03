const express = require("express");
const path = require("path");
const noteRoutes = require("./routes/index");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(noteRoutes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, (_) => {
  console.log(`Server started on port ${PORT}`);
});
