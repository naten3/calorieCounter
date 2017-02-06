import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

@Component({
  template: `<div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
            </div>`
})
export class NotFoundComponent {
}
