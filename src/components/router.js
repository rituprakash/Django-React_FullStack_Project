import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Admin_Login from "./auth/Admin_Login";
import Admin_Signup from "./auth/Admin_Signup";
import User_Login from "./auth/User_Login";
import User_Signup from "./auth/User_Signup";
import AdminListMovie from "../componentAdmin/auth/adminMovieList";
import AddMovie from "../componentAdmin/auth/AddMovie";
import AdminEditMovie from "../componentAdmin/auth/adminMovieEdit";
import AdminDeleteMovie from "../componentAdmin/auth/AdminDeleteMovie";
import AdminLogout from "../componentAdmin/auth/AdminLogout";
import UserMovieList from "../componentsUser/auth/UserMovieList";
import UserViewMovie from "../componentsUser/auth/userViewMovie";
import BookingForm from "../componentsUser/auth/BookingForm";
import UserLogout from "../componentsUser/auth/UserLogout";
import ConfirmationPage from "../componentsUser/auth/ConfirmationPage";
import BookingHistory from "../componentsUser/auth/BookingHistory";
import Login from "./auth/Admin_Login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'Login/', element: <Login/> },
    { path: 'Admin_Signup/', element: <Admin_Signup/> },
    { path: 'User_Signup/', element: <User_Signup/> },
    { path: 'AdminListMovie/', element: <AdminListMovie/> },
    { path: 'AddMovie/', element: <AddMovie/> },
    { path: 'AdminEditMovie/:id', element: <AdminEditMovie/> },
    { path: 'AdminDeleteMovie/:movieId', element: <AdminDeleteMovie/> },
    { path: 'AdminLogout/', element: <AdminLogout/> },

    { path: 'UserMovieList/', element: <UserMovieList/> },
    { path: 'userViewMovie/:movieId', element: <UserViewMovie/> },
    { path: '/BookingForm/:movieId/:title', element: <BookingForm/> },
    { path: 'UserLogout/', element: <UserLogout/> },
    { path: 'ConfirmationPage/:userId/:movieTitle/:backendBookingId', element: <ConfirmationPage /> },
    { path: 'BookingHistory/:userId/', element: <BookingHistory/> },

]);

export default router;


