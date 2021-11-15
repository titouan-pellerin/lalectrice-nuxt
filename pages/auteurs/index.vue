<template>
    <div class="auteurs">
        <h1>Auteurs</h1>
        <ul v-for="author in authors" :key="author.id">
            <li>
                <nuxt-link :to="'/auteurs/' + author.slug">{{ author.nom }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { AsyncData } from 'nuxt3/dist/app/composables/asyncData';
import { defineComponent } from 'vue';
import { IAuteur } from '~~/typings';

export default defineComponent({
    async setup() {
        const config = useRuntimeConfig();

        const { data: authors } = await useFetch(config.API_URL + '/auteurs?_limit=1000&_sort=nom:ASC') as AsyncData<IAuteur[]>;
        if (authors.value && authors.value.length > 0) return { authors, config };
        return { authors: null, config };
    },

})
</script>
