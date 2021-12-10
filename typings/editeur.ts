import { ILivre } from "./livre";

/**
 * Model definition for Éditeur
 */
export interface IEditeur {
  id: string;
  nom: string;
  slug: string;
  description?: string;
  lien?: string;
  livres: ILivre[];
  logo?: {
    url: string;
  };
}
