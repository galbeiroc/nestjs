import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Task, TaskStatus } from './task.entity';

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

  updateTask() {}

  deleteTask(id: string) {
    // const index = this.tasks.findIndex((task) => task.id === id);
    // this.tasks.splice(index, 1);
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.tasks;
  }
}
