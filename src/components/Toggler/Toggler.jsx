import "./Toggler.css"

function Toggler({ onChoose, active }) {
   const handleClick = (e) => {
      onChoose(e.target.name)
   }

   return (
      <div className="page-toggler">
         <button
            className={`toggler-btn ${active === 1 ? `active` : ""}`}
            onClick={handleClick}
            name="list-of-programmers"
         >
            List of Programmers
         </button>
         <button
            className={`toggler-btn ${active === 2 ? `active` : ""}`}
            onClick={handleClick}
            name="program-work"
         >
            Form for planning tasks
         </button>
      </div>
   )
}

export default Toggler
