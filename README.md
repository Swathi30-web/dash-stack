# DashStack (React + TypeScript + Tailwind + json-server)

```bash
npm install
npm start          # runs the API (port 3001) and the app (port 5173) together
```

Or in two terminals: `npm run server` and `npm run dev`.

## Data
All data lives in `db.json` and is served by [json-server](https://github.com/typicode/json-server):

| Resource    | URL                                | Used by                          |
|-------------|------------------------------------|----------------------------------|
| `products`  | http://localhost:3001/products     | Products, Favorites (`liked`)    |
| `team`      | http://localhost:3001/team         | Team                             |
| `contacts`  | http://localhost:3001/contacts     | Contact                          |
| `events`    | http://localhost:3001/events       | Calendar                         |
| `stock`     | http://localhost:3001/stock        | Product Stock, Table             |

Edit `db.json` by hand while the server is running and refresh the page to see the change.
The API address is set in `src/api.tsx` (override with `VITE_API_URL`, see `.env.example`).

Login/sign-up, settings and the theme still use localStorage (front-end demo).
Dark mode: toggle button in the top bar.
