// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false,
        colors: {
          primary: '#E02600',
          secondary: '#424242',
          background: '#F5F5F5',
        },
        variables: {
          'font-family': 'Montserrat, sans-serif',
        },
      },
    },
  },
});
