import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// wss://broker.hivemq.com:8884/mqtt
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8884,
  protocol: 'wss',
  path: '/mqtt',
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)), provideAnimationsAsync(),
  ]
}).catch((err) => console.error(err));