import { CRUDRepositoryInterface } from '@taskforce/core';
import { TaskInterface, TaskStatus } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const TASKS_COUNT = 25;

@Injectable()
export class TaskMemoryRepository implements CRUDRepositoryInterface<TaskEntity, string, TaskInterface> {
  private repository: { [key: string]: TaskInterface } = {};

  public async create(item: TaskEntity): Promise<TaskInterface> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID(), status: TaskStatus.New };
    this.repository[entry._id] = entry;
    return { ...entry };
  }

  public async find(): Promise<TaskInterface[]> {
    const allTasks = Object.values(this.repository);
    const newTasks = allTasks.filter((task) => task.status === TaskStatus.New).slice(0, TASKS_COUNT);
    return newTasks;
  }

  public async findById(id: string): Promise<TaskInterface> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async update(id: string, item: TaskEntity): Promise<TaskInterface> {
    this.repository[id] = { ...item.toObject(), _id: id, status: TaskStatus.New };
    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
