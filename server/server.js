import express from 'express';
import envConfig from './config/dotenv.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

envConfig();

const server = express();

const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = path.join(__dirname, '..', 'client', 'dist')

server.use(cors({
    origin: '*'
}));
server.use(express.json())
server.use(express.static(staticDir))

server.get('*', (req, res, next) => {
    return res.sendFile(path.join(staticDir, 'index.html'))
});

server.listen(port, () =>
    console.log(`Server running on port http://localhost:${port}`)
)