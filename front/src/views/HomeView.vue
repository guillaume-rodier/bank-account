<template>
  <v-container class="mt-8">
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="4000"
      :color="snackbar.color"
      location="end top"
    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          color="indigo"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

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
              <p data-testid="balance"><strong>Solde :</strong> {{ store.account.balance }} €</p>
              <p data-testid="limit"><strong>Limite autorisée :</strong> {{ computedLimitAllowed }}</p>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-text>
            <v-text-field
              v-model.number="depositAmount"
              data-testid="deposit-input"
              label="Montant du dépôt"
              type="number"
              class="mb-3"
              variant="solo"
              min="0"
              hide-details
            />

            <v-btn
              :loading="loading.deposit"
              :disabled="depositAmount <= 0"
              data-testid="deposit-button"
              color="success"
              class="mb-6"
              @click="handleDeposit"
            >
              Déposer
            </v-btn>

            <v-text-field
              v-model.number="withdrawAmount"
              label="Montant du retrait"
              type="number"
              class="mb-3"
              variant="solo"
              min="0"
              hide-details
            />

            <v-btn
              :loading="loading.withdraw"
              :disabled="withdrawAmount <= 0"
              color="error"
              class="mb-6"
              @click="handleWithdraw"
            >
              Retirer
            </v-btn>

            <v-text-field
              v-model.number="limitAmount"
              label="Nouvelle limite (0 pour supprimer)"
              type="number"
              class="mb-3"
              variant="solo"
              min="0"
              hide-details
            />

            <v-btn
              :loading="loading.limit"
              :disabled="limitAmount < 0"
              color="primary"
              class="mb-3 mr-2"
              @click="handleSetLimit"
            >
              Définir la limite
            </v-btn>

            <v-btn
              :loading="loading.removeLimit"
              color="grey darken-1"
              class="mb-3 mr-2"
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

const snackbar = reactive({
  visible: false,
  text: '',
  color: 'info',
});

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
    snackbar.text = response?.message || 'Dépôt effectué avec succès';
    snackbar.color = 'success';
    snackbar.visible = true;
    depositAmount.value = 0;
  } catch (e) {
    snackbar.text = e.response?.data?.message || e.message || 'Erreur lors du dépôt';
    snackbar.color = 'error';
    snackbar.visible = true;
  } finally {
    loading.deposit = false;
  }
}

async function handleWithdraw() {
  loading.withdraw = true;
  message.value = null;
  try {
    const response = await store.withdraw(withdrawAmount.value);
    snackbar.text = response?.message || 'Retrait effectué avec succès';
    snackbar.color = 'success';
    snackbar.visible = true;
    withdrawAmount.value = 0;
  } catch (e) {
    snackbar.text = e.response?.data?.message || e.message || 'Erreur lors du retrait';
    snackbar.color = 'error';
    snackbar.visible = true;
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
    snackbar.text = response?.message || 'Limite mise à jour';
    snackbar.color = 'success';
    snackbar.visible = true;
    limitAmount.value = 0;
  } catch (e) {
    snackbar.text = e.response?.data?.message || e.message || 'Erreur lors de la mise à jour de la limite';
    snackbar.color = 'error';
    snackbar.visible = true;
  } finally {
    loading.limit = false;
  }
}

async function handleRemoveLimit() {
  loading.removeLimit = true;
  message.value = null;
  try {
    const response = await store.setLimit(null);
    snackbar.text = response?.message || 'Limite retirée';
    snackbar.color = 'success';
    snackbar.visible = true;
  } catch (e) {
    snackbar.text = e.response?.data?.message || e.message || 'Erreur lors du retrait de la limite';
    snackbar.color = 'error';
    snackbar.visible = true;
  } finally {
    loading.removeLimit = false;
  }
}

async function handleApplyInterest() {
  loading.interest = true;
  message.value = null;
  try {
    const response = await store.applyInterest({
      account: store.account,
      rate: 0.05
    });
    snackbar.text = response?.message || 'Intérêt appliqué';
    snackbar.color = 'success';
    snackbar.visible = true;
  } catch (e) {
    snackbar.text = e.response?.data?.message || e.message || "Erreur lors de l'application de l'intérêt";
    snackbar.color = 'error';
    snackbar.visible = true;
  } finally {
    loading.interest = false;
  }
}

function closeSnackbar() {
  snackbar.visible = false
}

onMounted(async () => {
  await store.fetchAccount();
});
</script>
