import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Task, TaskStatus } from './task.entity';
import { UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'First Task',
      description: 'Description of first task',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task | null {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) return null;

    return task;
  }

  updateTask(id: string, updatedTask: UpdateTaskDTO) {
    const task = this.getTaskById(id);

    if (!task) {
      return 'Task not found!';
    }

    const newTask = Object.assign(task, updatedTask);
    this.tasks = this.tasks.map((item) => (item.id === id ? newTask : task));

    return this.tasks;
  }

  deleteTask(id: string) {
    // const index = this.tasks.findIndex((task) => task.id === id);
    // this.tasks.splice(index, 1);
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.tasks;
  }
}
