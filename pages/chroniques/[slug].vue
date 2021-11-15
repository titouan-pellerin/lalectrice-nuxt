<template>
    <div class="chronique" v-if="book">
        <h1>Titre : {{ book.titre }}</h1>
        <div v-if="book.auteurs.length > 0">
            Auteurs :
            <p v-for="auteur in book.auteurs" :key="auteur.id">
                <router-link :to="'/auteurs/' + auteur.slug">
                    {{ auteur.nom }}
                    <span v-if="auteur.traducteur">(traducteur)</span>
                </router-link>
            </p>
        </div>
        <p v-if="book.collection_livre">Collection : {{ book.collection_livre.nom }}</p>
        <p v-if="book.date">Parution : {{ book.date }}</p>
        <p v-if="book.description">Description : {{ book.description }}</p>
        <p v-if="book.editeur">Editeur : {{ book.editeur.nom }}</p>
        <p>ISBN : {{ book.isbn }}</p>
        <div v-if="book.genres.length > 0">
            Genres :
            <p v-for="genre in book.genres" :key="genre.id">{{ genre.nom }}</p>
        </div>
        <img v-if="book.couverture" :src="book.couverture?.url" />
        <div v-if="book.chronique">
            <h1>Chronique :</h1>
            <p>{{ book.chronique.contenu }}</p>
            <p v-if="book.chronique.epinglee">Est à la une</p>
            <p
                v-if="book.chronique.publication"
            >Date de publication : {{ new Date(book.chronique.publication).toLocaleDateString() }}</p>
        </div>
    </div>
    <div v-else class="error">
        <h1>Livre introuvable</h1>
    </div>
</template>

<script lang="ts">
import { AsyncData } from 'nuxt3/dist/app/composables/asyncData';
import { defineComponent } from 'vue';
import { ILivre } from '~~/typings';

export default defineComponent({
    async setup() {
        const config = useRuntimeConfig();

        const { data: book } = await useFetch(config.API_URL + '/livres?slug=' + useRoute().params.slug) as AsyncData<ILivre[]>;
        if (book && book.value.length === 1) return { book: book.value[0] };
        return { book: null };
    },

})
</script>