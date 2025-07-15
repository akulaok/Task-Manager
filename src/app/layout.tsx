import {Outlet} from "react-router-dom";
import Header from "../widgets/Header/Header";

function AppLayout() {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
