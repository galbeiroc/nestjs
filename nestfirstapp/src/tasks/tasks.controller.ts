import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  helloworld() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDTO) {
    const { title, description } = newTask;
    console.log(title, description);

    return this.taskService.createTask(title, description);
  }
}
