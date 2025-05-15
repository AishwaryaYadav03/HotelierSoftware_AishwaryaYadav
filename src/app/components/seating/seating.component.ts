import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatingService } from '../../services/seating.service';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent implements OnInit {
  seatingForm!: FormGroup;
  editMode = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private seatingService: SeatingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    const section = this.seatingService.getSelectedSection();
    if (section) {
      this.editMode = true;
      this.currentId = section.id;
      this.seatingForm.patchValue({
        seatingSectionName: section.seatingSectionName,
        discPerc: section.discPerc,
        discEndDate: section.discEndDate,
        allowIncentive: section.allowIncentive
      });
    }

  }


  initForm(): void {
    this.seatingForm = this.fb.group({
      seatingSectionName: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]+$')
      ]],
      discPerc: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      discEndDate: ['', Validators.required],
      allowIncentive: ['', Validators.required]
    });
  }


  loadSectionByIdFromAll(id: number): void {
    this.seatingService.getAll().subscribe(data => {
      console.log('GetAll Response:', data);
      const section = data.find((item: any) => item.id == id);
      console.log('Matched Section:', section);
      if (section) {
        this.seatingForm.patchValue({
          seatingSectionName: section.seatingSectionName,
          discPerc: section.discPerc,
          discEndDate: section.discEndDate,
          allowIncentive: section.allowIncentive
        });
      }
    });
  }

  onSubmit(): void {
    if (this.seatingForm.invalid) return;

    const formValue = this.seatingForm.value;
    const payload = {
      ...this.seatingForm.value,
      allowIncentive: this.seatingForm.value.allowIncentive === 'Yes'
    };


    if (this.editMode && this.currentId !== null) {
      const updatedData = { ...formValue, id: this.currentId };

      this.seatingService.update(updatedData).subscribe(() => {
        this.router.navigate(['/show-seating']);
      });

    } else {
      this.seatingService.create(payload).subscribe(() => {
        this.resetForm();
        this.router.navigate(['/show-seating']);

      });
    }
  }


  resetForm(): void {
    this.seatingForm.reset();
  }
}
