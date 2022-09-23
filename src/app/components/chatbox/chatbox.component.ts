import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Message } from 'src/app/models/Message';
import { SendMessageService } from 'src/app/services/send-message/send-message.service';
import {ScrollToBottomDirective} from "../../scroll-to-bottom.directive";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messages: Message[] = [];
  reply: string = '';
  interval: any;

  @ViewChild(ScrollToBottomDirective)  scroll!: ScrollToBottomDirective;

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

