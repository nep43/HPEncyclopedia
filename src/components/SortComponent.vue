<script setup>
import { ref } from 'vue'

</script>

<template>
  <div class="card">
  <img src="../assets/sebastien.jpg" alt="Image du sort">
  <div class="card-info">
    <p id="spell-title"><strong>Anapneo</strong></p>
    <p id="spell-category">Healing spell, Vanishment, Charm</p>
    <p id="spell-effect">Cleared target's airway by vanishing blockages</p>
  </div>
</div>
</template>

<style scoped>
    /* Style pour le conteneur principal de la carte */
    .card {
    display: flex; /* Utilisation de flexbox pour le positionnement des éléments */
    border-radius: 10px; /* Coins arrondis */
    overflow: hidden; /* Pour cacher le dépassement des coins arrondis */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Ombre légère */
    margin: 20px auto; /* Marge autour de la carte avec centrage horizontal */
    width: 500px; /* Largeur de la carte */
    height: 150px;
    align-items: center; /* Centrer verticalement les éléments */
    }
    .card:hover{
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3); /* Ombre légère */
    }

    /* Style pour la partie gauche de la carte (image) */
    .card img {
    height: 100%; /* Hauteur de l'image */
    width: 40%; /* Largeur automatique pour maintenir les proportions */
    border-radius: 10px 0 0 10px; /* Coins arrondis seulement sur la gauche */
    object-fit: cover; /* Conserver les proportions et remplir la zone */
    }

    /* Style pour la partie droite de la carte (informations) */
    .card-info {
    flex: 1; /* Remplir tout l'espace disponible */
    padding: 15px; /* Espacement intérieur */
    }

    /* Style pour le titre du sort */
    #spell-title {
    font-size: 20px; /* Taille de police du titre */
    margin-top: 0; /* Suppression de la marge supérieure par défaut */
    }

    /* Style pour la catégorie du sort */
    #spell-category {
    font-style: italic; /* Style italique pour la catégorie */
    margin-top: 5px; /* Marge en haut pour un espacement */
    }

    /* Style pour l'effet du sort */
    #spell-effect {
    margin-top: 5px; /* Marge en haut pour un espacement */
    }

</style>
