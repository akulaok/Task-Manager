import { Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "../widgets/Header/Header";
import TaskDetails from "../features/ui/TaskDetails/TaskDetails";
import TaskNew from "../features/ui/TaskNew.tsx/TaskNew";
import { Global } from "@emotion/react";

/**
 * Основной layout приложения с Header и поддержкой модальных окон задач.
 */
function AppLayout() {
  const location = useLocation();

  /** Предыдущая страница, если открыт модальный маршрут */
  const state = location.state as { backgroundLocation?: Location };

  const isTaskDetailsRoute = useMatch("/task/:id");
  const isNewTaskRoute = useMatch("/task/new");

  const taskId = isTaskDetailsRoute?.params?.id;
  const showTaskDetails = taskId && taskId !== "new";

  return (
    <>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
      <Header />
      <main>
        <Outlet context={state?.backgroundLocation || location} />
        {state?.backgroundLocation && isNewTaskRoute && <TaskNew />}
        {state?.backgroundLocation && showTaskDetails && <TaskDetails />}
      </main>
    </>
  );
}

export default AppLayout;
