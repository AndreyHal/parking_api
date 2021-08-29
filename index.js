const express = require('express');
const userRouter = require('./routes/user.routes');
const parkingRouter = require('./routes/parking.routes');
const reservationRouter = require('./routes/reservation.routes');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', parkingRouter);
app.use('/api', reservationRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));