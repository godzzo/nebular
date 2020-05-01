/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { LayoutDirectionToggleComponent } from './layout-direction-toggle/layout-direction-toggle.component';
import { LayoutThemeToggleComponent } from './layout-theme-toggle/layout-theme-toggle.component';
import { ComponentsOverlayComponent } from './components-list/components-overlay.component';
import { ComponentsListComponent} from './components-list/components-list.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeHu, 'hu-HU');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('../playground/playground.module').then(m => m.PlaygroundModule),
      },
    ], { useHash: true }),
    NbThemeModule.forRoot(),
    NbEvaIconsModule,
  ],
  declarations: [
    AppComponent,
    LayoutDirectionToggleComponent,
    LayoutThemeToggleComponent,
    ComponentsOverlayComponent,
    ComponentsListComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
