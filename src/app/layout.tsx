import {Outlet, useLocation} from "react-router-dom";
import Header from "../widgets/Header/Header";
import TaskDetails from "../features/TaskDetails/ui/TaskDetails";
import { Global } from "@emotion/react";

function AppLayout() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <><Global
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
      <Header/>
      <main>
           {/* Отображаем основную страницу */}
      <Outlet context={state?.backgroundLocation || location} />

      {/* Если есть backgroundLocation — это модалка */}
      {state?.backgroundLocation && <TaskDetails />}
      </main>
    </>
  );
}

export default AppLayout;
