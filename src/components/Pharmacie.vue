<script setup>
import {onMounted, onUpdated, reactive, watch} from "vue";
import { Medicament } from "@/Medicament.js";
import PharmacieItem from "@/components/PharmacieItem.vue";
import PharmacieForm from "@/components/PharmacieForm.vue";

const listeMedicaments = reactive([]);

const url = "https://apipharmacie.pecatte.fr/api/28/medicaments"

function getMedicaments() {
  const fetchOptions = { method: "GET" };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      const results = dataJSON;
      //console.log(dataJSON);
      listeMedicaments.splice(0, listeMedicaments.length);
      results.map((medicament) => {
        listeMedicaments.push(new Medicament(medicament));
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des médicaments", error);
    });
}

function handlerSupprimer(medicament) {
  const fetchOptions = {
    method: "DELETE",
  };

  fetch(url + `/${medicament.id}`, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      //console.log(dataJSON);
      getMedicaments();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du médicament", error);
    });
}

function handlerModifier(medicament) {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicament),
  };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      //console.log(dataJSON);
      //console.log(medicament)
      getMedicaments();
    })
    .catch((error) => {
      console.error("Erreur lors de la modification du médicament", error);
    });
}

function handlerAjouter(medicament) {
  const medicamentIncremented = {
    id: medicament.id,
    qte: medicament.qte + 1,
  }

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicamentIncremented),
  };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      //console.log(dataJSON);
      getMedicaments();
    })
    .catch((error) => {
      console.error("Erreur lors de l'incrémentation du médicament", error);
    });
}

function handlerEnlever(medicament) {
  const medicamentDecremented = {
    id: medicament.id,
    qte: medicament.qte - 1,
  }

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicamentDecremented),
  };

  fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((dataJSON) => {
        //console.log(dataJSON);
        getMedicaments();
      })
      .catch((error) => {
        console.error("Erreur lors de la décrementation du médicament", error);
      });
}

function handlerEnregistrer(medicament) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicament),
  };

  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
      // console.log(dataJSON);
      getMedicaments();
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement du médicament", error);
    });
}

onMounted(() => {
  getMedicaments();
});

</script>

<template>

  <section>
    <h2 class="styled-header2">Liste des médicaments</h2>

    <v-container>
      <v-row dense>
        <v-col v-for="medicament in listeMedicaments" :key="medicament.id">
          <PharmacieItem
              :medicament="medicament"
              @eventSupprimer="handlerSupprimer"
              @eventModifier="handlerModifier"
              @eventAjouter="handlerAjouter"
              @eventEnlever="handlerEnlever"
              />
        </v-col>
      </v-row>
    </v-container>

    <h2 class="styled-header2">Ajouter un médicament</h2>

    <PharmacieForm @eventEnregistrer="handlerEnregistrer"/>
  </section>

</template>

<style scoped>
.styled-header2 {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #2c7a7b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 3px solid #10b981;
  display: inline-block;
}
</style>