/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
//import {Observable} from 'rxjs/Observable'; - this is smaller, fewer features
//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/filter';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
    `
})
export class AppComponent {
    constructor(){
    	var keyups = Observable.fromEvent($("#search"),"keyup")
    	.map(e => e.target.value)
    	.filter(text => text.length >= 3)
    	.debounceTime(300)
    	.distinctUntilChanged()
    	.flatMap(searchTerm => {
    		var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
    		var promise = $.getJSON(url);
    		return Observable.fromPromise(promise);
//move code in flatMap to a service
    	});

    	var subscription = keyups.subscribe(data => console.log(data));

    	//subscription.unsubscribe();
    }
}