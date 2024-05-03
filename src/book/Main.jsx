import React, { useEffect, useState } from 'react';
import './style.css'

function Main() {
    const [booksBySubjects, setBooksBySubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const urls = [
                    "https://openlibrary.org/subjects/thriller.json?details=true",
                    "https://openlibrary.org/subjects/love.json?details=true",
                    "https://openlibrary.org/subjects/kids.json?details=true",
                    "https://openlibrary.org/subjects/romance.json?details=true",
];

                const responses = await Promise.all(urls.map(url => fetch(url)));
                const results = await Promise.all(responses.map(response => response.json()));

                setBooksBySubjects(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch= async()=>{
        try{
            const response = await fetch(`https://ia800204.us.archive.org/fulltext/inside.php?search=${searchTerm}`)

            const data = await response.json()
            setSearchResult(data);
        }catch(error){
            console.log("Enter correct book name")
        }
    }
    function changeValue(event){
        event.target.value
        setSearchTerm(event.target.value)
    }
    

    return (
        <>
        <div className='search_bar'>
            <input type="Text" placeholder='search by book name' value={searchTerm}   onChange={changeValue}/>
            <button onClick={handleSearch}>Search</button>
        </div>
        {booksBySubjects.map((booksBySubject, index) => (
                <div key={index}>
                    <h3>{booksBySubject?.name}</h3>
                    <div className='main_book'>
                    {booksBySubject?.works?.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                          {/* <div className="second"> */}
                            <h3>{bookInfo.title}</h3>
                            <div className="image" key={index}>
                                <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
                            </div>
                          {/* </div> */}
                            {/* <h3>{bookInfo.cover_id}</h3> */}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            {booksBySubjects.map((booksBySubject, index) => (
                <div key={index}>
                    <h3>{booksBySubject?.name}</h3>
                    <div className='main_book'>
                    {booksBySubject?.works?.map((bookInfo, index) => (
                        <div className="book-wrapper" key={index}>
                          {/* <div className="second"> */}
                            <h3>{bookInfo.title}</h3>
                            <div className="image" key={index}>
                                <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
                            </div>
                          {/* </div> */}
                            {/* <h3>{bookInfo.cover_id}</h3> */}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Main;



// import React, { useEffect, useState } from 'react';
// import './style.css';

// function Main() {
//     const [booksBySubjects, setBooksBySubjects] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const urls = [
//                     "https://openlibrary.org/subjects/thriller.json?details=true",
//                     "https://openlibrary.org/subjects/love.json?details=true",
//                     "https://openlibrary.org/subjects/kids.json?details=true",
//                     "https://openlibrary.org/subjects/romance.json?details=true",
//                 ];

//                 const responses = await Promise.all(urls.map(url => fetch(url)));
//                 const results = await Promise.all(responses.map(response => response.json()));

//                 setBooksBySubjects(results);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchBooks();
//     }, []);

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`https://ia800204.us.archive.org/fulltext/inside.php?search=${searchTerm}`);
//             const data = await response.json();
//             setSearchResults(data); // Assuming data is an array of search results
//         } catch (error) {
//             console.error("Error searching books:", error);
//         }
//     };

//     return (
//         <>
//             <div className='search_bar'>
//                 <input
//                     type="search"
//                     placeholder='Search by book name'
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             {searchResults.map((book, index) => (
//                 <div className="book-wrapper" key={index}>
//                     <h3>{book.title}</h3>
//                     <div className="image" key={index}>
//                         <img src={`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt="cover_id" />
//                     </div>
//                 </div>
//             ))}
//             {booksBySubjects.map((booksBySubject, index) => (
//                 <div key={index}>
//                     <h3>{booksBySubject?.name}</h3>
//                     <div className='main_book'>
//                         {booksBySubject?.works?.map((bookInfo, index) => (
//                             <div className="book-wrapper" key={index}>
//                                 <h3>{bookInfo.title}</h3>
//                                 <div className="image" key={index}>
//                                     <img src={`http://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg`} alt="cover_id" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default Main;

