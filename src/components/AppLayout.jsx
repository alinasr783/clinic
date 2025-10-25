import {Outlet} from "react-router-dom";
import AppHeader from "./AppHeader";

function AppLayout() {
  return (
    <div className="bg-dark-1 min-h-screen text-white">
      <div
        className="fixed top-0 left-0 right-0 z-50 
        bg-dark-1 border-b border-gray-900">
        <AppHeader />
      </div>

      <main className="pt-16 sm:pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
