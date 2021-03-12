import { NoticiaService } from 'src/app/neocms/noticia/noticia.service';

export class UploadAdapter {

  constructor(
    private loader: any,
    private noticiaService: NoticiaService,
  ) { }

  upload() {
    const upload = new Promise((resolve, reject) => {
      this.loader['file'].then(
        (data) => {
          this.uploadFile(data)
            .subscribe((result) => {
              return resolve({ default: result["path"] })
            });
        }
      );
    });
    return upload;

    // return this.readThis(this.loader.file);
  }

  abort() {
    const abort = new Promise((resolve, reject) => {
      this.loader['file'].then(
        (data) => {
          this.deleteImage(data)
            .subscribe(
              (result) => {
                return resolve();
              }
            );
        }
      );
    });
    return abort;
  }

  uploadFile(file: File) {
    return this.noticiaService.uploadImage(file);
  }

  deleteImage(file: File) {
    return this.noticiaService.deleteImage(file.name);
  }

  readThis(file: File): Promise<any> {
    const imagePromise: Promise<any> = new Promise((resolve, reject) => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        const image = myReader.result;
        return resolve({ default: 'data:image/png;base64,' + image });
      };
    });
    return imagePromise;
  }
}
