import { PostsBlogService } from 'src/app/neocms/posts-blog/posts-blog.service';

export class PostsUploadAdapter {

  constructor(
    private loader: any,
    private postsBlogService: PostsBlogService,
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
    return this.postsBlogService.uploadImage(file);
  }

  deleteImage(file: File) {
    return this.postsBlogService.deleteImage(file.name);
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
