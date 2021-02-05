import { Component, OnInit } from '@angular/core';
import { faColumns, faDotCircle, faImages, faMedal, faUsers } from '@fortawesome/free-solid-svg-icons';
import { PostBlogModel } from 'src/models/posts-blog/posts-blog.model';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    bannersAtivos: number = undefined;
    postsAtivos: number = undefined;
    userCount: number = 0;
    postsMaisLidos: any[] = [];
    postSelecionado: PostBlogModel = null;
    loaded: boolean;

    faUsers = faUsers;
    faImages = faImages;
    faColumns = faColumns;
    faDotCircle = faDotCircle;
    faMedal = faMedal;
    postResult: PostBlogModel[] = [];

    constructor(
        private dashboardService: DashboardService,
    ) { }

    ngOnInit() {
        this.getUsuarios();
        this.getBannersAtivos();
        this.getPostsAtivos();
        this.getPostsMaisLidos();
        this.loaded = true;
    }

    getUsuarios() {
        this.dashboardService
            .getUsuarios()
            .subscribe(resp => {
                this.loaded = true;
                this.userCount = resp;
            },
                error => {
                    this.loaded = true;
                });
    }

    getPostsMaisLidos() {
        this.dashboardService
            .getPostsMaisLidos()
            .subscribe(resp => {
                this.loaded = true;
                this.postsMaisLidos = resp;
                console.log(this.postsMaisLidos)
            },
                error => {
                    this.loaded = true;
                });

        // this.postSelecionado = this.postsMaisLidos[0];
    }

    getPostsAtivos() {
        this.dashboardService
            .getPostsAtivos()
            .subscribe(resp => {
                this.loaded = true;
                this.postsAtivos = resp;
            },
                error => {
                    this.loaded = true;
                });
    }

    getBannersAtivos() {
        this.dashboardService
            .getBannerAtivos()
            .subscribe(resp => {
                this.loaded = true;
                this.bannersAtivos = resp;
            },
                error => {
                    this.loaded = true;
                });
    }

    changePost(index) {
        let filterPost = this.postsMaisLidos.filter(x => x.id == index);
        return this.postSelecionado = filterPost[0];
    }

}
