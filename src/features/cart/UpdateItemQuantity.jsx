import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem } from "./cartSlice";


function UpdateItmeQuantity({pizzaId,currenQuant}){

       const dispatch = useDispatch();
        return (
            <div className="flex gap-1 items-center md:gap-3">
                <Button  onClick={()=>dispatch(decreaseItem(pizzaId))}>-</Button>
                {currenQuant}
                <Button  onClick={()=>dispatch(increaseItem(pizzaId))}>+</Button>
            </div>
        )
}


export default UpdateItmeQuantity;