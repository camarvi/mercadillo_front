import { Component, OnInit } from '@angular/core';

//import { Inject } from '@angular/core';    
//import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //constructor(@Inject(DOCUMENT) private document: Document) { }

  constructor() { }

  ngOnInit(): void {
  }

 // someMethode(){ this.document.location.reload(); }


}
