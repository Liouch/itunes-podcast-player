# Itunes podcast player

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It implements the following design [Itunes figma Design](<https://www.figma.com/file/bDI2O5GkLkOOx9Ne2khVBW/Free-Podcast-Player-Web-Design-(Community)?type=design&node-id=0-1&mode=design>) and follows the idea of hexagonal architecture.

As stated in the requirements, Material UI and TailwindCSS have been used to build the User Interface and it has been set up so Material UI does not override Tailwind CSS classes.

Moment.js has been used also to format the released date and track time.

The code test consists in just one screen as due to the lack of time, the second screen has not been developed.

In order to build the project I opted to break it down to smaller tasks and use the [git convention commits](https://www.conventionalcommits.org/en/v1.0.0/).

The tasks follows as such:

```
1 Podcast Search
#1.1 Create /home or /search view
#1.2 Create search input component
#1.3 Create Search table and search result components (keep in mind the table component is reusable and TH ares going to be different and img and title/description cells are going to be reusable)
    #1.3.1 Create Table results and PlayPauseButton component
    #1.3.2 Create PodcastSummary component to be used in the tableResults component and later on PodcastPlayer
    #1.3.3 Create PodcastDescription component
    #1.3.4 Create PodcastRelease component and install moment library to show the release date
    #1.3.5 Create sort table component and implement the logic to sort the results by the the heading tables
    #1.3.6 Add click event to the result component which takes you to /podcast/{ID} (Not done)

2 Podcast Player
#2.1  Create PodcastPlayer component and make modifications to the rest of components to build PodcastPlayer
#2.2 Create GlobalState to share between components and avoid uplifting states and prop drilling
#2.3 Create PodcastPlayer component which uses the global state to retrieve the active track when user plays/pauses a track. Also add functionality for the play/pause, previou and next buttons

3 Podcast Detail (Not done)
#3.1 Create /podcast/{id} view
#3.2 Implement Back button which takes you to home and add search bar component
#3.3 Add Podcast Image
#3.4 Add Table results
#3.5 Add add/pause functionality (the big button)

```

## To run de project

### `Download the repository`

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `Request temporary access to cors anywhere`

Go to https://cors-anywhere.herokuapp.com/ and request temporary access by clicking the button shown on the page.

#### `You can start searching podcasts on the search bar`

---

### `Run the tests`

#### `npm test`

Launches the test runner in the interactive watch mode.
7 tests have been created covering the essentials.
PodcastPlayer is missing tests at the moment.

### Folder Tree Structure

```bash
.
└── itunes-podcast-player/
    ├── node_modules
    ├── public
    ├── src/
    │   ├── domain/
    │   │   ├── models/
    │   │   │   ├── GlobalState.ts
    │   │   │   └── Podcast.ts
    │   │   ├── repositories/
    │   │   │   └── PodcastRepository.ts
    │   │   └── services/
    │   │       └── PodcastService.ts
    │   ├── infrastructure/
    │   │   ├── http/
    │   │   │   ├── dto
    │   │   │   └── PodcastDTO.ts
    │   │   ├── repositories/
    │   │   │   └── podcastRepository.ts
    │   │   └── view/
    │   │       ├── components/
    │   │       │   └── AllComponentsFolders
    │   │       ├── contexts/
    │   │       │   └── PodcastGlobalContext.tsx
    │   │       ├── search/
    │   │       │   ├── index.ts
    │   │       │   ├── Search.test.tsx
    │   │       │   └── Search.tsx
    │   │       ├── App.css
    │   │       └── App.tsx
    │   ├── routes/
    │   │   └── root.tsx
    │   ├── index.css
    │   └── index.tsx
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tailwind.config.js
    └── tsconfig.json
```
