import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useAccountStore = defineStore('account', {
  state: () => ({
    account: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAccount() {
      try {
        this.loading = true;
        const { data } = await api.get('/api/account/');
        this.account = data;
        this.error = null;
        return data;
      } catch (e) {
        this.error = 'Erreur lors du chargement du compte';
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async deposit(amount) {
      try {
        const response = await api.post('/api/account/deposit', {
          amount,
        });
        await this.fetchAccount();
        return response.data;
      } catch (e) {
        throw e;
      }
    },

    async withdraw(amount) {
      try {
        const response = await api.post('/api/account/withdraw', {
          amount,
        });
        await this.fetchAccount();
        return response.data;
      } catch (e) {
        throw e;
      }
    },

    async setLimit(newLimit) {
      try {
        const response = await api.post('/api/account/limit', {
          limit: newLimit,
        });
        await this.fetchAccount();
        return response.data;
      } catch (e) {
        throw e;
      }
    },

    async applyInterest(payload) {
      try {
        const response = await api.post('/api/account/apply-interest', payload);
        await this.fetchAccount();
        return response.data;
      } catch (e) {
        throw e;
      }
    },
  },
});
