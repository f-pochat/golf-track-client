import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";



const client = new ApolloClient({
    uri: "http://127.0.0.1:4000/admin",
    cache: new InMemoryCache(),
    headers: {
        "Allow-Control-Allow-Origin":"True",
        "Authorization": "Bearer " + localStorage.getItem('TOKEN'),
    }
});

ReactDOM.render(
        <React.StrictMode>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/lux/bootstrap.min.css"
                  integrity="sha384-9+PGKSqjRdkeAU7Eu4nkJU8RFaH8ace8HGXnkiKMP9I9Te0GJ4/km3L1Z8tXigpG" crossOrigin="anonymous"/>
            <script src="https://kit.fontawesome.com/ea3bc2f346.js" crossOrigin="anonymous"/>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
