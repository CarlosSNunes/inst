import { Injectable, ApplicationRef, Injector, ComponentFactoryResolver, EmbeddedViewRef, Inject } from '@angular/core';
import { ModalComponent } from 'src/app/modules/components/modal/modal.component';
import { ModalModel, ContentModalModel, FeedbackModalModel, ErrorModalModel, TableModalModel } from 'src/app/models/modal.model';
import { WindowRef } from 'src/utils/window-ref';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document
    ) { }

    openModal(modalInfos: ModalModel | FeedbackModalModel | ErrorModalModel | ContentModalModel | TableModalModel) {

        // 1. Create a component reference from the component 
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(ModalComponent)
            .create(this.injector);

        // Component Inputs
        componentRef.instance.modalModel = modalInfos;

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        this.document.body.appendChild(domElem);


        componentRef.instance.closeModal.subscribe((evt) => {
            this.appRef.detachView(componentRef.hostView)
            if (this.document.body.classList.contains('no-scroll')) {
                this.document.body.classList.remove('no-scroll');
                this.windowRef.nativeWindow.scrollTo(0, evt.scrollPosition)
            }
        })

    }
}
