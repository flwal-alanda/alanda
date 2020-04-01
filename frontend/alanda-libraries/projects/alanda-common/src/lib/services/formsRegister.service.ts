import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AlandaTask } from '../api/models/task';
import { AlandaTaskApiService } from '../api/taskApi.service';

@Injectable()
export class AlandaFormsRegisterService {

  private formGroup: FormGroup = new FormGroup({});
  private loading = false;

  constructor(private taskService: AlandaTaskApiService, private messageService: MessageService, private router: Router) {}

  public isValid(): boolean {
    return this.formGroup.valid;
  }

  get $formGroup(): FormGroup {
    return this.formGroup;
  }

  public registerForm(formGroup: FormGroup, identifier: string) {
    this.formGroup.addControl(identifier, formGroup);
  }

  public clear() {
    this.formGroup.reset();
  }

  public touch() {
    Object.keys(this.formGroup.controls).forEach(key => {
      const nestedForm = this.formGroup.get(key) as FormGroup;
      Object.keys(nestedForm.controls).forEach(key => {
        nestedForm.get(key).updateValueAndValidity();
        nestedForm.get(key).markAsTouched();
      });
    });
  }

  public submit(task: AlandaTask) {
    if (this.isValid() && !this.loading) {
      this.loading = true;
      this.taskService.complete(task.task_id).subscribe(
        res => {
          this.clear();
          this.messageService.add({severity: 'success', summary: 'Task completed', detail: `Task ${task.task_name} has been completed`});
          this.router.navigate(['tasks/list']);
        },
        error => {
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Could not complete task', detail: error.message});
        });
    } else {
      this.messageService.add({severity: 'error', summary: 'Could not complete task', detail: 'Please fill out all required fields'});
      this.touch();
    }
  }
}