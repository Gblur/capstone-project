import Canvas from "../components/Canvas";
import Filter from "../components/Canvas/FilterData";
import 'reactflow/dist/style.css';
import { useState } from "react";

export default function Home() {

  const [filter, setFilter] = useState("HTML")

  function handleFilter(filter) {
    setFilter(filter)
  }

  return (
    <main style={{height: `calc(100vh - 250px)`}}>
      <h2>Mapname</h2>
      <Filter setFilterValue={handleFilter}/>
      <Canvas filter={filter}/>
    </main>
  );
}
