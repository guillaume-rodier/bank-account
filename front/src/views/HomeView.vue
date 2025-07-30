<template>
  <v-container class="mt-8">
    <v-alert
      v-if="message"
      type="info"
      class="mb-4"
      dismissible
      @dismissed="message = null"
    >
      {{ message }}
    </v-alert>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Compte
          </v-card-title>
          <v-card-text>
            <div v-if="!store.account">
              <v-alert type="info" border="start">Aucune donnée reçue.</v-alert>
            </div>
            <div v-else>
              <p><strong>Solde :</strong> {{ store.account.balance }} €</p>
              <p><strong>Limite autorisée :</strong> {{ computedLimitAllowed }}</p>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-text>
            <v-text-field
              v-model.number="depositAmount"
              label="Montant dépôt"
              type="number"
              min="0"
              outlined
              dense
              class="mb-3"
            />

            <v-btn
              :loading="loading.deposit"
              color="success"
              class="mb-4"
              @click="handleDeposit"
              :disabled="depositAmount <= 0"
            >
              Déposer
            </v-btn>

            <v-text-field
              v-model.number="withdrawAmount"
              label="Montant retrait"
              type="number"
              min="0"
              outlined
              dense
              class="mb-3"
            />

            <v-btn
              :loading="loading.withdraw"
              color="error"
              class="mb-4"
              @click="handleWithdraw"
              :disabled="withdrawAmount <= 0"
            >
              Retirer
            </v-btn>

            <v-text-field
              v-model.number="limitAmount"
              label="Nouvelle limite (0 pour supprimer)"
              type="number"
              min="0"
              outlined
              dense
              class="mb-3"
            />

            <v-btn
              :loading="loading.limit"
              color="primary"
              class="mb-4"
              @click="handleSetLimit"
              :disabled="limitAmount < 0"
            >
              Définir la limite
            </v-btn>

            <v-btn
              :loading="loading.removeLimit"
              color="grey darken-1"
              @click="handleRemoveLimit"
            >
              Retirer la limite de plafond
            </v-btn>

            <v-divider class="my-4"></v-divider>

            <v-btn
              :loading="loading.interest"
              color="indigo"
              @click="handleApplyInterest"
            >
              Appliquer l’intérêt
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useAccountStore } from '@/stores/account';

const store = useAccountStore();

const loading = reactive({
  deposit: false,
  withdraw: false,
  limit: false,
  removeLimit: false,
  interest: false,
});

const message = ref(null);
const depositAmount = ref(0);
const withdrawAmount = ref(0);
const limitAmount = ref(0);

const computedLimitAllowed = computed(() => {
  return store.account.authorizedLimit !== null
    ? `${store.account.authorizedLimit} €`
    : 'Aucune';
});

async function handleDeposit() {
  loading.deposit = true;
  message.value = null;
  try {
    const response = await store.deposit(depositAmount.value);
    message.value = response?.message || 'Dépôt effectué avec succès';
    depositAmount.value = 0;
  } catch (e) {
    message.value = e.response?.data?.message || e.message || 'Erreur lors du dépôt';
  } finally {
    loading.deposit = false;
  }
}

async function handleWithdraw() {
  loading.withdraw = true;
  message.value = null;
  try {
    const response = await store.withdraw(withdrawAmount.value);
    message.value = response?.message || 'Retrait effectué avec succès';
    withdrawAmount.value = 0;
  } catch (e) {
    message.value = e.response?.data?.message || e.message || 'Erreur lors du retrait';
  } finally {
    loading.withdraw = false;
  }
}

async function handleSetLimit() {
  loading.limit = true;
  message.value = null;
  try {
    const newLimit = limitAmount.value <= 0 ? null : limitAmount.value;
    const response = await store.setLimit(newLimit);
    message.value = response?.message || 'Limite mise à jour';
    limitAmount.value = 0;
  } catch (e) {
    message.value = e.response?.data?.message || e.message || 'Erreur lors de la mise à jour de la limite';
  } finally {
    loading.limit = false;
  }
}

async function handleRemoveLimit() {
  loading.removeLimit = true;
  message.value = null;
  try {
    const response = await store.setLimit(null);
    message.value = response?.message || 'Limite retirée';
  } catch (e) {
    message.value = e.response?.data?.message || e.message || 'Erreur lors du retrait de la limite';
  } finally {
    loading.removeLimit = false;
  }
}

async function handleApplyInterest() {
  loading.interest = true;
  message.value = null;
  try {
    const response = await store.applyInterest();
    message.value = response?.message || 'Intérêt appliqué';
  } catch (e) {
    message.value = e.response?.data?.message || e.message || "Erreur lors de l'application de l'intérêt";
  } finally {
    loading.interest = false;
  }
}

onMounted(async () => {
  await store.fetchAccount();
});
</script>
