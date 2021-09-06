const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const parkingRouter = require('./routes/parking.routes');
const reservationRouter = require('./routes/reservation.routes');
const auth = require('./middleware/auth');
const PORT = process.env.PORT || 8001;

const app = express();

const whitelist = ['http://localhost:3000']; //white list consumers
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', parkingRouter);
app.use('/api', auth, userRouter);
app.use('/api', auth, reservationRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));