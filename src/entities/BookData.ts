interface Book {
  status: boolean;
  id: string;
  images: { small: string; big: string };
  title: string;
  description: string;
  published: number;
  author: string;
  isInFavorites: boolean;
}

export type rawBookData = {
  [key: string]: unknown;
  volumeInfo: {
    title: string;
    imageLinks: { thumbnail: string; smallThumbnail: string };
    description: string;
    publishedDate: number;
    authors: string[];
  };
};

export class BookData implements Book {
  public id = "";
  public images = { small: "", big: "" };
  public title = "";
  public description = "";
  public published = 0;
  public author = "";
  public isInFavorites = false;
  public status: boolean;

  constructor(data: rawBookData) {
    try {
      this.id = data.id as string;
      this.title = data.volumeInfo.title;
      this.description = data.volumeInfo.description;
      this.published = data.volumeInfo.publishedDate;
      this.author = data.volumeInfo.authors[0] ?? "";
      this.images = {
        small: data.volumeInfo.imageLinks.smallThumbnail,
        big: data.volumeInfo.imageLinks.thumbnail,
      };
      this.status = true;
    } catch {
      this.status = false;
    }
  }
}
