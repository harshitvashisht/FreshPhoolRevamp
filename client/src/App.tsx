import React, { useEffect } from "react";
import ComingSoonPage from "./components/pages/ComingSoon";
import DailyFlowersPage from "./components/pages/DailyFlowers";
import DeliveryPage from "./components/pages/Delivery";
import GarlandsPage from "./components/pages/Garlands";
import IndexPage from "./components/pages/Index";
import AdminDashboardPage from "./components/pages/AdminDashboard";
import LoginPage from "./components/pages/LoginPage";
import PayIndexPage from "./components/pages/PayIndex";
import RegisterPage from "./components/pages/RegisterPage";
import UserDashboardPage from "./components/pages/UserDashboard";
import JourneyPage from "./components/pages/Journey";
import LookAPage from "./components/pages/LookA";
import LookBPage from "./components/pages/LookB";
import LookCPage from "./components/pages/LookC";
import LooksPage from "./components/pages/Looks";
import NorthBangalorePage from "./components/pages/NorthBangalore";
import PujaPage from "./components/pages/Puja";
import { loadLegacyRuntime } from "./legacyRuntime";

function pageExtraCss(path: string): string[] {
  const styles: Record<string, string> = {
    "/journey.html": "/css/fp-journey.css",
    "/journey": "/css/fp-journey.css",
    "/coming-soon.html": "/page-styles/coming-soon.css",
    "/look-b.html": "/page-styles/look-b.css",
    "/look-c.html": "/page-styles/look-c.css",
    "/looks.html": "/page-styles/looks.css",
    "/admin/index.html": "/page-styles/admin.css",
    "/admin": "/page-styles/admin.css",
    "/pay/index.html": "/page-styles/pay.css",
    "/pay": "/page-styles/pay.css",
  };
  const css = styles[path];
  return css ? [css] : [];
}

function pageExtraScripts(path: string): string[] {
  if (path === "/admin/index.html" || path === "/admin") {
    return ["/page-scripts/admin.js"];
  }
  if (path === "/pay/index.html" || path === "/pay") {
    return ["/page-scripts/pay.js"];
  }
  return [];
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isAppShell =
    path === "/login" ||
    path === "/register" ||
    path === "/dashboard" ||
    path.startsWith("/dashboard/") ||
    path === "/admin" ||
    path.startsWith("/admin/");

  useEffect(() => {
    if (isAppShell) {
      const fonts = [
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      ];
      const css = ["/page-styles/dashboard.css"];
      const links = [...fonts, ...css].map((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
        return link;
      });
      return () => links.forEach((l) => l.remove());
    }
    return loadLegacyRuntime(pageExtraCss(path), pageExtraScripts(path));
  }, [path, isAppShell]);

  if (path === "/login") return <LoginPage />;
  if (path === "/register") return <RegisterPage />;
  if (path === "/dashboard" || path.startsWith("/dashboard/")) return <UserDashboardPage />;
  if (path === "/admin" || path.startsWith("/admin/")) return <AdminDashboardPage />;

  if (path === "/coming-soon.html" || path === "/coming-soon" ) return <ComingSoonPage />;
  if (path === "/daily-flowers.html" || path === "/daily-flowers" ) return <DailyFlowersPage />;
  if (path === "/delivery.html" || path === "/delivery" ) return <DeliveryPage />;
  if (path === "/garlands.html" || path === "/garlands" ) return <GarlandsPage />;
  if (path === "/" || path === "/index" ) return <IndexPage />;
  if (path === "/journey.html" || path === "/journey" ) return <JourneyPage />;
  if (path === "/look-a.html" || path === "/look-a" ) return <LookAPage />;
  if (path === "/look-b.html" || path === "/look-b" ) return <LookBPage />;
  if (path === "/look-c.html" || path === "/look-c" ) return <LookCPage />;
  if (path === "/looks.html" || path === "/looks" ) return <LooksPage />;
  if (path === "/north-bangalore.html" || path === "/north-bangalore" ) return <NorthBangalorePage />;
  if (path === "/puja.html" || path === "/puja" ) return <PujaPage />;
  if (path === "/pay/index.html" || path === "/pay") return <PayIndexPage />;
  return <IndexPage />;
}
