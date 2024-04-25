import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import { Municipality } from '../../models/Municipality';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [NgFor],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit {

  constructor(private municipalityService: MunicipalityService) { }
  ngOnInit(): void {
    this.getMunicipalities()
  }

  municipalities: Municipality[] = []

  getMunicipalities() {
    this.municipalityService.getMunicipalities().subscribe((it) => {
      this.municipalities = it;
    });
  }

}
