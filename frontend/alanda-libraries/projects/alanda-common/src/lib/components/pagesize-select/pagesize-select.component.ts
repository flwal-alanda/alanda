import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'al-pagesize-select',
  template: `
    <p-dropdown #dropdown [placeholder]="defaultPageSize.toString()" editable="true" [options]="pageSizeOptions"
                (onChange)="selectedPageSize.next($event.value)" showTransitionOptions="0ms" hideTransitionOptions="0ms"></p-dropdown>`,
  styles: [`
    p-dropdown ::ng-deep .ui-inputtext {
      padding-top: 2px;
      padding-bottom: 2px;
    }

    p-dropdown ::ng-deep .ui-dropdown {
      height: unset;
    }
  `],
})
export class AlandaPagesizeSelectComponent implements OnInit, OnChanges, OnDestroy {
  static defaultPageSizes = [15, 75, 250, 1000, 5000];

  private unsubscribe$ = new Subject<void>();
  selectedPageSize = new Subject<number>();

  @Output() onChange = new EventEmitter<number>();

  @Input() pageSizes: number[] = AlandaPagesizeSelectComponent.defaultPageSizes;
  @Input() maxPageSize: number;
  @Input() defaultPageSize: number = 15;
  pageSizeOptions: SelectItem[] = this.trimPageSizes();

  @ViewChild('dropdown') dropdown: Dropdown;

  ngOnInit(): void {
    this.selectedPageSize.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(750),
    ).subscribe(pageSize => this.onChange.emit(pageSize));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageSizes'] || changes['maxPageSize'] || changes['initialPageSize']) {
      this.pageSizeOptions = this.trimPageSizes();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPageSize(pageSize: number) {
    this.dropdown.selectItem(undefined, {label: pageSize, value: pageSize});
  }

  private trimPageSizes(): SelectItem[] {
    let sizes: number[];

    if (this.maxPageSize === undefined) {
      sizes = [...this.pageSizes];
    } else {
      sizes = [...this.pageSizes.filter(ps => ps < this.maxPageSize), this.maxPageSize];
    }

    if (sizes.indexOf(this.defaultPageSize) === -1) {
      sizes.push(this.defaultPageSize);
    }

    return sizes.sort((a, b) => a - b)
      .map(p => {
        return {label: p.toString(), value: p};
      });
  }
}