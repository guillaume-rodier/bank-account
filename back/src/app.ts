import express from 'express';
import compteRoute from './routes/compte.routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/account', compteRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
