import { Component } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}
  ngOnInit(){
    // this.map = L.map('mapId').setView([35.76943, -580081])
  }

  ionViewDidEnter(){
    // Menginisialisasi map
    this.map = L.map('mapId').setView([-6.1751, 106.8650], 10);

    // Menambahkan tile layer dari OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenSteetMap</a> contributors'
    }).addTo(this.map);

    // Menambahkan circle marker sebagai titik
    const circleMarker = L.circleMarker([-6.1751, 106.8650], {
      radius: 8, // Ukuran radius titik
      color: 'blue', // Warna garis lingkaran
      fillColor: '#30a3ec', // Warna isi lingkaran
      fillOpacity: 0.7 // Transparansi isi
    }).addTo(this.map);

    // Menambahkan popup pada circle marker
    circleMarker.bindPopup('<b>Halo!</b><br>Ini adalah popup pada titik.').openPopup();


  }

}
