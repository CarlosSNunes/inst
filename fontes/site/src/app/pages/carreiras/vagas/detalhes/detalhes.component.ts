import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbModel, VacancyModel, DropDownItem } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService } from 'src/app/services';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { VagasService } from 'src/app/services/vagas/vagas.service';
import BankTalentsVacancy from './data/talents-bank';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.component.html',
    styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
    id: string = '';
    breadcrumbs: BreadcrumbModel[] = [];
    vacancy: VacancyModel = new VacancyModel();
    vacancyForm: FormGroup;
    filesNumber = 0;
    files = [];
    filesMultipleNumber = 0;
    filesMultiple = [];
    filerHelper = FileHelper;
    script: HTMLScriptElement;
    isBrowser: boolean = false;
    breadcrumb: BreadcrumbModel;
    dropDownOptions: DropDownItem[] = [
        {
            key: 'Enfermagem',
            value: 'enfermagem'
        },
        {
            key: 'Farmaceutica',
            value: 'farmaceutica'
        }
    ];
    isBank: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private notificationService: NotificationService,
        private title: Title,
        private meta: Meta,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private vagasService: VagasService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.activatedRoute.params.subscribe(async params => {
            this.id = params.id;
            this.isBank = this.id == 'banco-de-talentos';
            this.populateVacancyPreInfos(this.isBank)
            this.populateBreadcrumb();
            if (!this.isBank) {
                await this.getVacancy();
            }
        })
        this.buildForm();
    }

    ngOnInit() {

    }

    populateVacancyPreInfos(bank: boolean = false) {
        if (bank) {
            this.breadcrumb = {
                name: 'Banco de talentos',
                link: `/carreiras/vagas/banco-de-talentos`,
                active: true
            }
            this.vacancy = BankTalentsVacancy;
            this.setSEOInfos(this.vacancy.name)
            this.injectRichSnippet(this.vacancy)
        } else {
            this.breadcrumb = {
                name: 'Detalhes da vaga',
                link: `/carreiras/vagas/${this.id}`,
                active: true
            }
        }
    }

    async getVacancy() {
        try {
            this.vacancy = await this.vagasService.getVacancyById(this.id)
            this.setSEOInfos(this.vacancy.name)
            this.injectRichSnippet(this.vacancy)
        } catch (error) {
            console.log(error)
        }
    }

    private buildForm() {
        this.vacancyForm = this.fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            telefone: ['', [Validators.required, Validators.minLength(10)]],
            mensagem: ['',],
            area: ['', []]
        })
    }

    get form(): {
        [key: string]: AbstractControl;
    } {
        return this.vacancyForm.controls;
    }

    getErrors(control: AbstractControl): string[] {
        return FormControlError.GetErrors(control);
    }

    changeActionArea(area: DropDownItem) {
        this.vacancyForm.controls.area.markAsTouched();
        this.vacancyForm.controls.area.setValue(area.value);
    }

    private populateBreadcrumb() {
        this.breadcrumbs = [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home'
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
                link: '/a-careplus'
            }),
            new BreadcrumbModel({
                name: 'Carreiras',
                link: '/carreiras'
            }),
            new BreadcrumbModel({
                name: 'Vagas',
                link: '/carreiras/vagas'
            }),
            this.breadcrumb,
        ]
    }

    fileChangeEvent(fileInput: any, multiple: boolean) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            if (!multiple) {
                for (const file of fileInput.target.files) {
                    this.files.push(file)
                };
                this.filesNumber = this.files.length;
            } else {
                for (const file of fileInput.target.files) {
                    this.filesMultiple.push(file)
                };
                this.filesMultipleNumber = this.filesMultiple.length;
            }
        }
    }

    async subscribe() {
        try {
            this.notificationService.addNotification('success', 'Cadastro realizado com sucesso!', 'top');
            this.buildForm();
        } catch (error) {
            this.notificationService.addNotification('error', 'Cadastro realizado com sucesso!', 'top');
        }
    }

    deleteFile(index: number, multiple: boolean = false) {
        if (!multiple) {
            this.files.splice(index, 1)
            this.filesNumber = this.files.length;
        } else {
            this.filesMultiple.splice(index, 1)
            this.filesMultipleNumber = this.filesMultiple.length;
        }
    }


    setSEOInfos(name: string) {
        this.title.setTitle(`${name} | Carreiras | A Care Plus | Care Plus`);
        this.meta.updateTag({
            name: 'description',
            content: 'Aqui na Care Plus nosso foco e compromisso é com o futuro. Vem com a gente!'
        });
    }

    injectRichSnippet(vacancy: VacancyModel) {
        const script = this.document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            this.script = this.document.createElement('script');
            this.script.type = 'application/ld+json';
            this.document.head.appendChild(this.script)
        } else {
            this.script = (script as HTMLScriptElement);
            this.script.text = this.mountRichSnippetContent(vacancy);
        }
    }

    mountRichSnippetContent(vacancy: VacancyModel): string {
        return `{
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": "${vacancy.name}",
            "description": "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
            "identifier": {
                "@type": "PropertyValue",
                "name": "Google",
                "value": "1234567"
            },
            "datePosted": "2017-01-18",
            "validThrough": "2017-03-18T00:00",
            "employmentType": "CONTRACTOR",
            "hiringOrganization": {
                "@type": "Organization",
                "name": "Google",
                "sameAs": "http://www.google.com",
                "logo": "http://www.example.com/images/logo.png"
            },
            "jobLocation": {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1600 Amphitheatre Pkwy",
                    "addressLocality": ", Mountain View",
                    "addressRegion": "CA",
                    "postalCode": "94043",
                    "addressCountry": "US"
                }
            },
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    "value": 40.00,
                    "unitText": "HOUR"
                }
            }
        }`
    }
}
