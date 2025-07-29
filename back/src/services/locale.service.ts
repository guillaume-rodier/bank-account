// Importing necessary modules
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path from 'path'

class I18nService {
  constructor() {
    i18next.use(Backend).init({
      lng: 'en', // default language
      fallbackLng: 'en',
      preload: ['en'], // to be adjusted according to the languages
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}.json'),
      },
      interpolation: {
        escapeValue: false // because Node.js does not require escaping
      }
    })
  }

  // Set current language
  setLocale(locale: string) {
    i18next.changeLanguage(locale)
  }

  // Get a translation
  getTranslations(key: string): string {
    return i18next.t(key)
  }
}

export default new I18nService()