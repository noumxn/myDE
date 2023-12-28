import interpreterRoutes from './interpreter.js';
import authRoutes from './auth.js';
import registerRoutes from './register.js';

const constructorMethod = (app) => {
  app.use('/login', authRoutes);
  app.use('/register', registerRoutes);
  app.use('/interpreter', interpreterRoutes);
  app.use('*', (_, res) => {
    res.redirect('/login');
  });
};

export default constructorMethod;
