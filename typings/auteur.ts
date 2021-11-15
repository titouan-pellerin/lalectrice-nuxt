import { IInterview } from './interview';
import { ILivre } from './livre';

/**
 * Model definition for Auteur
 */
export interface IAuteur {
  id: string;
  nom: string;
  traducteur?: boolean;
  slug?: string;
  photo?: {
    url: string
  };
  description?: string;
  biographie?: string;
  nationalite?: string;
  livres: ILivre[];
  interviews: IInterview[];
}