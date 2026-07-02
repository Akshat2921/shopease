import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { asyncCurrentUser } from "./store/reducers/userSlice";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Mainroutes } from "./routes/Mainroutes";

const App = () => {
  const dispatch = useDispatch();

  // restore session (if any) from localStorage on first load
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 px-[10%] font-sans text-white">
      <NavBar />
      <main className="flex-1 pb-16">
        <Mainroutes />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2200}
        hideProgressBar
        newestOnTop
      />
    </div>
  );
};

export default App;
