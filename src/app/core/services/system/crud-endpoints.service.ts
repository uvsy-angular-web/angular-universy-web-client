import { Injectable } from '@angular/core';
import { SystemConfigService } from '../system/system-config.service';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/map';
import { Endpoint, EndpointSuffix } from '../../../models/endpoint.model';

@Injectable({
    providedIn: 'root'
})
export class CRUDEndpointsService {

    constructor(
        private systemConfigService: SystemConfigService) {
    }

    createOnParent(parentId: string, endpoint: Endpoint, body: any): Observable<any> {
        const url = this.buildParentUrl(parentId, endpoint);

        return this.systemConfigService.httpPost(url, body);
    }

    create(endpoint: Endpoint, body: any): Observable<any> {
        const url = this.buildBaseUrl(endpoint);

        return this.systemConfigService.httpPost(url, body);
    }

    getAll(endpoint: Endpoint): Observable<any> {
        const url = this.buildBaseUrl(endpoint);

        return this.systemConfigService.httpGet(url);
    }

    getAllFromParent(parentId: string, endpoint: Endpoint): Observable<any> {
        const url = this.buildParentUrl(parentId, endpoint);

        return this.systemConfigService.httpGet(url);
    }

    get(endpoint: Endpoint, id: string): Observable<any> {
        const url = this.buildIdUrl(endpoint, id);

        return this.systemConfigService.httpGet(url);
    }

    getReport(endpoint: Endpoint, id: string): Observable<any> {
        const url = this.buildIdUrl(endpoint, id,EndpointSuffix.REPORT);

        return this.systemConfigService.httpGet(url);
    }

    update(endpoint: Endpoint, id: string, body: any): Observable<any> {
        const url = this.buildIdUrl(endpoint, id);

        return this.systemConfigService.httpPut(url, body);
    }

    delete(endpoint: Endpoint, id: string): Observable<any> {
        const url = this.buildIdUrl(endpoint, id);

        return this.systemConfigService.httpDelete(url);
    }

    activate(endpoint: Endpoint, id: string): Observable<any> {
        const url = this.buildIdUrl(endpoint, id, EndpointSuffix.ACTIVATE);

        return this.systemConfigService.httpPost(url);
    }

    private buildIdUrl(
        endpoint: Endpoint,
        id: string,
        suffix: EndpointSuffix = EndpointSuffix.DEFAULT): string {
        return `${endpoint.base}/${id}/${suffix}`;
    }

    private buildParentUrl(parentId: string, endpoint: Endpoint): string {
        return `${endpoint.parent}/${parentId}/${endpoint.base}`;
    }

    private buildBaseUrl(endpoint: Endpoint): string {
        return `${endpoint.base}/`;
    }

}
