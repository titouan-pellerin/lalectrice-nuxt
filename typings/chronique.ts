import { ILivre } from "./livre";

/**
 * Model definition for Chronique
 */
export interface IChronique {
  id: string;
  contenu: string;
  livre?: ILivre;
  titre?: string;
  epinglee: boolean;
  publication?: Date;
}
