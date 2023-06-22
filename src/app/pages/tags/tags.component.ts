import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagService } from './tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
  constructor(public readonly tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.findAll();
  }

  ngOnDestroy(): void {
    this.tagService.destroy();
  }
}
