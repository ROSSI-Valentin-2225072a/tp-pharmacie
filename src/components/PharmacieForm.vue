<script setup>
import {Medicament} from "@/Medicament.js";
import { ref } from "vue";

const emit = defineEmits(["eventEnregistrer"]);

const denominationMed = ref("");
const formepharmaceutiqueMed = ref("");
const qteMed = ref("");
const photoMed = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Veuillez télécharger une image au format .jpg, .jpeg ou .png");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      photoMed.value = reader.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  }
};

const enregistrerMedicament = () => {
  const newMedicament = {
    denomination: denominationMed.value,
    formepharmaceutique: formepharmaceutiqueMed.value,
    qte: qteMed.value,
    photo: photoMed.value,
  };
  emit("eventEnregistrer", newMedicament);
}

</script>

<template>
  <v-card>
    <form @submit.prevent="enregistrerMedicament">
      <input placeholder="Dénomination" type="text" v-model="denominationMed" />
      <input placeholder="Forme pharmaceutique" type="text" v-model="formepharmaceutiqueMed" />
      <input placeholder="Quantité" type="number" v-model="qteMed" />
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <v-btn type="submit">Enregistrer</v-btn>
    </form>
  </v-card>
</template>

<style scoped>
.v-card {
  max-width: 750px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.v-btn {
  background: linear-gradient(90deg, #34d399, #10b981);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 15px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.v-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 12px rgba(16, 185, 129, 0.3);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 2px solid #10b981;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

input:focus {
  border-color: #0f9b82;
  box-shadow: 0px 0px 8px rgba(16, 185, 129, 0.3);
}

</style>
