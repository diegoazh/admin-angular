import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModel } from '../../../models';
import { ICrudServices } from '../../../shared/interfaces';
import { SubscriptionsService } from '../../../shared/services';
import { CreateTagFormComponent } from '../create-tag-form/create-tag-form.component';
import { DeleteTagComponent } from '../delete-tag/delete-tag.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit, OnDestroy {
  @Input() service!: ICrudServices<TagModel>;

  public formRef?: DynamicDialogRef;

  public tags: TagModel[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private readonly subscriptionsSvc: SubscriptionsService,
  ) {}

  ngOnInit(): void {
    this.subscriptionsSvc.add(
      TagListComponent.name,
      this.service.items$.subscribe({
        next: (tags) => {
          this.tags = tags;
        },
        error: (error: unknown) => {
          console.error(error);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptionsSvc.unsubscribe(TagListComponent.name);
  }

  public createTag = (): void => {
    this.formRef = this.dialogService.open(CreateTagFormComponent, {
      header: $localize`Create new tag`,
      styleClass: 'w-1/3',
    });

    this.formRef.onClose.subscribe({
      next: (tag) => {
        this.service.addOrRemoveItem({ item: tag });
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
        this.service.addOrRemoveItem({ item: tag, overwrite: true });
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
        this.service.addOrRemoveItem({ item: tag });
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
  };
}
