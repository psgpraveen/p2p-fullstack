export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "owner" | "seeker";
  };
  
  export type Book = {
    _id: string;
    title: string;
    author: string;
    genre: string;             
    location: string;
    contact: string;
    imageBase64: string | null;
  };
  