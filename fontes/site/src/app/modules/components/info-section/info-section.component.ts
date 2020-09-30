import { Component, OnInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { InfoSectionModel } from 'src/app/models';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ContentModalModel } from 'src/app/models/modal.model';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import SimpleParallax from 'simple-parallax-js';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-info-section',
    templateUrl: './info-section.component.html',
    styleUrls: ['./info-section.component.scss'],
})
export class InfoSectionComponent implements OnInit {
    @Input() sectionInfo: InfoSectionModel = new InfoSectionModel({})
    @Input() backgroundColorClass: string = 'white-background-color';
    @ViewChild('sectionInfoElement', { static: false }) sectionInfoElement: ElementRef<HTMLElement>;
    isBrowser: boolean = false;
    changeToBackground: boolean = false;
    constructor(
        private modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            if (this.sectionInfo.parallax && this.windowRef.nativeWindow.innerWidth > 1023) {
                this.activateParallax();
            }

            const ua = this.windowRef.nativeWindow.navigator.userAgent;
            const msie = ua.indexOf("MSIE ");

            if (msie > 0) // If Internet Explorer, return version number
            {
                this.changeToBackground = true;
            }
        }
    }

    activateParallax() {
        const nodeElements: any = this.elementRef.nativeElement.querySelectorAll('.col-image img');
        new SimpleParallax(nodeElements, {
            orientation: 'down'
        });
    }

    get offsetTop(): number {
        return this.sectionInfoElement.nativeElement.offsetTop;
    }

    openModal() {
        if (this.sectionInfo.hasModal) {
            /*
                TODO - falta o conteúdo que deverá ser enviádo para o cliente.

                - Por enquanto as informações estão mocadas.
            */
            const modalContent: ContentModalModel = new ContentModalModel({
                layout: 'content',
                type: 'info',
                title: 'Mitos e verdades sobre a escovação',
                smallTitle: 'SAÚDE BUCAL',
                paragraphs: [
                    {
                        "title": "Importância da escovação",
                        "text": "A escovação é extremamente importante, não apenas para ter um sorriso mais bonito, mas, também, para cuidar da saúde bucal, prevenir cáries, mal hálito e doenças como gengivite, periodontite, entre outras. Vamos esclarecer algumas dúvidas mais frequentes sobre a escovação."
                    },
                    {
                        "title": "Tenho que escovar meus dentes logo depois de terminar uma refeição?",
                        "text": "Mito! Ao fim de uma refeição o correto é aguardar até 30 minutos. Esse tempo é preciso, porque alguns alimentos possuem acidez e podem deixar o esmalte dos dentes sensíveis. Por esse motivo, é importante aguardar o PH da boca se equilibrar."
                    }
                ],
                imagePath: 'assets/svg/content-modal-image.svg'
            });
            this.modalService.openModal(modalContent)
        }
    }
}
