// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Depuração: Verificar a variável de ambiente
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Importar Rotas
const authRoutes = require('./routes/authRoutes');
const pontoRoutes = require('./routes/pontoRoutes');

// Usar Rotas
app.use('/api/auth', authRoutes);
app.use('/api/ponto', pontoRoutes);

// Rotas de Teste
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Iniciar o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
