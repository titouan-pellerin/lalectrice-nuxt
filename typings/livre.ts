import { IAuteur } from './auteur';
import { IChronique } from './chronique';
import { ICollection } from './collection';
import { IGenre } from './genre';
import { IEditeur } from './editeur';

/**
 * Model definition for Livre
 */
export interface ILivre {
  id: string;
  titre: string;
  slug: string;
  auteurs: IAuteur[];
  pages?: number;
  isbn: string;
  couverture?: {
    url: string
  };
  collection_livre?: ICollection;
  editeur?: IEditeur;
  chronique: IChronique;
  genres: IGenre[];
  date?: Date;
  description?: string;
  coeur?: boolean;
}