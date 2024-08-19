import "./ProgForm.css"

function ProgForm({ data, valid, onChange, onAdd }) {
   return (
      <div className="prog-form">
         <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={onChange}
            value={data.name}
         />
         <label htmlFor="junior">Junior</label>
         <input
            id="junior"
            type="radio"
            name="position"
            onChange={onChange}
            value="Junior"
            checked={data.position === "Junior"}
         ></input>
         <label htmlFor="senior">Senior</label>
         <input
            id="senior"
            type="radio"
            name="position"
            onChange={onChange}
            checked={data.position === "Senior"}
            value="Senior"
         ></input>

         <button disabled={!valid} onClick={onAdd}>
            Add
         </button>
      </div>
   )
}

export default ProgForm
