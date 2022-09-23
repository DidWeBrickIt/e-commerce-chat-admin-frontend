import { Component } from '@angular/core';
import {SendMessageService} from "./services/send-message/send-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'P3-Admin-Chat';
}
