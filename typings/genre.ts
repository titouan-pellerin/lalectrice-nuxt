import { ILivre } from './livre';

/**
 * Model definition for Genre
 */
export interface IGenre {
  id: string;
  nom: string;
  slug?: string;
  livres: ILivre[];
}