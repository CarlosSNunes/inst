import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { BlogService, NotificationService } from 'src/app/services';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
    newsLetterForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private notificationService: NotificationService,
        public viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit() {
        this.createForm()
    }

    createForm() {
        this.newsLetterForm = this.fb.group({
            nome: ['', [Validators.required]],
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
            try {
                // TODO adicionar service de newsLetter
                // await this.blogService.sendNewsletter(this.newsLetterForm.value)
            } catch (err) {
                this.notificationService.addNotification('error', err.message)
            }
        } else {
            console.log("Fill form")
        }
    }
}
