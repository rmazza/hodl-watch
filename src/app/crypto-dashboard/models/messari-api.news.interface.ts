export interface News  {
    status: Status;
    data:   NewsData[];
}

export interface NewsData {
    id:              string;
    title:           string;
    content:         string;
    references:      Reference[];
    reference_title: null;
    published_at:    Date;
    author:          Author;
    tags:            string[];
    url:             string;
}

export interface Author {
    name: string;
}

export interface Reference {
    name: string;
    url:  string;
}

export interface Status {
    elapsed:   number;
    timestamp: Date;
}
