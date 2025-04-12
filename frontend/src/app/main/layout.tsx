import { Outlet } from 'react-router-dom';
import NavTop from "@/components/navigation/nav-top";

export const PageLayout = () => {
  return (
    <section className="min-h-screen w-full flex flex-col">
      <header className="w-full ">
        <NavTop />
      </header>

      <section className="w-full h-full">
        <Outlet />
      </section>
    </section>
  );
};
