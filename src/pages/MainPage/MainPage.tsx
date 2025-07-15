import type {JSX} from "@emotion/react/jsx-runtime";
import {Container, Grid} from "@mui/material";
import TaskColumn from "../../entities/task/ui/TaskColumn";
import { TASK_STATUSES } from "../../entities/task/model/taskOptions";
import { mockTasks } from "../../entities/task/model/mocks";

function MainPage(): JSX.Element {
  return (
    <>
      <Container>
        <Grid container spacing={14}>
          {TASK_STATUSES.map((status) => {
            const tasks = mockTasks.filter((task) => (task.status == status));
            return (<TaskColumn key={status} title={ status} tasks={tasks}></TaskColumn>)
          })}
        </Grid>
      </Container>
    </>
  );
}

export default MainPage;
