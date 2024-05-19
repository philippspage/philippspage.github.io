import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mqtt',
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),
  ]
}).catch((err) => console.error(err));