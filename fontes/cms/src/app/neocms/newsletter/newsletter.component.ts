import { Component, OnInit } from '@angular/core';
import { NewsletterModel } from 'src/models/newsletter/newsletter.model';
import { faPencilAlt, faTrash, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { NewsletterService } from './newsletter.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsletters: NewsletterModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  faFileExcel = faFileExcel;
  loaded: boolean;
  fileName= 'Newsletters.xlsx';
  paginaAtual = 1;
  constructor(
    private newsletterService: NewsletterService
  ) { }

  ngOnInit() {
    this.getNewsletters();
  }

  getNewsletters() {
    this.newsletterService
      .getAll()
      .subscribe(newsletters => {
        this.loaded = true;
        this.newsletters = newsletters;
      })
      .add(() => this.loaded = true);
  }

  exportExcel(): void 
    {
       let element = document.getElementById('newsletterTable'); 
       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       XLSX.writeFile(wb, this.fileName);			
    }
    onPageChange(page: number) {
      this.paginaAtual = page;
  }
}
