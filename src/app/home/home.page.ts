import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  currentTileLayer!: L.TileLayer; // Tile layer yang sedang aktif

  basemaps: { name: string; url: string }[] = [
    { name: 'OpenStreetMap', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' },
    { name: 'CartoDB Positron', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' },
    { name: 'CartoDB Dark Matter', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' },
    { name: 'Terrain', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' }
  ];

  constructor() { }

  ngOnInit() {
    // Ini bisa kosong atau bisa memuat logika yang diperlukan sebelum peta diinisialisasi
  }

  ionViewDidEnter() {
    // Menginisialisasi peta
    this.map = L.map('mapId').setView([-7.774839, 110.374532], 20);

    // Menambahkan tile layer default (OpenStreetMap)
    this.currentTileLayer = L.tileLayer(this.basemaps[0].url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Menambahkan circle marker sebagai titik
    const circleMarker = L.circleMarker([-7.774839, 110.374532], {
      radius: 8, // Ukuran radius titik
      color: 'red', // Warna garis lingkaran
      fillColor: '#fa947d', // Warna isi lingkaran
      fillOpacity: 0.7 // Transparansi isi
    }).addTo(this.map);

    // Menambahkan popup pada circle marker
    circleMarker.bindPopup('<b>Sekolah Vokasi</b><br>Departemen Teknologi Kebumian').openPopup();
  }

  loadBasemap(basemapUrl: string) {
    // Menghapus layer basemap yang sedang aktif
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    // Menambahkan tile layer dari URL yang baru
    this.currentTileLayer = L.tileLayer(basemapUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Invalidating size untuk memastikan peta di-render ulang
    this.map.invalidateSize();
  }

  changeBasemap(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Lakukan type assertion ke HTMLSelectElement
    const selectedBasemap = selectElement.value; // Ambil value dari elemen select

    const selectedLayer = this.basemaps.find(b => b.name === selectedBasemap);
    if (selectedLayer) {
      this.loadBasemap(selectedLayer.url);
    }
  }
}
