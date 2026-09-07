# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Production chatbot configuration

The portfolio is hosted on GitHub Pages, while the LLM API runs as a separate backend. Before building or deploying the frontend, set `REACT_APP_API_URL` to the public HTTPS URL of the backend:

```bash
REACT_APP_API_URL=https://your-backend.example.com npm run deploy
```

### Portfolio analytics configuration

The frontend can send privacy-conscious page-view and click events to the Google Apps Script web app. Copy `.env.example` to `.env.local` for local development, then set the endpoint URL supplied by the Apps Script deployment:

```bash
REACT_APP_ANALYTICS_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
```

For a GitHub Pages deployment, set the same `REACT_APP_ANALYTICS_ENDPOINT` environment variable in the build/deploy environment. The frontend only sends anonymous identifiers, page and link metadata, UTM values, screen dimensions, referrer, and user agent; it never sends form field values.

The backend must allow `https://apoorvarajan.github.io` through `FRONTEND_ORIGIN`. GitHub Pages cannot proxy `/api/chat` to a local or private backend.

### Deploy the backend on Render

This repository includes `render.yaml` for the LangGraph API. In Render, create a new Blueprint from this repository and set `OPENAI_API_KEY` in the service environment. Render will use `backend` as the root directory, run `npm ci`, start with `npm start`, and expose `/api/health` for health checks.

After Render gives the service a URL, redeploy the frontend with that URL:

```bash
REACT_APP_API_URL=https://your-service.onrender.com npm run deploy
```

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
