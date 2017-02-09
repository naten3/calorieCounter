import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeRange } from '../../models'
import { DateUtils } from '../../common'

@Component({
  selector: 'cc-time-range-filter',
  templateUrl: './time-range-filter.component.html'
})
export class TimeRangeFilterComponent implements OnInit{

  filterForm: FormGroup;
  submitted: boolean = false;
  endBeforeStart: boolean = false;

  @Output('timeFilter') public timeFilterEmitter: EventEmitter<TimeRange>
  = new EventEmitter<TimeRange>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
            startTime: ['', [Validators.required]],
            endTime: ['', [Validators.required]]
        });
  }

  private filter(value: any, valid: boolean) {
    this.submitted = true;
    if (valid) {
      if (value.endTime < value.startTime ) {
        this.endBeforeStart = true;
      } else {
        this.endBeforeStart = false;
        let request: TimeRange = new TimeRange();
        request.startTime = DateUtils.UTCFromLocalTimeString(value.startTime);
        request.endTime = DateUtils.UTCFromLocalTimeString(value.endTime);
        this.timeFilterEmitter.emit(request);
      }
    }
  }
}
