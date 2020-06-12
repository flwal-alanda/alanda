
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormsRegisterService } from "../../../../services/forms-register.service";
import { Project } from "../../../../models/project";
import { MilestoneService } from "../../../../api/milestone.service";
import { Utils } from "../../../../utils/utils";

@Component({
    selector: 'milestone-select',
    templateUrl: './milestone-select.component.html',
    styleUrls: [],
  })
export class SelectMilestoneComponent implements OnInit {

    @Input() project: Project;
    @Input() displayName: string;
    @Input() msName: string;
    @Input() dateFormat = 'dd.mm.yy';
    @Input() disabled: boolean;

    milestoneForm: FormGroup;

    constructor(private milestoneService: MilestoneService, private fb: FormBuilder, private formsRegisterService: FormsRegisterService){}

    ngOnInit() {
      this.initMilestoneFormGroup();
      this.milestoneService.getByProjectAndMsIdName(this.project.projectId, this.msName).subscribe(ms => {
        if (ms && ms.fc) {
          this.milestoneForm.get('fc').setValue(new Date(ms.fc));
        }
        if (ms && ms.act) {
          this.milestoneForm.get('act').setValue(new Date(ms.act));
        }
      });
    }

    private initMilestoneFormGroup() {
      this.milestoneForm = this.fb.group({
        fc: [null],
        act: [null]
      });
      this.formsRegisterService.registerForm(this.milestoneForm, `${this.displayName}`);
    }

    onChange() {
      const fc = this.milestoneForm.get('fc').value ? Utils.convertUTCDate(new Date(this.milestoneForm.get('fc').value)).toISOString().substring(0,10) : null;
      const act = this.milestoneForm.get('act').value ? Utils.convertUTCDate(new Date(this.milestoneForm.get('act').value)).toISOString().substring(0,10) : null;
      this.milestoneService.updateByProjectAndMsIdName(this.project.projectId, this.msName, fc, act, null, false, false).subscribe();
    }

  }
