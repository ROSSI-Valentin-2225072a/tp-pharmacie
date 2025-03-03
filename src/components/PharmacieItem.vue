<script setup>
  import {ref} from "vue";

  const props = defineProps(["medicament"]);
  const emit = defineEmits(["eventSupprimer", "eventModifier", "eventAjouter", "eventEnlever"]);

  const modification = ref(false);

  const denominationMed = ref(props.medicament.denomination);
  const formepharmaceutiqueMed = ref(props.medicament.formepharmaceutique);
  const qteMed = ref(props.medicament.qte);
  const photoMed = ref(null);
  const photoModifiee = ref(false);

  const modeModifier = () => {
    modification.value = !modification.value;
  }

  const modifMedicament = () => {
    const medicamentModifie = {
      id: props.medicament.id,
      denomination: denominationMed.value,
      formepharmaceutique: formepharmaceutiqueMed.value,
      qte: qteMed.value,
      photo: photoModifiee.value ? photoMed.value : null
    };
    emit("eventModifier", medicamentModifie);
    modification.value = false;
    photoModifiee.value = false;
  };

  const handleFileUpload = event => {
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
        photoModifiee.value = true;
      };
      reader.readAsDataURL(file);
    }
  };

</script>

<template>
  <v-card v-if="!modification">
    <v-card-title>{{ medicament.denomination }}</v-card-title>
    <v-card-text>
      <v-img :src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo" alt="Image du médicament" height="200px" />
      <p>{{ medicament.formepharmaceutique }}</p>
      <p>{{ medicament.qte }} </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('eventSupprimer', medicament)">Supprimer</v-btn>
      <v-btn @click="modeModifier">Modifier</v-btn>
      <v-btn @click="$emit('eventAjouter', medicament)">+ 1</v-btn>
      <v-btn @click="$emit('eventEnlever', medicament)">- 1</v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else>
    <v-card-title>Modifier le médicament</v-card-title>
    <form @submit.prevent="modifMedicament">
      <input type="text" v-model="denominationMed" />
      <input type="text" v-model="formepharmaceutiqueMed" />
      <input type="number" v-model="qteMed" />
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <v-btn type="submit">Enregistrer</v-btn>
    </form>
    <v-card-actions>
      <v-btn @click="modeModifier">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  max-width: 400px;
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.v-card-text {
  text-align: center;
}

.v-card-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.v-btn {
  background: linear-gradient(90deg, #34d399, #10b981);
  color: white;
  font-weight: bold;
  border-radius: 8px;
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