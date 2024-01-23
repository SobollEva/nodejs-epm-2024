import express from 'express';
import * as core from 'express-serve-static-core';

import userRouter from './routers/routes';

const app: core.Express  = express();
const PORT = 3000;

app.use(express.json());
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
});

