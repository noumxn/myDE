import configRoutes from './api/index.js';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
const app = express();
dotenv.config();

configRoutes(app);

const rewriteUnsupportedBrowserMethods = (req, _, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};

app.use(express.json());
app.use(
    session({
        name: 'pyDE',
        secret: 'hello,world!',
        saveUninitialized: false,
        resave: false,
        cookie: {maxAge: 21600000} // 6 hours
    })
);

app.all('/', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else if (req.session.user) {
        return res.redirect('/interpreter');
    } else {
        next();
    }
});
app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/interpreter');
    } else {
        next();
    }
});
app.use('/logout', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else if (req.session.user) {
        return res.redirect('/logout');
    } else {
        next();
    }
});
app.use('/register', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/interpreter');
    } else {
        next();
    }
});
app.use('/interpreter', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else {
        next();
    }
});

app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.listen(process.env.PORT || 5000, () => {
    console.log("We've now got a server!");
});
