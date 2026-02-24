import { Body, Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  helloworld() {
    return this.taskService.getAllTasks();
  }
}
