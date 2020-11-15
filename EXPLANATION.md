### Why React?
I want to try and experiment again with React and get some insights of what has improved over these 1 year and comparing React and Vue at the same time, React has its own learning curve, so i try my best to implement the React thinking, such as the library approach, Immutability concept and its interesting Hooks, I have a lot of fun.

### Where did you get the design references?
Admin LTE, and also Halofina's own web admin, I highlighted two main part, sum of all the prices and transaction sum, because i think those two datas are important to highlight so user can see realtime data and just in case if any of users' manual accounting has errors, they can compare it to the system.

### Beside React, were there any stacks you use?
Yes, i used:
- material-ui
- react-data-table-component, because material's data table is still limited
- Redux, for state management
- stein-js for API requests
- scss for styling

### Caching Mechanism?
I used Redux and then set the states to local Storage, it will get the local storage first and asynchronously get new data from API.

### Any issues?
The inputs somehow feels laggy, but it's a rare occassion, i guess it's because too much data provided, although with pagination the speed increases.

### Any notes or TODO?
I would like to:
- refactor, especially the Table.js component, but in my honest opinion, it is enough for now
- trace the lagginess, i have never had any issues with lagginess with Vue before, i assume that for now it's because the props are too much, and i'm not using any Hooks in the component.
- PWA with workbox
- The price sum data was not updating sometimes, i made the validation and it still did not work, but after i trace it, it's because the data was broken
