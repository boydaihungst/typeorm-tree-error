import 'reflect-metadata';
import App from './app';
import Container from 'typedi';

Container.set('port', +process.env.PORT || 3001);
const app = Container.get(App);
app.initialize().then(() => app.start());
export default app.app;
