import { Component, OnInit } from '@angular/core';
import { Data } from '../../../core/models/data';
import { Post } from '../../../core/models/post';
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from '../../../services/posts.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertService } from '../../../services/alert.service';
import { HttpClient } from '@angular/common/http';


class User {
  nome: string;
  email: string;
  tipo: string;
  data_hora: string;
  ip: string;
}


@Component({
  selector: "app-detail-post",
  templateUrl: "./detail-post.component.html",
  styleUrls: ["./detail-post.component.scss"]
})
export class DetailPostComponent implements OnInit {
  user = new User();
  dataPost: Post;
  lastPost: Post;
  postId: string;

  postsCol: AngularFirestoreCollection<Post>;
  post: Observable<Post>;

  liberaDownload: boolean;

  userIp: string;


  constructor(
    private postsService: PostsService,
    private data: Data,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private afs: AngularFirestore,
    private alertService: AlertService) {}

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.postId = this.route.snapshot.paramMap.get("id");
    this.liberaDownload = false;

    this.loadPost();
    $("html, body").animate({
      scrollTop: 0
    });
    this.http.get('https://jsonip.com/').subscribe(data => {
      this.setUserIp(data);
    });
  }

  loadPost() {
    this.postsCol.valueChanges().subscribe(dt => {
      this.dataPost = dt.find((obj) => obj.id === parseFloat(this.postId));
      if (!this.dataPost) {
      this.alertService.error('Erro', 'Artigo não encontrado.');
      this.router.navigate(['posts']);
    }
    }, error => {
    });
  }

  setUserIp(data) {
    this.userIp = data.ip;
  }

  // formatar data
addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

getFullTime(time) {
  // tslint:disable-next-line:max-line-length
  return time.getFullYear() + '-' + this.addZeroBefore(time.getMonth() + 1) + '-' + this. addZeroBefore(time.getDate()) + ' ' + this.addZeroBefore(time.getHours()) + ':' + this.addZeroBefore(time.getMinutes()) + ':' + this.addZeroBefore(time.getSeconds());
}

  sendData(data) {
    const userData = {
      nome: data.nome,
      email: data.email,
      tipo: 'B2C',
      data_hora: this.getFullTime(new Date()),
      ip: this.userIp
    };

    if (userData.nome !== '' && userData.email !== '') {
      this.afs
        .collection("leads")
        .add(userData)
        .then(() => {
         this.liberaDownload = true;
        });
    }
  }
}
