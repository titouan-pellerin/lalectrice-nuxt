import { ILivre } from './livre';

/**
 * Model definition for Chronique
 */
export interface IChronique {
  id: string;
  contenu: string;
  livre?: ILivre;
  epinglee: boolean;
  publication?: Date;
}