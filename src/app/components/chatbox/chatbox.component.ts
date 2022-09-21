import { Component, OnInit, Input } from '@angular/core';
import { re } from 'mathjs';
import { Message } from 'src/app/models/Message';
import { SendMessageService } from 'src/app/services/send-message/send-message.service';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    @Input() inMessage: Message;
    let text : string = "hello";

  SendMessageService() {
    let message:Message = {message: text};
    this.send-message.service.sendMessage(message).subscribe(
      (response : Message) => {
        console.log(response);
      }
    )
  }

  }

}

