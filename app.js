const express = require('express');
const cors = require('cors');

const registerRoute = require('./routes/registerRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
