
const Filter = ({filter, handleFilter}) => {

  
  return (
    <div>
      filter shown with{" "}
        <input type="text" onChange={handleFilter} value={filter} />
    </div>
  )
}

export default Filter
