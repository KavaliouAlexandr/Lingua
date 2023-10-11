import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-functionality',
  templateUrl: './details-functionality.component.html',
  styleUrls: ['./details-functionality.component.scss']
})
export class DetailsFunctionalityComponent {
  @Input() functionality: any;
}
