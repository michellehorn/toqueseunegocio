export class Post {
    id: number;
    titulo: string;
    autor: string;
    data: string;
    subtitulo: string;
    subPostagem: [
        {
            id: number,
            titulo: string,
            listaSubItens: string
        }
    ];
    assunto: [
        {
            id: number;
            nome: string;
        }
    ];
}

