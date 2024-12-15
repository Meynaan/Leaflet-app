import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  currentTileLayer!: L.TileLayer;
  //Daftar Basemap
  basemaps: { name: string; url: string }[] = [
    { name: 'OpenStreetMap', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' },
    { name: 'CartoDB Positron', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' },
    { name: 'CartoDB Dark Matter', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' },
    { name: 'Terrain', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' },
  ];

  // Daftar Titik
  points: { lat: number; lng: number; label: string }[] = [
    { "lat": -7.923592169255554, "lng": 110.48517243833534, "label": "Aryanto Ardi" },
    { "lat": -7.923412152084402, "lng": 110.48615861710189, "label": "Simping Simping" },
    { "lat": -7.924685576155296, "lng": 110.48615426631106, "label": "Supardiyanto Supardiyanto" },
    { "lat": -7.923988531307484, "lng": 110.48592439048555, "label": "Suradi Suradi" },
    { "lat": -7.923216442953634, "lng": 110.487590767993, "label": "Sunardi Sunardi" },
    { "lat": -7.922342530601546, "lng": 110.48579971929298, "label": "Ginu Ginu" },
    { "lat": -7.92229259973092, "lng": 110.48642920523342, "label": "Winarti Winarti" },
    { "lat": -7.922252750583147, "lng": 110.48682013718961, "label": "Ngatiminarto Ngatiminarto" },
    { "lat": -7.9223892087406655, "lng": 110.48859950861002, "label": "Budiman Budiman" },
    { "lat": -7.922104223526739, "lng": 110.48826548216546, "label": "Hardiana Fajar Ruswanto" },
    { "lat": -7.921217226156514, "lng": 110.48838924224003, "label": "Robi Zulandri" },
    { "lat": -7.922231203374267, "lng": 110.48883296377683, "label": "Tunardi Tunardi" },
    { "lat": -7.919370299430261, "lng": 110.48730501161698, "label": "Joko Arif Nurdiantoro" },
    { "lat": -7.9205676654145005, "lng": 110.48583455900261, "label": "Naryanto Naryanto" },
    { "lat": -7.919433452173887, "lng": 110.48690839403766, "label": "Istanto Istanto" },
    { "lat": -7.918991130009062, "lng": 110.48625205520271, "label": "Arif Setiawan" },
    { "lat": -7.919116231274154, "lng": 110.4862204787641, "label": "Tugiman Tugiman" },
    { "lat": -7.922077493140408, "lng": 110.48598062903115, "label": "Wahyu Nurhidayatullah" },
    { "lat": -7.9241948558531154, "lng": 110.48707544716754, "label": "Mugiyono Mugiyono" },
    { "lat": -7.921841103746646, "lng": 110.48632576975149, "label": "Sumardi Sumardi" },
    { "lat": -7.923817091329177, "lng": 110.48677007345262, "label": "Pangi Pangi" },
    { "lat": -7.9191844647724405, "lng": 110.48573354358543, "label": "Parwadi Parwadi" },
    { "lat": -7.91919236297994, "lng": 110.4857383281384, "label": "Alif Musthofa" },
  ];
  loadBasemap: any;

  constructor() { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    // Menginisialisasi peta
    this.map = L.map('mapId').setView([-7.774839, 110.374532], 16);

    // Menambahkan tile layer default (OpenStreetMap)
    this.currentTileLayer = L.tileLayer(this.basemaps[0].url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Definisikan ikon kustom
    const customIcon = L.icon({
      iconUrl: 'assets/icon/location.png', // Path ke file ikon
      iconSize: [50, 50], // Ukuran ikon [width, height]
      iconAnchor: [16, 32], // Anchor point (posisi bagian bawah ikon)
      popupAnchor: [0, -32], // Posisi popup relatif terhadap anchor
    });

    // Tambahkan semua titik dengan ikon kustom
    this.points.forEach(point => {
      const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(this.map);

      // Tambahkan popup pada marker
      marker.bindPopup(`<b>${point.label}</b>`);
    });

    // Memusatkan peta pada semua titik
    const bounds = L.latLngBounds(this.points.map(point => [point.lat, point.lng]));
    this.map.fitBounds(bounds);
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
