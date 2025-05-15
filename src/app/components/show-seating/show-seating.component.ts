import { Component, OnInit } from '@angular/core';
import { SeatingService } from '../../services/seating.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface SeatingSection {
  id: number;
  seatingSectionName: string;
  discPerc: number;
  discEndDate: string;
  allowIncentive: string;
}

@Component({
  selector: 'app-show-seating',
  templateUrl: './show-seating.component.html',
  styleUrls: ['./show-seating.component.css']
})
export class ShowSeatingComponent implements OnInit {
  sections: SeatingSection[] = [];
  filteredSections: SeatingSection[] = [];
  searchText = '';
  currentPage = 1;
  pageSize = 4;

  constructor(
    private seatingService: SeatingService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.seatingService.getAll().subscribe(res => {
      this.sections = res.data || [];
      this.filterSections();
    });
  }

  filterSections(): void {
    const text = this.searchText.toLowerCase();
    this.filteredSections = this.sections.filter(section =>
      section.seatingSectionName.toLowerCase().includes(text)

    );
    this.currentPage = 1;
  }


  get paginatedSections(): SeatingSection[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredSections.slice(start, start + this.pageSize);
  }


  get totalPages(): number {
    return Math.ceil(this.filteredSections.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
  }

  delete(id: number): void {
    this.toast.success('Data Deleted successfully!'); {
      this.seatingService.delete(id).subscribe(() => this.loadSections());
    }
  }

  editSection(section: SeatingSection): void {
    this.seatingService.setSelectedSection(section);
    this.router.navigate(['/seating/edit']);
  }
}
