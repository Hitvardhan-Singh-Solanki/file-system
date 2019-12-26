import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

console.tron = Reactotron;

export default Reactotron.configure({ name: 'File system' })
  .use(reactotronRedux())
  .connect();
