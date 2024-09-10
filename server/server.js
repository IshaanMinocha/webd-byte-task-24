import express from 'express';
import envConfig from './config/dotenv.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cookieSession from 'cookie-session';
import session from 'express-session';
import authRoutes from './routes/AuthRoute.js'
import apiRoutes from './routes/ApiRoute.js'
import passport from 'passport';
import './utils/PassportGoogle.js'
import './utils/PassportGithub.js'

envConfig();

const server = express();

const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = path.join(__dirname, '..', 'client', 'dist')

// server.use(cookieSession({
//     name: "Session",
//     keys: [process.env.SESSION_SECRET],
//     maxAge: 24*60*60*100,
// }));
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: false
    }
}));
server.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));
server.use(express.json())
// server.use(express.static(staticDir))
server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', authRoutes);
server.use('/api', apiRoutes);

// server.get('*', (req, res, next) => {
//     return res.sendFile(path.join(staticDir, 'index.html'))
// });

server.listen(port, () =>
    console.log(`Server running on port:${port}`)
)