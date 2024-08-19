import { useEffect, useState, useCallback } from "react";
import "./WorkForm.css";

function WorkForm({ programmers }) {
  const [tempInput, setTempInput] = useState({
    code: "",
    time: "",
  });
  const [disable, setDisable] = useState(true);
  const [buttonColor, setButtonColor] = useState("red");

  // Počítá počet juniorů a seniorů v seznamu programátorů
  const countProgrammers = useCallback(() => {
    let juniorCount = 0;
    let seniorCount = 0;
    programmers.forEach((prog) => {
      if (prog.position === "Junior") juniorCount++;
      if (prog.position === "Senior") seniorCount++;
    });
    return { juniorCount, seniorCount };
  }, [programmers]);

  const handleStorage = (e) => {
    const source = e.target.name;
    setTempInput({ ...tempInput, [source]: e.target.value });
  };
  useEffect(() => {
    const { juniorCount, seniorCount } = countProgrammers();
    const totalLinesPerDay = juniorCount * 100 + seniorCount * 200;
    const totalLinesNeeded = parseInt(tempInput.code) || 0;
    const totalDaysNeeded = parseInt(tempInput.time) || 0;

    const canCompleteTask =
      totalLinesPerDay * totalDaysNeeded >= totalLinesNeeded;

    setDisable(!(tempInput.code && tempInput.time && canCompleteTask));
    setButtonColor(canCompleteTask ? "green" : "red");
  }, [tempInput, countProgrammers]);

  const handleClick = () => {
    setTempInput({
      code: "",
      time: "",
    });
  };
  return (
    <div className="program-work">
      <label htmlFor="code">Lines of code</label>
      <input
        type="number"
        name="code"
        min={0}
        value={tempInput.code}
        onChange={handleStorage}
      />
      <label htmlFor="time">Time limit [days]</label>
      <input
        type="number"
        name="time"
        min={0}
        value={tempInput.time}
        onChange={handleStorage}
      />
      <button
        style={{ backgroundColor: buttonColor }}
        disabled={disable}
        onClick={handleClick}
      >
        Do it
      </button>
    </div>
  );
}

export default WorkForm;
