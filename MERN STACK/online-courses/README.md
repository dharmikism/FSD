# React Tutorial

This project is a small React playground for learning how the main pieces fit together: components, props, state, events, hooks, and rendering lists of data.

## What React Is

React is a JavaScript library for building user interfaces. Instead of manually updating the page, you describe what the UI should look like for a given state, and React updates the screen for you.

Use React when you want to build:

- interactive dashboards
- reusable UI components
- dynamic forms and buttons
- apps that update without full page reloads

## Project Structure

- `src/main.jsx` boots the app and renders React into the page.
- `src/App.jsx` contains the main component.
- `src/App.css` controls the page styling.
- `src/index.css` adds global styles.

## How To Run It

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually `http://localhost:5173`.

## Core React Ideas

### 1. Components

Components are reusable building blocks. A component is usually just a function that returns JSX.

```jsx
function Greeting() {
	return <h1>Hello from React</h1>
}
```

### 2. JSX

JSX lets you write UI that looks like HTML inside JavaScript.

```jsx
const title = <h2>React Tutorial</h2>
```

### 3. Props

Props let you pass data into a component.

```jsx
function Card({ title }) {
	return <h3>{title}</h3>
}

<Card title="Learn React" />
```

### 4. State

State stores values that can change over time.

```jsx
import { useState } from 'react'

function Counter() {
	const [count, setCount] = useState(0)

	return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 5. Events

React handles browser events with functions like `onClick`, `onChange`, and `onSubmit`.

```jsx
<button onClick={() => alert('Clicked!')}>Click me</button>
```

### 6. Conditional Rendering

Show different UI depending on a condition.

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

### 7. Lists

Render repeating UI from arrays with `map()`.

```jsx
const lessons = ['JSX', 'Props', 'State']

return (
	<ul>
		{lessons.map((lesson) => (
			<li key={lesson}>{lesson}</li>
		))}
	</ul>
)
```

### 8. Effects

Use `useEffect` when you need to sync with something outside React, such as data fetching or timers.

```jsx
import { useEffect } from 'react'

useEffect(() => {
	document.title = 'React Tutorial'
}, [])
```

## A Simple Mental Model

Think of React like this:

1. Start with data.
2. Use that data to decide what the UI should show.
3. Update the data with state when the user interacts.
4. React re-renders the view automatically.

## Good Practices

- Keep components small and focused.
- Use props to reuse UI.
- Store changing values in state.
- Always add a stable `key` when rendering lists.
- Avoid putting unrelated logic inside one component.

## Next Things To Learn

- forms and controlled inputs
- lifting state up
- `useEffect` cleanup
- fetching data from an API
- routing with React Router
- reusable component patterns

## Example Flow

1. Create a component.
2. Pass it props.
3. Add state where the UI changes.
4. Handle user events.
5. Break the UI into smaller components as it grows.

## Want To Practice

Try editing `src/App.jsx` and build one of these:

- a counter
- a todo list
- a profile card
- a simple course dashboard

## About This Template

This app uses Vite for fast development and React for the UI layer. If you want to expand it later, you can add routing, API calls, and more reusable components without changing the core structure.
