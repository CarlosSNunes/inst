import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ScriptLoaderService {

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) { }

    injectScript(scriptObj: Partial<HTMLScriptElement>, place: 'head' | 'body') {
        const script = this.document.createElement('script');
        Object.assign(script, scriptObj);

        if (place == 'head') {
            const head = this.document.getElementsByTagName('head')[0];
            head.appendChild(script);
        }

        if (place == 'body') {
            this.document.body.appendChild(script)
        }
    }
}
