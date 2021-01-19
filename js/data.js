/* exported data */

let data = {
  view: 'profile',
  profile: {
    avatarUrl: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDgzNDc5NjcyNTQz/portrait-of-john-smith.jpg',
    bio: 'Hi there, welcome to my code journal! I can view and edit my entries using the "Entries" button on the navigation bar.',
    fullName: 'John Smith',
    location: 'Irvine, CA',
    username: 'jsmith23'
  },
  entries: [
    {
      entryId: 101,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
      notes: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.',
      title: 'JavaScript'
    },
    {
      entryId: 102,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
      notes: 'React (also known as React.js or ReactJS) is an open-source, front end, JavaScript library[3] for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing.',
      title: 'React'
    },
    {
      entryId: 103,
      imageUrl: 'https://seeklogo.net/wp-content/uploads/2015/09/nodejs-logo-vector-download.jpg',
      notes: 'Node.js is a cross-platform JavaScript runtime environment that allows developers to build server-side and network applications with JavaScript.',
      title: 'Node.js'
    }
  ],
  searchQuery: '',
  searchMatchEntries: [],
  currentEntry: {},
  currentEntryIndex: null,
  darkMode: true
};
