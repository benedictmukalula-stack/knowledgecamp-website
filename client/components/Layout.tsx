import Header from "./Header";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";

function applyInitialTheme() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const stored = window.localStorage.getItem("kc-theme");

  if (stored === "dark" || stored === "light") {
    root.classList.toggle("dark", stored === "dark");
    return;
  }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", prefersDark);
}

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
