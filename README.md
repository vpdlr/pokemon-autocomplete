# Autocomplete Pokémon Search
This is a simple autocomplete search component built in React that allows users to search for Pokémon names. As users type, the list of Pokémon updates dynamically, filtering based on their input. The suggestions come from the Pokémon API, providing a large selection of Pokémon names.

## Features

- **Autocomplete Search:** As you type, suggestions update based on the beginning of Pokémon names.
- **Debounced Input:** To improve performance, a 300ms debounce delay is applied to the search.
- **Clickable Suggestions:** You can click a suggestion to autofill the input with the selected Pokémon’s name.
- **Loading Indicator:** A loading indicator is shown while the data is being fetched from the API.

## How it Works
The component fetches Pokémon data from the Pokémon API, which provides a list of Pokémon (with their names). The API returns up to 1000 Pokémon, which are filtered dynamically based on the user’s search query.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokemon-autocomplete.git
````

2. Navigate to the project directory:

```bash
cd pokemon-autocomplete
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```
Your app will be available at http://localhost:3000.

## Testing it Out
You can test the autocomplete search by typing any of the following Pokémon names:

- pikachu
- charmander
- bulbasaur
- squirtle
- jigglypuff

These names are a few examples from the Pokémon API and should appear as suggestions once you begin typing.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Pokémon API:** Provides Pokémon data including names and URLs.
- **CSS:** Basic styling for the search component.