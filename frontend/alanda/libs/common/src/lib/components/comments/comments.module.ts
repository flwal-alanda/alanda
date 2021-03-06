import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { TemplateModule } from '@rx-angular/template';
import { BadgeModule } from '../badge/badge.module';
import { AlandaCommentsComponent } from './comments/comments.component';
import { AlandaCommentComponent } from './comment/comment.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { AlandaCommentTagComponent } from './comment-tag/comment-tag.component';

const DECLARATIONS = [
  AlandaCommentsComponent,
  AlandaCommentComponent,
  AlandaCommentTagComponent,
];
@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    ButtonModule,
    ReactiveFormsModule,
    BadgeModule,
    PanelModule,
    ScrollPanelModule,
    InputTextareaModule,
    InputTextModule,
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class CommentsModule {}
