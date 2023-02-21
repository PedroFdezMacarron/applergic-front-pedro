import { useForm } from "react-hook-form"
import './SearchComponent.css'

export default function Search({ onSubmit }) {

    const { register, handleSubmit } = useForm();

    const submit = ({ text }) => {
        console.log(text)
        onSubmit(text);
    }
    return(
        
            <form className="back" onSubmit={handleSubmit(submit)}>
                    <input type="text" {...register("text")} />
                    <button>Buscar</button>
            </form>
        
    ) 
}