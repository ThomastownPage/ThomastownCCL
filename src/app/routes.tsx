import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Concerts = lazy(() => import("./pages/Concerts"));
const Facilities = lazy(() => import("./pages/Facilities"));
const News = lazy(() => import("./pages/News"));
const Contact = lazy(() => import("./pages/Contact"));
const TidyTowns = lazy(() => import("./pages/TidyTowns"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

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
