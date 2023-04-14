import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setfilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setfilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search monsters"
      />
      <br />
      <SearchBox
        className="title-search-box"
        onChangeHandler={onTitleChange}
        placeholder="Set title"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     console.log("render from appJs");
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         {/* {filteredMonsters.map((monster) => {
//           return (
//             <div key={monster.id}>
//               <h1>{monster.name}</h1>
//             </div>
//           );
//         })} */}
//         <SearchBox
//           className="monsters-search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="Search monsters"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
