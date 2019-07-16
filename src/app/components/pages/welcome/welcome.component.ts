import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../../layout/LayoutOptions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private layoutService: LayoutService) { 
    layoutService.setMenuContext([MenuContext.Countries]);
  }

  ngOnInit() {
  }

}
