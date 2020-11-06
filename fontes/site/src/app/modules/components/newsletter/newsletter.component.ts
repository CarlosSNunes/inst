import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { NewsletterService, NotificationService } from 'src/app/services';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
    newsLetterForm: FormGroup;
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService,
        public viewContainerRef: ViewContainerRef,
        private newsLetterService: NewsletterService,
        private cdr: ChangeDetectorRef
    ) {
        this.createForm()
    }

    ngOnInit() {
    }

    createForm() {
        this.newsLetterForm = this.fb.group({
            nomeCompleto: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    get form() {
        return this.newsLetterForm.controls;
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    async onSubmit() {
        if (this.newsLetterForm.valid) {
            this.loading = true;
            try {
                await this.newsLetterService.create(this.newsLetterForm.value);
                this.newsLetterForm.reset();
                this.createForm();
                this.notificationService.addNotification('success', 'Dados enviados com sucesso!');
                this.loading = false;
                this.cdr.detectChanges();
            } catch (err) {
                this.loading = false
                this.notificationService.addNotification('error', err.message);
                this.cdr.detectChanges();
            }
        } else {
            this.notificationService.addNotification('error', 'Preencha os campos faltantes no formulário.');
        }
    }
}
