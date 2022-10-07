import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acessibilidade',
  templateUrl: './acessibilidade.component.html',
  styleUrls: ['./acessibilidade.component.scss']
})
export class AcessibilidadeComponent implements OnInit {
  
  width: number = 1400;
  isBrowser: boolean = false;
    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOinfos();
        this.isBrowser = isPlatformBrowser(this.platformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
        }
    }

  ngOnInit() {
  }


  setSEOinfos() {
    this.title.setTitle('Acessibilidade | Care Plus');
    this.meta.updateTag({
        name: 'description',
        content: 'O site da Care Plus é projetado para que você possa alterar alguns itens visuais para uma navegação adaptada às suas necessidades. Conheça aqui alguns dos itens de acessibilidade que podem ser customizados.'
    });
    
    this.meta.updateTag({
        name: "og:title",
        content: 'Acessibilidade | Care Plus'
    });

    this.meta.updateTag({
        name: "og:type",
        content:
            "website",
    });

    this.meta.updateTag({
        name: "og:description",
        content: 'O site da Care Plus é projetado para que você possa alterar alguns itens visuais para uma navegação adaptada às suas necessidades. Conheça aqui alguns dos itens de acessibilidade que podem ser customizados.'
    });

    this.meta.updateTag({
        name: "og:url",
        content: `${environment.SELF_URL}/a-careplus/acessibilidade`,
    });

    /* 
        Twitter meta tags
    */

    this.meta.updateTag({
        name: "twitter:title",
        content: 'Acessibilidade | Care Plus'
    });

    this.meta.updateTag({
        name: "twitter:card",
        content:
            "summary_large_image",
    });

    this.meta.updateTag({
        name: "twitter:description",
        content: 'O site da Care Plus é projetado para que você possa alterar alguns itens visuais para uma navegação adaptada às suas necessidades. Conheça aqui alguns dos itens de acessibilidade que podem ser customizados.'
    });

    this.meta.updateTag({
        name: "twitter:url",
        content: `${environment.SELF_URL}/a-careplus/acessibilidade`,
    });
}

}