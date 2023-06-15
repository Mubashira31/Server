const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn.js')
const PORT = process.env.PORT;
// app.use(json());

app.use(require('./router/auth.js'));

// const postRoutes = require('./router/posts.js')
// app.use('./posts',postRoutes)

app.use(require('./router/posts.js'))

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
