import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';

export default function SearchBar({ setValue, setOffset }) {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onSubmit)}>
            <input 
                className="form-control flex-nowrap p-2 w-50 border border-3 border-primary fs-4" 
                type="text" 
                id="searchBar" 
                placeholder="Enter your search term..." 
                {...register("text", { required: true })} 
            />
            {errors.text?.type === 'required' && <span className="mt-3 fw-bold fs-4 text-danger">This field is required!</span>}
            <Button 
                className="my-3 w-25 fw-bold fs-4"
                aria-label="Search"
                type="submit"
                onClick={() => {setOffset(0); setValue(document.getElementById('searchBar').value)}}>
                Search
            </Button>
        </form>    
    )
}

