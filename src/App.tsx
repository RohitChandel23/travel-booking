import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Store";
import RootRouter from "./Routes/RootRouter";
import "./App.css";
import { AppKitProvider } from './Shared/AppkitProvider/AppkitFile';

const baseName = import.meta.env.VITE_BASE_NAME;
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<RootRouter />} />),
  { basename: baseName }
);

function App() {
  return (
    <AppKitProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HelmetProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-right" autoClose={3000} />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </AppKitProvider>
  );
}

export default App;
