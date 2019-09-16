
import { Component, OnInit, Input } from "@angular/core";
import { SelectItem } from "primeng/api";
import { TaskServiceNg } from "../../../services/rest/task.service";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { FormsRegisterService } from "../../../services/forms-register.service";

@Component({
    selector: 'select-variable',
    templateUrl: './select.component.html',
    styleUrls: [],
  })
export class SelectComponent implements OnInit {

    @Input() items: SelectItem[];
    @Input() variableName: string;
    @Input() task: any;
    @Input() label: string;
    @Input() type?: string;

    selectForm: FormGroup;
    
    constructor(private taskService: TaskServiceNg, private fb: FormBuilder, private formsRegisterService: FormsRegisterService){}

    ngOnInit(){
      if(!this.type) {
        this.type = 'string';
      }

      this.initFormGroup();
    }

    private initFormGroup() {
      this.selectForm = this.fb.group({
        selected: [null, Validators.required]
      });
      this.formsRegisterService.registerForm(this.selectForm, "selectForm");
    }

    save() {
      this.taskService.setVariable(this.task.task_id,this.variableName, {value: this.selectForm.get('selected').value, type: this.type}).subscribe();
    }

    get selected(): AbstractControl { return this.selectForm.get('selected'); }
    
  }