// Importing necessary modules
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path from 'path'

class I18nService {
  constructor() {
    i18next.use(Backend).init({
      lng: 'en', // langue par défaut
      fallbackLng: 'en',
      preload: ['en'], // à ajuster selon les langues
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}.json'),
      },
      interpolation: {
        escapeValue: false // car Node.js ne nécessite pas d'échappement
      }
    })
  }

  // Définir la langue courante
  setLocale(locale: string) {
    i18next.changeLanguage(locale)
  }

  // Obtenir une traduction
  getTranslations(key: string): string {
    return i18next.t(key)
  }
}

export default new I18nService()