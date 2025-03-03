<script setup>
import { ref } from "vue";

const rechercheDenomination = ref("");
</script>

<template>

  <v-container>
    <v-form @submit.prevent="$emit('eventRechercher', rechercheDenomination)">
      <v-text-field v-model="rechercheDenomination" label="Recherche médicament" />
      <v-btn type="submit">Rechercher</v-btn>
    </v-form>
  </v-container>

</template>

<style scoped>

</style>