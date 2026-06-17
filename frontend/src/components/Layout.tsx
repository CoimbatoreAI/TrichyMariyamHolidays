import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

import BookingModal from "@/components/BookingModal";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="animate-fade-in">{children}</main>
    <Footer />
    <FloatingButtons />
    <BookingModal />
  </>
);

export default Layout;
