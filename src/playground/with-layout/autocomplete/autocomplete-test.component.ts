import { NbAutocompleteDirective } from './../../../framework/theme/components/autocomplete/autocomplete.directive';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'nb-autocomplete-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-test.component.html',
})
export class AutocompleteTestComponent implements OnInit {

  @ViewChild(NbAutocompleteDirective)
  set popup(popup: NbAutocompleteDirective<any>) {
    console.log('popup', popup);
    setTimeout(() => {
      popup.show();
    }, 3000);
    setTimeout(() => {
      popup.hide();
    }, 5000);
  }

  options: any[];
  selectedOption: any;
  filteredOptions$: Observable<any[]>;
  inputFormControl: FormControl;
  formGroup: FormGroup;
  viewHandleBind: any;

  constructor(formBuilder: FormBuilder) {
    this.viewHandleBind = this.viewHandle.bind(this);

    this.formGroup = formBuilder.group({
      optionId: 5,
    });
  }

  ngOnInit() {

    this.options = [
      {name: 'Első opció', value: 1},
      {name: 'Második opció', value: 2},
      {name: 'Harmadik opció', value: 3},
      {name: 'Negyedik opció', value: 4},
      {name: 'Ötödik opció', value: 5},
    ];

    this.filteredOptions$ = of(this.options);

    this.inputFormControl = <FormControl>this.formGroup.controls.optionId;

    this.filteredOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );

      setTimeout(() => {
        this.formGroup.patchValue({
          optionId: 3,
        });
      }, 1000);
  }

  private filter(value: string): string[] {
    if (typeof value === 'number') {
      return this.options.filter(option => option.value === value);

    } else {

      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
  }

  viewHandle(value: string) {
    this.selectedOption = this.options.find(el => el.value === value);

    console.log(`viewHandle ${value}`);

    if (this.selectedOption) {
      return this.selectedOption.name;
    } else {
      return value;
    }
  }
}

