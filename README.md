[![Run built, test and lint](https://github.com/MikheytsevNA/bookmark/actions/workflows/main.yml/badge.svg)](https://github.com/MikheytsevNA/bookmark/actions/workflows/main.yml)

[deploy](https://bookmark-mikheytsevna.netlify.app/)

# Bookmark

- Проект представляет собой галерею книг
- Использованное API: [Books API](https://developers.google.com/books?hl=en)

---

## Основной функционал

- Регистрация и авторизация пользователей
- Действия с кингами: гости и пользователи могут производить поиск и смотреть детальное описание, пользователь может добавлять или удалять из списка избранных, смотреть историю
- Поиск: стандартная страница результатов и быстрый поиск
- История поиска пользователя: сохранение истории поиска и перехода к описанию

---

## Реализация требований

### 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется LocalStorage.

#### React

- [x] Пишем функциональные компоненты c хуками в приоритете над классовыми
- [x] Есть разделение на умные и глупые компоненты: под вопросом, в основном глупые компоненты, либо смесь
- [x] Есть рендеринг списков: [Favorites](src/components/Favorites/Favorites.tsx), [SearchCards](src/components/SearchBookCard/SearchBooksCard.tsx)
- [x] Реализована хотя бы одна форма: [Login](src/components/Login/Login.tsx) via [Formik](https://formik.org/)
- [x] Есть применение Контекст API: [Navigation](src/components/Navigation/Navigation.tsx)
- [x] Есть применение предохранителя: [ErrorBoundary](src/main.tsx)
- [x] Есть хотя бы один кастомный хук: [useDebounce](src/util/useDebounce.ts), [useThrottle](src/util/useTrottle.ts)
- [x] Хотя бы несколько компонентов используют PropTypes: [Favorite](src/components/Favorites/Favorite.tsx) [SearchBar](src/components/SearchBar/SearchBar.tsx)
- [x] Поиск не должен триггерить много запросов к серверу (debounce): [SearchBar](src/components/SearchBar/SearchBar.tsx)
- [x] Есть применение lazy + Suspense: нет, но есть react-router lazy [Router(Login,Detailed)](src/main.tsx)

#### Redux

- [x] Используем Modern Redux with Redux Toolkit: [store](src/App/store.ts)
- [x] Используем слайсы: [navbarSlice](src/App/navBarSlice.ts)
- [x] Есть хотя бы одна кастомная мидлвара или `createListenerMiddleware`: [listenerMiddleware](src/App/store.ts)
- [x] Используется RTK Query: [booksApi](src/App/apiSlice.ts)
- [x] Используется Transforming Responses: [transformResponse](src/App/apiSlice.ts)

---

### 2 уровень (необязательный)

- [x] Используется TypeScript
- [x] Настроен CI/CD: CI - ок, баджик есть. CD - деплоится, но я не могу нормально забилдить vite + react-router - работает кривовато (странное поведение избранного, краши некоторых страниц при перезагрузке)

---

### Дополнительная информация

- [x] Проект собран при помощи [Vite](https://vitejs.dev)
- [x] При работе со стилями использовался [Bootstrap](https://getbootstrap.com)

### Другое

- Попытка использовать github actions для деплоя, но получилось не лучше, чем деплой на netlify, не говоря о кривом билде.
- Изначально планировалось использование другого [api](https://openlibrary.org/developers/api), но количество запросов на обложки оказалось слишком маленьким.
- Планирование c помощью github issues

### Оставшиеся вопросы

- В деплое браузер выкидывает тучу варнингов т.к. хост по https, а внутри есть запросы по http (запросы на обложки, адреса которых приходят от api). Пишут, что это не будут разрешать в будущем, а как решить - не знаю.
- Стейт селектора на количество запросов не сохраняется
