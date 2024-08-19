import { useState } from "react";
import "./App.css";
import PageContainer from "./components/PageContainer/PageContainer";
import Toggler from "./components/Toggler/Toggler";
import rawData from "./components/data.json";
import ProgrammerList from "./components/ProgrammerList/ProgrammerList";
import ProgForm from "./components/ProgForm/ProgForm";
import WorkForm from "./components/WorkForm/WorkForm";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [listOfProgrammers, setListOfProgrammers] = useState(
    rawData.programmer
  );
  const [newProgrammer, setNewProgrammer] = useState({
    id:
      listOfProgrammers.length > 0
        ? Math.max(...listOfProgrammers.map((prog) => prog.id)) + 1
        : 1,
    name: "",
    position: "",
  });
  const [valid, setValid] = useState(false);

  const validateData = (prog) => {
    if (prog.name.trim().length === 0 || prog.position.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };
  const handleChange = (e) => {
    const source = e.target.name;
    const val = e.target.value;
    let updatedProgrammer;
    switch (source) {
      case "name": {
        updatedProgrammer = { ...newProgrammer, name: val };
        break;
      }
      case "position": {
        updatedProgrammer = { ...newProgrammer, position: val };
        break;
      }
      default:
        break;
    }
    setNewProgrammer(updatedProgrammer);
    validateData(updatedProgrammer);
  };
  const handleAdd = () => {
    setListOfProgrammers((listOfProgrammers) => {
      return [...listOfProgrammers, newProgrammer];
    });

    const updatedProg = {
      id: newProgrammer.id + 1,
      name: "",
      position: "",
    };
    setNewProgrammer(updatedProg);
    validateData(updatedProg);
  };
  const handleDelete = (idToDel) => {
    const temp = listOfProgrammers.filter((prog) => prog.id !== idToDel);
    setListOfProgrammers(temp);
  };

  const handleChoose = (name) => {
    switch (name) {
      case "list-of-programmers": {
        setActiveTab(1);
        break;
      }
      case "program-work": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <h1>Your app for handling projects</h1>
      <br></br>
      <h2>Toggle view</h2>
      <Toggler active={activeTab} onChoose={handleChoose} />
      {activeTab === 1 && (
        <>
          <h2>Your team</h2>
          <ProgrammerList
            data={listOfProgrammers}
            onDelete={handleDelete}
          ></ProgrammerList>
          <ProgForm
            valid={valid}
            onChange={handleChange}
            onAdd={handleAdd}
            data={newProgrammer}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h2>Your task </h2>
          <WorkForm programmers={listOfProgrammers}></WorkForm>
          <p>Junior | 100 lines p/day |</p>
          <p>Senior | 200 lines p/day |</p>
        </>
      )}
    </PageContainer>
  );
}

export default App;
