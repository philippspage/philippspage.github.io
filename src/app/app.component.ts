import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'philippspage.github.io';
  private subscription!: Subscription;
  topicname: string = 'philippspage/alarmState';
  msg: string = '';
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true })
  msglog!: ElementRef;
  alarmSet: boolean = false;

  constructor(private _mqttService: MqttService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    this.subscribeNewTopic();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNewTopic(): void {
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message.payload.toString();
      console.log('Incomming MQTT message: ' + this.msg);
      if (this.msg == "1") {
        this.alarmSet = true;
        this.openSnackBar('Alarm gesetzt!');
      } else {
        this.alarmSet = false;
        this.openSnackBar('Alarm gelöst!');
      }
    });
  }

  sendmsg(message: string): void {
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.topicname, message, { qos: 0, retain: true })
    this.msg = ''
  }

  setAlarm(): void {
    this.sendmsg("1");
  }

  resetAlarm(): void {
    this.sendmsg("0");
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Schließen', { duration: 5000, panelClass: ['alarm-snackbar'] });
  }
}