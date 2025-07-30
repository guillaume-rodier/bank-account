<template>
  <v-container class="mt-12" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold">
            À propos de cette application
          </v-card-title>

          <v-card-text class="text-body-1">
            <p>
              Cette application de gestion de compte bancaire vous permet de :
            </p>
            <ul class="mt-2">
              <li>Afficher le solde de votre compte</li>
              <li>Effectuer des dépôts et des retraits</li>
              <li>Définir une limite de découvert</li>
              <li>Appliquer des intérêts en fin d’année</li>
            </ul>
            <p class="mt-4">
              Elle utilise <strong>Vue 3</strong>, <strong>Pinia</strong> pour la gestion d’état,
              <strong>Vuetify</strong> pour l’interface, et un backend Node.js avec Express.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" to="/">Retour à l'accueil</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>
