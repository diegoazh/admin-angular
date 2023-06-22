import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule, TableService } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ICrudServices } from '../../shared/interfaces';
import { AppModels } from '../../shared/types';

export function tableFactory<T extends AppModels>(
  wrapper: TableCrudComponent<T>,
) {
  return wrapper.table;
}

@Directive({
  standalone: true,
  selector: '[appTableCrudTemplate]',
})
export class TableCrudTemplateDirective {
  @Input() appTableCrudTemplate?: 'captionText' | 'header' | 'body' | 'summary';

  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  standalone: true,
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TagModule,
    TableCrudTemplateDirective,
    InputTextModule,
    AsyncPipe,
  ],
  providers: [
    TableService, // from old imports
    {
      provide: Table, // providing table class
      useFactory: tableFactory, // using new function
      deps: [TableCrudComponent], // new function depends on your wrapper
    },
  ],
})
export class TableCrudComponent<T extends AppModels> implements AfterViewInit {
  @Input() items: T[] = [];

  @Input() createFn!: () => void | Promise<void>;

  @Input() deleteFn!: (item: T) => void | Promise<void>;

  @Input() createIcon = 'pi pi-plus';

  @Input() deleteAllIcon = 'pi pi-minus';

  @Input() globalFilterFields: string[] = [];

  @Input() tableStyles: { [key: string]: string | number } = {
    'min-width': '75rem',
  };

  @Input() dataKey = 'id';

  @Input() currentPageReportTemplate =
    'Showing {first} to {last} of {totalRecords} entries';

  @ViewChild('dt', { static: true })
  public table?: Table;

  @ContentChildren(TableCrudTemplateDirective)
  public templates?: QueryList<TableCrudTemplateDirective>;

  public selectedItems: T[] = [];

  public formRef?: DynamicDialogRef;

  public captionTextTemplate?: TemplateRef<unknown>;

  public headerTemplate?: TemplateRef<unknown>;

  public bodyTemplate?: TemplateRef<unknown>;

  public summaryTemplate?: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    this.templates?.forEach((template) => {
      if (template.appTableCrudTemplate === 'captionText') {
        setTimeout(() => {
          this.captionTextTemplate = template.templateRef;
        });
      }

      if (template.appTableCrudTemplate === 'header') {
        setTimeout(() => {
          this.headerTemplate = template.templateRef;
        });
      }

      if (template.appTableCrudTemplate === 'body') {
        setTimeout(() => {
          this.bodyTemplate = template.templateRef;
        });
      }

      if (template.appTableCrudTemplate === 'summary') {
        setTimeout(() => {
          this.summaryTemplate = template.templateRef;
        });
      }
    });
  }

  public deleteSelectedItem(): void {
    this.selectedItems.forEach((item) => {
      this.deleteFn(item);
    });
  }

  public searchOnTable(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
