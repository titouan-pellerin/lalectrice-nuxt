import { ILivre } from '../typings/livre';
import { useState } from '#app'

export const useBooks = () => {
    return useState<ILivre[]>('books', () => []);
}

export const useOffset = () => {
    return useState<number>('offset', () => 0);
}
