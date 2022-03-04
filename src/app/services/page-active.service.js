import { Subject } from 'rxjs';

export class PageActiveService {

    static _instance = null;
    static _error = true;

    _pageActive = null;

    constructor() {

        if (PageActiveService._error)
        throw new Error( 'The constructor is private, plase use the PageActiveService.instance' );

        PageActiveService._error = true;

        this._pageActive = new Subject();

    }

    static get instance() {

        if (PageActiveService._instance) return PageActiveService._instance;
        else {
            PageActiveService._error = false;
            PageActiveService._instance = new this();
            return PageActiveService._instance;
        }

    }

    get pageActive() {
        return this._pageActive;
    }

}