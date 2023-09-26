import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant"
import MenuItem from "./MenuItem"

function Menu() {
  const menu = useLoaderData();
  
  return <ul className="divide-y px-2 space-y-2 divide-stone-200">
    {menu.map((pizza)=>{
      return(
      <MenuItem pizza={pizza} key={pizza.id}></MenuItem>
      )
    })}
  </ul>
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
