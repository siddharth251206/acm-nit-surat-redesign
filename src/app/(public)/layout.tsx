import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TransitionProvider } from "@/components/motion/TransitionContext";
import PageCurtain from "@/components/motion/PageCurtain";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionProvider>
      <PageCurtain />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </TransitionProvider>
  );
}
