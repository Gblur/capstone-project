import { MenuItem, Select } from '@mui/material'
import React from 'react'

export default function Filter({setFilterValue}) {

  function handleFilter(event) {
    setFilterValue(event.target.value)
    console.log(event.currentTarget)
  }

  return (
      <Select
        id="demo-simple-select"
        label="Age"
        defaultValue="HTML"
        onChange={handleFilter}
        >
        <MenuItem value="HTML">HTML</MenuItem>
        <MenuItem value="JavaScript">Javascript</MenuItem>
        <MenuItem value="Ruby">Ruby</MenuItem>
      </Select>
  )
}
