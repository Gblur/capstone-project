import gql from "graphql-tag";
import SignIn from "../components/SignIn";
import client from "../lib/apollo-client";
import MapsPage from "./maps";

export default function Home() {
  return <MapsPage />;
}
