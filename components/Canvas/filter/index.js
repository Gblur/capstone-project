import React from 'react'

export default function Filter({setFilterValue}) {

  function handleFilter(event) {
    setFilterValue(event.currentTarget.value)
  }

  return (
    <div>
      <select id='select_option' defaultValue="HTML" onChange={handleFilter}>
        <option value="TypeScript">Typescript</option>
        <option value="JavaScript">JavaScript</option>
        <option value="HTML">HTML</option>
      </select>
    </div>
  )
}
