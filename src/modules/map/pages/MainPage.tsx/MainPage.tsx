import { Outlet } from "react-router";
import { Footer, Header } from "../../../../common/components";

export const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
