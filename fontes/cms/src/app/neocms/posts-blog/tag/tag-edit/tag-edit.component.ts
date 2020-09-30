import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TagService } from '../tag.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { TagCreateModel } from 'src/models/tag/tag-create.model';
import { TagModel } from 'src/models/tag/tag.model';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {
  tagForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  tag: TagModel;

  constructor(
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getTag();
  }

  getTag() {
    const id = this.route.snapshot.paramMap.get('id');

    this.tagService
      .getById(id)
      .subscribe(tag => {
        this.tag = tag;
        this.updateForm();
      });

  }

  createForm() {
    this.tagForm = this.fb.group({
      id: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
    });
  }

  updateForm() {
    this.tagForm = this.fb.group({
      id: [this.tag.id, [Validators.required]],
      descricao: [this.tag.descricao, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
    });
  }

  get f() {
    return this.tagForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.tagForm.valid) {
      const tagsToUpdate = [];
      tagsToUpdate.push(new TagCreateModel(this.tagForm.value));

      this.tagService.put(tagsToUpdate)
        .subscribe(() =>
          this.router.navigate(['/neocms/noticia/tag'])
        );
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}
