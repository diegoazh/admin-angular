import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagService } from './tag.service';
import { TagModel } from '../../models';
import { SubscriptionsManagerService } from '../../shared/services';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
  public tags: TagModel[] = [];

  constructor(
    public readonly tagService: TagService,
    private readonly subsManager: SubscriptionsManagerService,
  ) {}

  ngOnInit(): void {
    this.tagService.findAll();
    this.subsManager.add(
      TagsComponent.name,
      this.tagService.items$.subscribe({
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
    this.tagService.destroy();
    this.subsManager.unsubscribe(TagsComponent.name);
  }
}
