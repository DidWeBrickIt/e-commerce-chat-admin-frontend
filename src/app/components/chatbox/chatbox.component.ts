import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Message } from 'src/app/models/Message';
import { SendMessageService } from 'src/app/services/send-message/send-message.service';
import {ScrollToBottomDirectiveDirective} from "../../scroll-to-bottom-directive.directive";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messages: Message[] = [];
  reply: string = '';
  interval: any;

  @ViewChild(ScrollToBottomDirectiveDirective)  scroll!: ScrollToBottomDirectiveDirective;

  constructor(
    private messageService: SendMessageService,
  ) {}

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 2500);
  }

  refreshData(): void{
    this.messageService.getMessages().subscribe(data => this.messages = data);
  }

  send(): void{
    const message = new Message("ADMIN", this.reply);
    console.log(message);
    this.messageService.sendMessage(message).subscribe();

  }


}

