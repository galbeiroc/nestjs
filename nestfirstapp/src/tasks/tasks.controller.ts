import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get('all/') wildcards
  @Get()
  helloworld() {
    return this.taskService.getAllTasks();
  }

  @Post()
  @HttpCode(201)
  createTask(@Body() newTask: CreateTaskDTO) {
    const { title, description } = newTask;

    return this.taskService.createTask(title, description);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id')
  @HttpCode(200)
  updateTask(@Param('id') id: string, @Body() updatedTask: UpdateTaskDTO) {
    return this.taskService.updateTask(id, updatedTask);
  }
}
