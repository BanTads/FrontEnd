import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  private apiKey = 'AIzaSyAQg4HLbz5XuL27CfE54IXq5cGufQZvxtI';

  constructor(private http: HttpClient) { }

  searchAddress(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}&key=${this.apiKey}`);
  }

  getAddressSuggestions(query: string): Observable<any> {
    const params = new HttpParams()
      .set('address', query)
      .set('key', this.apiKey)
      .set('components', 'country:BR');

      return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => this.formatAddressSuggestions(response))
    );
  }
  private formatAddressSuggestions(response: any): any {
    if (response.status !== 'OK' || !response.results || response.results.length === 0) {
      return [];
    }

    return response.results.map((result: any) => {
      const addressComponents = result.address_components;

      const getComponent = (types: string[]) => {
        const component = addressComponents.find((c: any) =>
          types.every(type => c.types.includes(type))
        );
        return component ? component.long_name : null;
      };

      // pega o short_name do 4 item do address_components (que é o estado abreaviado)
      const getComponentShortName = (types: string[]) => {
        const component = addressComponents.find((c: any) =>
          types.every(type => c.types.includes(type))
        );
        return component ? component.short_name : null;
      };
      const shortEstado = getComponentShortName(['administrative_area_level_1']);
      const streetNumber = getComponent(['street_number']);
      const route = getComponent(['route']);
      const splitRoute = route ? route.split(' ') : [];
      const logradouro = splitRoute.length > 0 ? splitRoute[0] : null;
      const rua = splitRoute.length > 1 ? splitRoute[1] : null;
      const postalCode = getComponent(['postal_code']);
      const locality = getComponent(['administrative_area_level_2']); // Cidade
      const administrativeArea = getComponent(['administrative_area_level_1']); // Estado
      console.log('streetNumber', streetNumber);
      console.log('route', route);
      console.log('postalCode', postalCode);
      console.log('locality', locality);
      console.log('administrativeArea', administrativeArea);


      return {
        tipoLogradouro: logradouro ? logradouro : null,
        nomeRua: rua ? rua : null,
        numero: streetNumber ? streetNumber : null,
        cep: postalCode ? postalCode : null,
        cidade: locality ? locality : null,
        estado: shortEstado ? shortEstado : null
      };
    });
  }

}
