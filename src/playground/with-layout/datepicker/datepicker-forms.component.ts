import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'nb-datepicker-forms',
  template: `
    <nb-card>
      <nb-card-header>Reactive Form by Record</nb-card-header>
      <nb-card-body>
        <div
          [formGroup]="formGroup"
        >
          <input
            nbInput
            placeholder="Pick Date"
            [nbDatepicker]="formcontrolRec1"
            formControlName="publicateDate"
          >
          <nb-datepicker #formcontrolRec1></nb-datepicker>
        </div>
        <div
          [formGroup]="formGroup"
        >
          <input
            nbInput
            placeholder="Pick Date"
            [nbDatepicker]="formcontrolRec2"
            formControlName="expireDate"
          >
          <nb-datepicker #formcontrolRec2></nb-datepicker>
        </div>
      </nb-card-body>
    </nb-card>
    <!--
    <nb-card>
      <nb-card-header>Reactive Form by Form Control</nb-card-header>
      <nb-card-body>
        <input nbInput placeholder="Pick Date" [nbDatepicker]="formcontrol" [formControl]="formControl">
        <nb-datepicker #formcontrol></nb-datepicker>
      </nb-card-body>
    </nb-card>
    -->
    <!--
    <nb-card>
      <nb-card-header>Template Form</nb-card-header>
      <nb-card-body>
        <input nbInput placeholder="Form Picker" [nbDatepicker]="ngmodel" [(ngModel)]="ngModelDate">
        <nb-datepicker #ngmodel></nb-datepicker>
      </nb-card-body>
    </nb-card>
    -->
  `,
  styleUrls: ['./datepicker-example.scss'],
})
export class DatepickerFormsComponent {
  formControl: FormControl;
  formGroup: FormGroup;
  record: any = {
    "reqType" : "replace",
    "reqPlace" : "inner",
    "publicateDate" : null,
    "isExpire" : true,
    "expireDate" : "2025-08-18T01:00:00+01:00",
    "title" : "ÁTLAGOS HAVI KÖLTSÉGMUTATÓ ",
    "subTitle" : "A telefonszolgáltatók egyre szaporodó ajánlatai között nehéz megtalálni azt a díjcsomagot",
    "lead" : "amely legjobban szolgálja a fogyasztók igényeit, legyen az olcsóbb beszélgetés vagy nagyobb adatforgalom. A Nemzeti Média- és Hírközlési Hatóság (NMHH) az átlagos havi költségmutatóval (ÁHK) segíthet eligazodni a vezetékes- és mobiltarifák, valamint a szolgáltatók kínálata között.",
    "id" : 3,
    "_links" : {
      "self" : {
        "href" : "http://localhost:4701/api/issues/3"
      },
      "issue" : {
        "href" : "http://localhost:4701/api/issues/3"
      }
    }
  };

  ngModelDate = new Date();

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.createForm();

    /*
    this.http.get(`/api/issues/3`).subscribe((data: any) => {
      console.log('http.get data', data);

      this.record = data;

      this.formGroup = this.createForm();

      console.log('http.get formGroup', this.formGroup);
    });
    */

    activatedRoute.data.pipe(delay(700)).subscribe(data => {
      console.log('activatedRoute.data record', data.record);

      this.record = data.record;

      this.formGroup = this.createForm();

      console.log('activatedRoute.data formGroup', this.formGroup);
    });

    // this.formControl = new FormControl(new Date('2023-03-07'));
  }

  createForm(): FormGroup {
    const formControls = {};

    formControls['id'] = this.record['id'];
    formControls['reqPlace'] = this.record['reqPlace'];
    formControls['reqType'] = this.record['reqType'];
    formControls['publicateDate'] = this.parseDate(this.record['publicateDate']);
    formControls['isExpire'] = this.record['isExpire'];
    formControls['expireDate'] = this.parseDate(this.record['expireDate']);
    formControls['title'] = this.record['title'];
    formControls['subTitle'] = this.record['subTitle'];
    formControls['lead'] = this.record['lead'];

    return this.formBuilder.group(formControls);
  }

  parseDate(value: string): Date {
    return (value == null) ? null : new Date(value);
  }
}
