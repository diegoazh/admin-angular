import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModel } from '../../../models';
import { CreateTagFormComponent } from '../create-tag-form/create-tag-form.component';
import { DeleteTagComponent } from '../delete-tag/delete-tag.component';
import { TagService } from '../../../pages/tags/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
  @Input() tags: TagModel[] = [];

  public formRef?: DynamicDialogRef;

  constructor(
    private readonly dialogService: DialogService,
    private readonly tagService: TagService,
  ) {}

  public createTag = (): void => {
    this.formRef = this.dialogService.open(CreateTagFormComponent, {
      header: $localize`Create new tag`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (tag) => {
        this.tagService.addOrRemoveItem({ item: tag });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public editTag = (tag: TagModel): void => {
    this.formRef = this.dialogService.open(CreateTagFormComponent, {
      header: $localize`Update new tag`,
      styleClass: 'w-1/3',
      data: {
        tag,
        isUpdate: true,
      },
    });

    this.formRef.onClose.subscribe({
      next: (tag) => {
        this.tagService.addOrRemoveItem({ item: tag, overwrite: true });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };

  public deleteTag = (tag: TagModel): void => {
    this.formRef = this.dialogService.open(DeleteTagComponent, {
      header: $localize`Delete new tag`,
      styleClass: 'w-1/3',
      data: {
        tag,
      },
    });

    this.formRef.onClose.subscribe({
      next: (tag) => {
        this.tagService.addOrRemoveItem({ item: tag });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };
}
