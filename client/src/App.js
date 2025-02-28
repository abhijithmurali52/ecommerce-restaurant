import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homecopy";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { UserProvider } from "./Components/UserContext";
import { AdminProvider } from "./Components/AdminContext";
import { CartProvider } from "./Components/CartContext";
import AdminRegister from "./Components/AdminRegister";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import Items from "./Components/Items";
import Menu from "./Components/Menu1";
import Cart from "./Components/Cart";
import AdminOrders from "./Components/AdminOrders";
import OrderHistory from "./Components/OrderHistory";
import AdminOrderHistory from "./Components/AdminOrderHistory";
import TableGrid from "./Components/TableGrid";
import AdminTable from "./Components/AdminTable";
import TableReservation from "./Components/TableReservation";
import AdminTableReservationList from "./Components/AdminTableReservationList";
import Reservation from "./Components/Reservation";
import Contact from "./Components/Contact2";
import StaticMenu from "./Components/StaticMenu";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <UserProvider>
        <AdminProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about1" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adminregister" element={<AdminRegister />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/items" element={<Items />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<AdminOrders />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
                <Route path="/admin-order-history" element={<AdminOrderHistory />} />
                <Route path="/tableBooking" element={<TableGrid />} />
                <Route path="/adminTable" element={<AdminTable />} />
                <Route path="/tableReservation" element={<TableReservation />} />
                <Route path="/admintablelist" element={<AdminTableReservationList />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/staticmenu" element={<StaticMenu />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AdminProvider>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
