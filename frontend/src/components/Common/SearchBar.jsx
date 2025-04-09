import {useState} from "react"
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({search: searchTerm}));
        dispatch(fetchProductsByFilters({search: searchTerm}));
        navigate(`/collections/all?search=${searchTerm}`);
        setIsOpen(false);
    }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?"absolute top-0 left-0 w-full bg-white h-20 z-50" : "w-auto"}`}>
        {isOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
                <div className="relative w-1/2">
                <input type="text" placeholder="Search Products" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className="bg-gray-100 px-4 pr-12 py-2 rounded-lg focu:outline-none w-full placeholder:text-gray-700"/>
                <button type="submit" className="absolute right-2 top-1/3 tranform -translate-y-1/2 text-gray-600">
                    <IoMdSearch className="h-6 w-6 mt-2 text-gray-700 cursor-pointer"/>
                </button>
                </div>
                <button type="button"
                 onClick={handleSearchToggle}
                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800" >
                <IoMdClose className="h-6 w-6 cursor-pointer" />
                </button>
            </form>
        ) : (
            <button onClick={handleSearchToggle}>
                <IoMdSearch className="h-6 w-6 text-gray-700" />
            </button>
        )}
    </div>
  )
}

export default SearchBar
