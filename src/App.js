
import Main from './component/Main';
import './style/component.css';
import './style/App.css';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Main component={<Outlet/>}/>
    </div>
    </Provider>
  );
}

export default App;
