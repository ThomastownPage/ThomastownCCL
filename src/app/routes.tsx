import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import History from "./pages/History";
import Concerts from "./pages/Concerts";
import Facilities from "./pages/Facilities";
import News from "./pages/News";
import Contact from "./pages/Contact";
import TidyTowns from "./pages/TidyTowns";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "history", Component: History },
      { path: "concerts", Component: Concerts },
      { path: "facilities", Component: Facilities },
      { path: "news", Component: News },
      { path: "contact", Component: Contact },
      { path: "tidytowns", Component: TidyTowns },
    ],
  },
  { path: "/admin/login", Component: AdminLogin },
  { path: "/admin", Component: AdminPanel },
]);
