import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExtendedTreeNode } from '../../models/tree-node';
import { SimpleDocument } from '../../api/models/simpleDocument';
import { AlandaDocumentApiService } from '../../api/documentApi.service';
import { removeAllWhitespaces } from '../../utils/helper-functions';

@Component({
  selector: 'alanda-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AlandaAttachmentsComponent implements OnInit {
  @Input() mappings: string | string[];
  @Input() project?: any;
  @Input() task?: any;
  @Input() pid?: string;
  @Output() upload = new EventEmitter<any>();

  panelShown = false;
  uploaderUrl: string;
  showUpload: boolean;
  downloadAllUrl: string;
  fileCount: number;
  data: any = {};
  loadingInProgress: boolean;
  treeNode: ExtendedTreeNode[] = [];
  currentFiles: SimpleDocument[]; // passed to attachments-list

  constructor(private readonly documentService: AlandaDocumentApiService) {}

  ngOnInit() {
    if (!this.mappings || this.mappings.length === 0) {
      this.mappings = 'AcquiDoc,SI,SA';
    }

    if (Array.isArray(this.mappings) && this.mappings.length) {
      this.mappings = this.mappings.join(',');
    }

    if (typeof this.mappings === 'string') {
      this.mappings = removeAllWhitespaces(this.mappings);
    }

    this.fileCount = 0;
    this.data.mappings = this.mappings;
    if (this.project) {
      this.data.refObjectType = 'project';
      this.data.guid = this.project.guid;
      this.data.idName = this.project.projectId;
    } else if (this.task) {
      this.data.refObjectType = this.task.task_type;
      this.data.idName = this.task.object_name;
      this.data.guid = this.task.object_id;
    } else if (this.pid) {
      this.data.refObjectType = 'process';
      this.data.guid = this.pid;
    }

    this.loadTreeConfig();
  }

  loadTreeConfig() {
    this.documentService
      .loadTree(
        this.data.refObjectType,
        this.data.guid,
        true,
        this.data.mappings,
      )
      .subscribe((res) => {
        res.name = this.data.idName;
        let temp = [];
        if (res.virtual) {
          temp = res.children;
        } else {
          temp = [res];
        }
        this.data.selectedNode = temp[0];
        this.refreshUrls();
        this.fileCount = this.checkFileCount(temp);
        this.treeNode = res.children;
        for (const node of this.treeNode) {
          this.setupTreeNode(node);
        }

        this.loadFolderContent();
      });
  }

  setupTreeNode(node: ExtendedTreeNode) {
    node.expanded = false;
    node.collapsedIcon = 'pi pi-folder';
    node.expandedIcon = 'pi pi-folder-open';
    node.name = node.label;
    node.label = node.name + ' (' + node.files + ')';
    for (const child of node.children) {
      this.setupTreeNode(child);
    }
  }

  checkFileCount(nodeList): number {
    let fileCount = 0;
    for (const node of nodeList) {
      fileCount += node.files;
      fileCount += this.checkFileCount(node.children);
    }
    return fileCount;
  }

  loadFolderContent(): void {
    this.documentService
      .loadFolderContent(
        this.data.refObjectType,
        this.data.guid,
        this.data.selectedNode.id,
        null,
        this.data.selectedNode.mapping,
      )
      .subscribe((res) => {
        this.currentFiles = res;
        this.data.selectedNode.files = res.length;
        this.data.selectedNode.label =
          this.data.selectedNode.name + ' (' + res.length + ')';
        this.fileCount = this.checkFileCount(this.treeNode);
      });
  }

  refreshUrls(event?: any): void {
    this.downloadAllUrl = this.documentService.getDownloadAllUrl(
      this.data.refObjectType,
      this.data.guid,
      this.data.selectedNode.id,
      this.data.selectedNode.mapping,
    );
    this.uploaderUrl = this.documentService.getFolderUrl(
      this.data.refObjectType,
      this.data.guid,
      this.data.selectedNode.id,
      this.data.selectedNode.mapping,
    );
  }

  onUpload(event: any): void {
    this.upload.emit(event);
    this.loadFolderContent();
  }

  togglePanel() {
    this.panelShown = !this.panelShown;
    if (!this.panelShown) {
      this.loadTreeConfig();
    }
  }

  onSelectedNodeChange($event) {
    this.data.selectedNode = $event;
    this.refreshUrls();
    this.loadFolderContent();
  }

  onDeleteFile() {
    this.loadFolderContent();
  }
}
