import auth from '../middlewares/';
import { chat, login, welcome } from '../routes/';

class ExpressManager {
  static build(app) {
    app.use(welcome());
    app.use(login());
    app.use(auth);
    app.use(chat());
  }
}

export default ExpressManager;
