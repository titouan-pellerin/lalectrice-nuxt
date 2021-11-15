import { IAuteur } from './auteur';

/**
 * Model definition for Interview
 */
export interface IInterview {
  id: string;
  contenu: string;
  auteur?: IAuteur;
  photo: any;
}