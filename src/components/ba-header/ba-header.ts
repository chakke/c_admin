import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ba-header',
  templateUrl: 'ba-header.html'
})
export class BaHeaderComponent {
  showSearchBar = true;
  placeholder = "Mày đang giấu cái gì đó?";
  searchKeyword = "";
  searchBarTransitionDuratuon = 700;
  timeout: any;
  @ViewChild("searchButton") searchButton: ElementRef;
  @ViewChild("searchInput") searchInput: ElementRef;
  @ViewChild("searchBar") searchBar: ElementRef;
  constructor() {
    console.log('Hello BaHeaderComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.searchButton, this.searchInput)
    if (this.searchButton && this.searchInput) {
      this.searchButton.nativeElement.addEventListener('click', () => { 
        this.toggleSearch();
      })
      this.searchInput.nativeElement.addEventListener('blur', () => {
        // this.toggleSearch();
      })
    }
  }

  toggleSearch() {
    this.searchInput.nativeElement.classList.toggle('active');
    this.searchButton.nativeElement.classList.toggle('active');
    this.searchBar.nativeElement.classList.toggle('active');
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.searchInput.nativeElement.classList.contains('active')) {
        this.searchInput.nativeElement.focus();
      }
    }, this.searchBarTransitionDuratuon);
  }
  search() {
    console.log("Hey i'm searching");
  }

}
