import type {JSX} from "@emotion/react/jsx-runtime";
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getTasks} from "../../entities/task/model/selectors/GetTasks";
import TaskList from "../../entities/task/ui/TaskList";
import TaskFilterPanel from "../../entities/task/ui/TaskFilterPanel";
import {setFilter} from "../../entities/task/model/taskFilterSlice";
import {getTaskFilters} from "../../entities/task/model/selectors/GetTaskFilters ";

function MainPage(): JSX.Element {
  const tasks = useSelector(getTasks);
  const filters = useSelector(getTaskFilters);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((task) => {
    const byPriority = !filters.priority || task.priority === filters.priority;
    const byCategory = !filters.category || task.category === filters.category;
    const byStatus = !filters.status || task.status === filters.status;
    const bySearch =
      !filters.search ||
      task.title.toLowerCase().startsWith(filters.search.toLowerCase());
    return byPriority && byCategory && byStatus && bySearch;
  });

  return (
    <>
      <Container>
        <TaskFilterPanel
          selected={filters}
          onSelect={(key, value) => dispatch(setFilter({key, value}))}
        />
        <TaskList tasks={filteredTasks}></TaskList>
      </Container>
    </>
  );
}

export default MainPage;
