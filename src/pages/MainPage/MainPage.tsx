import type {JSX} from "@emotion/react/jsx-runtime";
import {Container} from "@mui/material";
import {useSelector} from "react-redux";
import {getTasks} from "../../entities/task/model/selectors/GetTasks";
import TaskList from "../../entities/task/ui/TaskList";

function MainPage(): JSX.Element {
  const tasks = useSelector(getTasks);
  return (
    <>
      <Container>
        <TaskList tasks={tasks}></TaskList>
      </Container>
    </>
  );
}

export default MainPage;
