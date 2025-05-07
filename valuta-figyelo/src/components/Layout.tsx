//import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
/* interface LayoutProp {
  children: ReactNode;
} */
export default function Layout() {
  return (
    <>
      <Header />
      <div className="container-lg container-fluid border">
        <h1>Üdvözlet az árfolyam figyelőn</h1>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
