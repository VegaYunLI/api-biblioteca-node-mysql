import express from 'express';

import bookRoutes from './routes/bookRoutes.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Biblioteca funcionando!'
  });
});

app.use('/livros', bookRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
