import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProp {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProp) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
