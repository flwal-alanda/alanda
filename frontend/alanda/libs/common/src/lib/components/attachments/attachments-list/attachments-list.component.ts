import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SimpleDocument } from '../../../api/models/simpleDocument';
import { DomSanitizer } from '@angular/platform-browser';
import { AlandaDocumentApiService } from '../../../api/documentApi.service';

@Component({
  selector: 'alanda-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.scss'],
})
export class AttachmentsListComponent implements OnInit {
  @Input() currentFiles: SimpleDocument[];
  @Input() data: any;
  @Output() deleteFile = new EventEmitter<void>();

  selectionValue: SimpleDocument;
  fileColumns: any[];
  previewExtensions = ['jpg', 'jpeg', 'gif', 'png', 'pdf'];
  previewContent: { id: string; pdf: boolean };

  constructor(
    private readonly documentService: AlandaDocumentApiService,
    public sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.fileColumns = [
      { field: 'name', header: 'Name', sort: true },
      {
        field: 'lastModified',
        header: 'Last Modified',
        prio: 'ui-p-5',
        sort: true,
      },
      { field: 'size', header: 'Size', sort: true },
      { field: 'action', header: 'Action', sort: false },
    ];
  }

  setPreview(file) {
    this.previewContent = { id: null, pdf: false };
    this.previewContent.id = file.guid;
    if (file.name.endsWith('.pdf')) {
      this.previewContent.pdf = true;
    }
  }

  download(fileId: number): string {
    return this.documentService.getDownloadUrl(
      this.data.refObjectType,
      this.data.guid,
      this.data.selectedNode.id,
      fileId,
      true,
      this.data.selectedNode.mapping,
    );
  }

  previewAllowed(fileName: string): boolean {
    const ext = fileName.split('.').pop().toLowerCase();
    return this.previewExtensions.includes(ext);
  }

  onDeleteFile(file: SimpleDocument) {
    this.documentService
      .deleteFile(
        this.data.refObjectType,
        this.data.guid,
        this.data.selectedNode.id,
        +file.guid,
        this.data.selectedNode.mapping,
      )
      .subscribe((res) => {
        this.currentFiles.splice(this.currentFiles.indexOf(file), 1);
        this.deleteFile.emit();
      });
  }
}
