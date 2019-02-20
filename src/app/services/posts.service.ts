import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostsService {

    constructor(private http: HttpClient) { }

    // abrir post especifico
    getPost(id): Promise<any> {
        const posts = this.getJsonASync('../../assets/data/posts');
        return posts[id];
    }


    // getall posts
    listPosts(): Promise<any> {
        return this.getJsonASync('../../assets/data/posts');
    }

    public getJsonASync(fileName): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`../assets/data/${fileName}.json`).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    reject(`Fail to fetch ${fileName}.json file`);
                }
            );
        }).catch((reason) => console.log(reason));
    }


}
