import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Validations, jsonFormatter } from '../../../utils';
import { LogClassMethods } from '../../../decorators/log.decorator';

@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@LogClassMethods()
// @logClass
export class JsonViewComponent implements OnChanges {
  @Input() data: object;
  jsonAsText: string;
  constructor() {}

  ngOnChanges() {
    this.jsonAsText = (Validations.isObject(this.data) && jsonFormatter(this.data)) || '';
  }
}
