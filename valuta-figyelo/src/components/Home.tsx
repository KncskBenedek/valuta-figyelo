import { useEffect } from "react";
import { useGetData } from "../zustand/store";
export default function Home() {
  const getData = useGetData();
  useEffect(() => {
    getData.execute();
  }, []);
  return <p>Itt a Home page</p>;
}
