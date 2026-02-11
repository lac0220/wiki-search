import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import img from './img/wiki.webp';

export default function App() {
    const [value, setValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInfo, setSearchInfo] = useState([]);
    // console.log(offset);

    const getData = () => {
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=5&origin=*&srsearch=${value}&sroffset=${offset}`)
        .then(response => {
            setSearchResults(response.data.query.search)
            setSearchInfo(response.data.query.searchinfo)
            // console.log(response.data)
        })
        .catch(error => {
            alert("The server is temporarily unable to service your request")
            // console.log(error)
        })  
    }

    useEffect(() => {
        value && getData();
    }, [value, offset]);

    return (
        <div className="container vh-100 pt-5">   
            <h1 className="container-fluid pt-5 lh-1 text-center fw-bold display-3">Wiki Search Engine</h1>  
            <div className="mb-4 mt-3 text-center">
                <Link to="/" onClick={() => window.location.reload(false)}><img src={img} style={{ height: "110px" }} alt="Logo" /></Link>
            </div>
            <SearchBar setOffset={setOffset} setValue={setValue} />
            {
                (searchInfo.totalhits) ? 
                <div className="w-100 text-center"> 
                    <p className="py-2 fw-bold fs-4">Search result: {searchInfo.totalhits} hit(s)</p> 
                    <div className="btn-group border border-3">
                        <Button 
                            className="btn-lg" 
                            aria-label="Previous hits" 
                            onClick={() => setOffset(offset - 5)} 
                            disabled={!offset}>
                            PREVIOUS
                        </Button>
                        <Button 
                            className="btn-lg" 
                            aria-label="Next hits" 
                            onClick={() => setOffset(offset + 5)}>
                            NEXT
                        </Button>
                        <Button 
                            className="btn-lg" 
                            aria-label="Reload page" 
                            onClick={() => window.location.reload(false)}>
                            NEW SEARCH
                        </Button> 
                    </div>  
                </div> : ''
            }
            <div className="result pb-4">
                {searchResults.map((result, i) => (
                    <div className="mx-auto mt-4 px-4 w-75 border rounded bg-white" key={i}>
                        <h2 className="my-3 fw-bold fs-2">{result.title}</h2>
                        <p className="fs-5" dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                        <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target='_blank' rel="noopener noreferrer">
                            <Button 
                                className="mb-3 btn btn-secondary text-white fs-4" 
                                aria-label="Read more">
                                Read more
                            </Button>
                        </a>
                    </div>
                ))}
            </div>
            <footer className="pb-5 text-center fs-4">Copyright &copy; Laszlo Nemeth 2026</footer>
        </div>            
    );
}