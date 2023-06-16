import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule, TableService } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable } from 'rxjs';

export function tableFactory(wrapper: TableCrudComponent) {
  return wrapper.table;
}

@Directive({
  standalone: true,
  selector: '[appTableCrudTemplate]',
})
export class TableCrudTemplateDirective {
  @Input() appTableCrudTemplate?: 'caption' | 'header' | 'body' | 'summary';

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
export class TableCrudComponent<T extends { id: string } = any>
  implements AfterViewInit
{
  @Input() items: T[] = [];

  @Input() createFn: () => Observable<T> = () => {
    return console.info('not implemented') as any;
  };

  @Input() editFn: (item: T) => Observable<T> = (item: T) => {
    return console.info(
      `not implemented, the item is: ${JSON.stringify(item)}`,
    ) as any;
  };

  @Input() deleteFn: (item: T) => Observable<T> = (item: T) => {
    return console.info(
      `not implemented, de item is: ${JSON.stringify(item)}`,
    ) as any;
  };

  @Input() createIcon = 'pi pi-plus';

  @Input() deleteAllIcon = 'pi pi-minus';

  @Input() globalFilterFields: string[] = [];

  @Input() tableStyles: { [key: string]: string | number } = {
    'min-width': '75rem',
  };

  @Input() dataKey = 'id';

  @Input() currentPageReportTemplate =
    'Showing {first} to {last} of {totalRecords} entries';

  @ViewChild('dt', { static: true }) table?: Table;

  @ContentChildren(TableCrudTemplateDirective)
  templates?: QueryList<TableCrudTemplateDirective>;

  public formRef?: DynamicDialogRef;

  public selectedItems: T[] = [];

  public captionTemplate?: TemplateRef<unknown>;

  public headerTemplate?: TemplateRef<unknown>;

  public bodyTemplate?: TemplateRef<unknown>;

  public summaryTemplate?: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    this.templates?.forEach((template) => {
      if (template.appTableCrudTemplate === 'caption') {
        setTimeout(() => {
          this.captionTemplate = template.templateRef;
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

  public createItem(): void {
    this.createFn().subscribe({
      next: (item) => {
        this.addOrRemoveItem(item);
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public deleteSelectedItem(): void {
    this.selectedItems.forEach((item) => this.deleteItem(item));
  }

  public editItem(item: T): void {
    this.editFn(item).subscribe({
      next: (item?) => {
        if (item) {
          this.addOrRemoveItem(item, true);
        }
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public deleteItem(item: T): void {
    this.deleteFn(item).subscribe({
      next: (item) => {
        if (item) {
          this.addOrRemoveItem(item);
        }
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  }

  public searchOnTable(dt: Table, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private addOrRemoveItem(item: T, add = false): void {
    const index = this.items.findIndex((value) => value?.id === item?.id);

    if (index >= 0) {
      add ? this.items.splice(index, 1, item) : this.items.splice(index, 1);
    } else {
      this.items.push(item);
    }
  }
}
