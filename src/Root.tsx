import { Provider as ReduxProvider } from "react-redux";

import store from './redux/store'

import App from "./views/App";

function Root() {
  return (
    <>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </>
  );
}

export default Root;
