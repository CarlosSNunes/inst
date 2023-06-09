import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';


class LocalStorage implements Storage {
    [name: string]: any;
    readonly length: number;
    static token: string;
    clear(): void {
        LocalStorage.token = undefined;
    }
    getItem(key: string): string | null {
        if (key === 'token') {
            return LocalStorage.token
        }
        return undefined;
    }
    key(index: number): string | null { return undefined; }
    removeItem(key: string): void {
        if (key === 'token') {
            LocalStorage.token = undefined;
        }
    }
    setItem(key: string, value: string): void {
        if (key === 'token') {
            LocalStorage.token = value;
        }
    }
}


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService implements Storage {

    private storage: Storage;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.storage = new LocalStorage();

        if (isPlatformBrowser(this.platformId)) {
            this.storage = localStorage;
        }
    }

    [name: string]: any;

    length: number;

    clear(): void {
        this.storage.clear();
    }

    getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    key(index: number): string | null {
        return this.storage.key(index);
    }

    removeItem(key: string): void {
        return this.storage.removeItem(key);
    }

    setItem(key: string, value: string): void {
        return this.storage.setItem(key, value);
    }
}