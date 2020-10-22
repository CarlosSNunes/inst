import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Inject } from '@angular/core';
import { NotificationComponent } from 'src/app/modules/components/notification/notification.component';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) {
    }


    addNotification(
        type: 'success' | 'info' | 'warning' | 'error',
        message: string,
        position: string = 'top',
        positionOffset: string = '32px',
        time: number = 3000
    ): void {
        // 1. Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(NotificationComponent)
            .create(this.injector);

        // Remove previous notifications
        const notifications = this.document.querySelectorAll('app-notification')
        notifications.forEach(element => {
            element.remove()
        })

        // Component Inputs
        componentRef.instance.type = type;
        componentRef.instance.message = message;
        componentRef.instance.positionOptions = {
            [position]: positionOffset
        };

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;


        domElem.onclick = () => {
            this.appRef.detachView(componentRef.hostView);
            componentRef.hostView.detectChanges();
            componentRef.destroy();
        }

        // 4. Append DOM element to the body
        this.document.body.appendChild(domElem);

        // 5. Wait some time and remove it from the component tree and from the DOM
        setTimeout(() => {
            if (!componentRef.hostView.destroyed) {
                this.appRef.detachView(componentRef.hostView);
                componentRef.hostView.detectChanges();
                componentRef.destroy();
            }
        }, time);
    }
}
