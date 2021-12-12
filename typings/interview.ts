import { IAuteur } from "./auteur";

/**
 * Model definition for Interview
 */
export interface IInterview {
  id: string;
  titre: string;
  contenu: string;
  auteur?: IAuteur;
  photo?: {
    url: string;
    caption?: string;
  };
  date?: Date;
  slug: string;
}
