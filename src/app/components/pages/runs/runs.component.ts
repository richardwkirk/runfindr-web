import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.css']
})
export class RunsComponent implements OnInit {

  createRun: boolean = false;

  runForm: FormGroup;

  isSubmitted = true;

  constructor(private formBuilder: FormBuilder) { 
    this.runForm = this.createFormGroup();
  }

  ngOnInit() {
    console.log(this.runForm.controls);
  }

  private createFormGroup() {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  public toggleCreateRun() {
    this.createRun = !this.createRun;
  }

  public submitRun() {
    alert(`Submit: ${JSON.stringify(this.runForm.value)} (valid: ${this.runForm.valid})`);
  }
}
