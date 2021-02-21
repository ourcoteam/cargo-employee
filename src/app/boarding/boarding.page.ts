import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.page.html',
  styleUrls: ['./boarding.page.scss']
})
export class BoardingPage implements OnInit {
  constructor(public _translate: TranslateService) {}

  ngOnInit() {}
}
