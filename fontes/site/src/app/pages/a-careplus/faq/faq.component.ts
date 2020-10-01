import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { BreadcrumbModel, SimpleBannerModel } from 'src/app/models';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { questionsMock } from './data/commomQuestionsMock';
import AuthorizationQuestionsMock from './data/authorizationQuestionsMock';
import AuthorizationQuestionsExtraMock from './data/authorizationQuestionsMockExtra';
import PreviaDeReembolsoMock from './data/previa-de-reembolso-questions';
import ReembolsoMock from './data/reembolso-questions';
import ReembolsoExtraMock from './data/reembolso-extra-questions';
import Excluded from './data/excluded';
import Tips from './data/tips';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { remove } from 'remove-accents';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef<HTMLInputElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Perguntas Frequentes',
        description: 'Confira as principais dúvidas de Beneficiários, RHs, Corretores e Credenciados',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home'
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
                link: '/a-careplus'
            }),
            new BreadcrumbModel({
                name: 'Perguntas Frequentes',
                link: '/a-careplus/perguntas-frequentes',
                active: true
            })
        ],
        hasAnchor: false,
        hasFilters: true,
        image: 'assets/img/banner-faq.jpg'
    };
    filterForm: FormGroup;
    script: HTMLScriptElement;
    isBrowser: boolean = false;

    questionsDefault = questionsMock
    questions = [];

    authorizationQuestionsDefault = AuthorizationQuestionsMock;
    authorizationQuestions = [];

    authorizationQuestionsExtraDefault = AuthorizationQuestionsExtraMock;
    authorizationQuestionsExtra = [];

    previaDeReembolsoDefault = PreviaDeReembolsoMock;
    previaDeReembolso = [];

    reembolsoDefault = ReembolsoMock;
    reembolso = []

    reembolsoExtraDefault = ReembolsoExtraMock;
    reembolsoExtra = [];

    excludedDefault = Excluded;
    excluded = []

    tipsDefault = Tips;
    tips = []

    constructor(
        private fb: FormBuilder,
        private meta: Meta,
        private title: Title,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private cdr: ChangeDetectorRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.filterForm = this.fb.group({
            document: ['all',],
            search: ['',]
        });
        this.setSEOInfos();
        this.injectRichSnippet({});
    }

    ngOnInit() {
        this.initAcordions();
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(100)).subscribe((value: Event) => {
                this.filter();
            })
        }
    }

    initAcordions() {
        this.questions = [...this.questionsDefault];
        this.authorizationQuestions = [...this.authorizationQuestionsDefault];
        this.authorizationQuestionsExtra = [...this.authorizationQuestionsExtraDefault];
        this.previaDeReembolso = [...this.previaDeReembolsoDefault];
        this.reembolso = [...this.reembolsoDefault];
        this.reembolsoExtra = [...this.reembolsoExtraDefault];
        this.excluded = [...this.excludedDefault];
        this.tips = [...this.tipsDefault];
        this.cdr.detectChanges();
    }

    filter() {
        if (this.filterForm.value.search && this.filterForm.value.search != null) {
            const filterFn = (arr: Array<{ title: string, description: string }>) => arr.filter(a => {
                if ( remove(a.title).match(new RegExp(remove(this.filterForm.value.search), 'gi')) || remove(a.description).match(new RegExp(remove(this.filterForm.value.search), 'gi'))) {
                    return true
                }
                return false
            });

            this.questions = filterFn(this.questionsDefault);

            this.authorizationQuestions = filterFn(this.authorizationQuestionsDefault);

            this.authorizationQuestionsExtra = filterFn(this.authorizationQuestionsExtraDefault);

            this.previaDeReembolso = filterFn(this.previaDeReembolsoDefault);

            this.reembolso = filterFn(this.reembolsoDefault);

            this.reembolsoExtra = filterFn(this.reembolsoExtraDefault);

            this.excluded = filterFn(this.excludedDefault);

            this.tips = filterFn(this.tipsDefault);
        } else {
            this.questions = [...this.questionsDefault];

            this.authorizationQuestions = [...this.authorizationQuestionsDefault];

            this.authorizationQuestionsExtra = [...this.authorizationQuestionsExtraDefault];

            this.previaDeReembolso = [...this.previaDeReembolsoDefault];

            this.reembolso = [...this.reembolsoDefault];

            this.reembolsoExtra = [...this.reembolsoExtraDefault];

            this.excluded = [...this.excludedDefault];

            this.tips = [...this.tipsDefault];
        }
        this.cdr.detectChanges();
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    get form() {
        return this.filterForm.controls;
    }

    setSEOInfos() {
        this.title.setTitle('Perguntas Frequentes | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Confira as principais dúvidas de beneficiários, gestores de RH, corretores e credenciados.'
        });
    }

    injectRichSnippet(infos) {
        const script = this.document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            this.script = this.document.createElement('script');
            this.script.type = 'application/ld+json';
            this.document.head.appendChild(this.script)
        } else {
            this.script = (script as HTMLScriptElement);
            this.script.text = this.mountRichSnippetContent(infos);
        }
    }

    mountRichSnippetContent(infos: any) {
        return `{
            "@context": "https://schema.org",
                "@type": "FAQPage",
                    "mainEntity": [{
                        "@type": "Question",
                        "name": "What is the return policy?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most unopened items in new condition and returned within <strong>90 days</strong> will receive a refund or exchange. Some items have a modified return policy noted on the receipt or packing slip. Items that are opened or damaged or do not have a receipt may be denied a refund or exchange. Items purchased online or in-store may be returned to any store.<br /><p>Online purchases may be returned via a major parcel carrier. <a href=http://example.com/returns> Click here </a> to initiate a return.</p>"
                        }
                    }, {
                        "@type": "Question",
                        "name": "How long does it take to process a refund?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We will reimburse you for returned items in the same way you paid for them. For example, any amounts deducted from a gift card will be credited back to a gift card. For returns by mail, once we receive your return, we will process it within 4–5 business days. It may take up to 7 days after we process the return to reflect in your account, depending on your financial institution's processing time."
                        }
                    }, {
                        "@type": "Question",
                        "name": "What is the policy for late/non-delivery of items ordered online?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Our local teams work diligently to make sure that your order arrives on time, within our normaldelivery hours of 9AM to 8PM in the recipient's time zone. During  busy holiday periods like Christmas, Valentine's and Mother's Day, we may extend our delivery hours before 9AM and after 8PM to ensure that all gifts are delivered on time. If for any reason your gift does not arrive on time, our dedicated Customer Service agents will do everything they can to help successfully resolve your issue. <br/> <p><a href=https://example.com/orders/>Click here</a> to complete the form with your order-related question(s).</p>"
                        }
                    }, {
                        "@type": "Question",
                        "name": "When will my credit card be charged?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We'll attempt to securely charge your credit card at the point of purchase online. If there's a problem, you'll be notified on the spot and prompted to use another card. Once we receive verification of sufficient funds, your payment will be completed and transferred securely to us. Your account will be charged in 24 to 48 hours."
                        }
                    }, {
                        "@type": "Question",
                        "name": "Will I be charged sales tax for online orders?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Local and State sales tax will be collected if your recipient's mailing address is in: <ul><li>Arizona</li><li>California</li><li>Colorado</li></ul>"
                        }
                    }]
        }`;
    }

}
