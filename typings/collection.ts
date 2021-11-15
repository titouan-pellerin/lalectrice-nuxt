import { ILivre } from './livre';

/**
 * Model definition for Collection
 */
export interface ICollection {
  id: string;
  nom: string;
  slug: string;
  livres: ILivre[];
}