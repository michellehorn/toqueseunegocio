import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/models/post';
import { ActivatedRoute, Router } from "@angular/router";
import { Data } from '../../core/models/data';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from "jquery";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  post: Post;
  loading = false;
  categoriaId: string;
  isPageCategoria = false;
  titulo = 'Últimas matérias';
  categoryNullMessage: boolean;

  postsCol: AngularFirestoreCollection<Post>;

  listaDePosts: Observable<Post[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: Data,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url[1] !== undefined) {
        this.categoriaId = url[1].path;
      }
      this.loading = true;
      this.listPosts();

      if (this.categoriaId) {
        switch (this.categoriaId) {
          case '1':
            this.titulo = 'Empreendedorismo';
            break;
          case '2':
            this.titulo = 'Finanças';
            break;
          case '3':
            this.titulo = 'Gestão de Negócios';
            break;
          case '4':
            this.titulo = 'Recursos Humanos';
            break;
        }
      }
    });
  }
  listPosts() {
    if (this.categoriaId) {
      this.postsCol = this.afs.collection('posts', ref => ref.where('categoria', '==', this.categoriaId));

    } else {
      this.postsCol = this.afs.collection('posts');
    }
    this.listaDePosts = this.postsCol.valueChanges();

    this.listaDePosts.subscribe(result => {
      if (result.length < 1) {
        this.categoryNullMessage = true;
      } else {
        this.categoryNullMessage = false;
      }
    });

  }



  openPost(post) {
    this.data.storage = post;
    // tslint:disable-next-line:no-unused-expression
    this.router.navigate(['posts/' + post.id]);
  }
}
