React JS



React (commonly referred to as React.js or ReactJS) is an open‑source JavaScript library for building user interfaces. Developed and maintained by Meta (formerly Facebook) and a large community, React powers a huge portion of the web and many native mobile apps.



Key concepts and features:



1\. \*\*Component‑based architecture\*\* – UIs are composed of reusable, self‑contained components. Each component manages its own rendering logic and can be combined to build complex interfaces.

2\. \*\*Functional and class components\*\* – Components can be declared as JavaScript functions (the preferred modern style using hooks) or as ES6 classes with lifecycle methods.

3\. \*\*Declarative rendering\*\* – You describe what the UI should look like for a given state, and React ensures the DOM matches that description.

4\. \*\*Virtual DOM \& efficient updates\*\* – React maintains a lightweight in‑memory representation of the DOM. When component state changes, React diff‑matches and only re‑renders the affected components, improving performance.

5\. \*\*State and props\*\* – Components receive input via props and manage internal state; changes to either trigger a re‑render of that component tree.

6\. \*\*Web and native support\*\* – React is primarily used for web apps, while React Native lets you build native mobile apps with the same component model.

7\. \*\*Single‑page and multi‑page apps\*\* – React was originally designed for single‑page applications (SPAs). With routing libraries (e.g., React Router), you can create multi‑page user experiences while keeping SPA performance.

8\. \*\*Ecosystem and tooling\*\* – A rich ecosystem of libraries, tools (Create React App, Next.js, Vite, etc.), and community resources makes building and scaling React applications easier.



React’s emphasis on reusable components and efficient rendering makes it a popular choice for modern front‑end development.





Creating a  react js application



1\) We need node js installed ( it installs a tool called npm \[NODE PACKAGE MANAGER])

2\) Use the command "npm create vite@latest" in terminal to get project structue, and installs all dependencies packages and host

project name : lower case, seperated by "-" no spaces

3\) .gitignore - > write files name here which will be ignored by git





COMPONENETS :



A react component is an independent element of an webpage which will act as a basic building block 



A component can decide , the content to be displayed or rendered as a part of the webpage



There are two types of components:

&nbsp;	1)Functional Component (mostly used)

&nbsp;	2)Class Component 



Function Component: 



It is defined as java script function, that returns the content to be displayed.

when a component is created by defining a function, it must be exported using export default <<component name>>

To use a component, it needs to be imported using import <<component name>> from './Component file name'

Mount the component as a tag ex: <Component name />



Note:

&nbsp;	1)The component name must begin with a **Upper Case letter**.

&nbsp;	2)A component can return only one element, It cannot return multiple elements.

&nbsp;	3)If we wish to return multiple elements, Those elements must be wrapped into a single element.

&nbsp;	4)Every component must be used as a paired element ie it must have opening tag and closing tag

