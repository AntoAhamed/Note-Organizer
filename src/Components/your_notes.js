import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Note from './Note'
import ReactPaginate from 'react-paginate';

function Your_notes(props) {
  const [searchTitle, setSearchTitle] = useState('')
  const [filterCat, setFilterCat] = useState('')

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 4;

  async function search(e) {
    e.preventDefault();

    setFilterCat('');

    if (searchTitle !== '') {
      try {
        await axios.post('http://localhost:8000/searchByTitle', { searchTitle })
          .then(res => {
            if (res.data === "failed") {
              alert("Note not found");
            }
            else {
              const data = res.data;
              console.log("Data has been received successfully");
              props.setNotes(data.data);
              setTotalPages(Math.ceil(data.data.length / itemsPerPage));
              console.log(data);
            }
          }).catch(e => {
            console.log(e);
          });
      }
      catch (e) {
        console.log(e);
      }
    } else {
      alert("Empty field can't be submitted!");
    }
  }

  async function filter(e) {
    e.preventDefault();

    setSearchTitle('');

    if (filterCat !== '') {
      try {
        await axios.post('http://localhost:8000/filterByCat', { filterCat })
          .then(res => {
            if (res.data === "failed") {
              alert("Note not found");
            }
            else {
              const data = res.data;
              console.log("Data has been received successfully");
              props.setNotes(data.data);
              setTotalPages(Math.ceil(data.data.length / itemsPerPage));
              console.log(data);
            }
          }).catch(e => {
            console.log(e);
          });
      }
      catch (e) {
        console.log(e);
      }
    } else {
      alert("Empty field can't be submitted!");
    }
  }

  async function getData() {
    await axios.get("http://localhost:8000/get_notes")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        props.setNotes(data.data);
        setTotalPages(Math.ceil(data.data.length / itemsPerPage));
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  useEffect(() => {
    if (searchTitle === '' && filterCat === '') {
      getData();
    }
  }, [props.notes])

  useEffect(() => {
    if (searchTitle !== '' && filterCat === '') {
      axios.post('http://localhost:8000/searchByTitle', { searchTitle })
        .then(res => {
          if (res.data === "failed") {
            alert("Note not found");
          }
          else {
            const data = res.data;
            console.log("Data has been received successfully");
            props.setNotes(data.data);
            setTotalPages(Math.ceil(data.data.length / itemsPerPage));
            console.log(data);
          }
        }).catch(e => {
          console.log(e);
        });
    }
  }, [props.notes])

  useEffect(() => {
    if (searchTitle === '' && filterCat !== '') {
      axios.post('http://localhost:8000/filterByCat', { filterCat })
        .then(res => {
          if (res.data === "failed") {
            alert("Note not found");
          }
          else {
            const data = res.data;
            console.log("Data has been received successfully");
            props.setNotes(data.data);
            setTotalPages(Math.ceil(data.data.length / itemsPerPage));
            console.log(data);
          }
        }).catch(e => {
          console.log(e);
        });
    }
  }, [props.notes])

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = props.notes.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className='container' style={{ marginTop: '5%' }}>
      <div className="row mb-3">

        <div className='col-4'>
          <form className="d-flex py-4" role="search">
            <input className="form-control me-2" value={searchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} type="search" placeholder="Search by title" aria-label="Search" />
            <button className="btn btn-outline-dark" onClick={search} type="submit">Search</button>
          </form>
        </div>

        <div className="col-4" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Your Notes</b>
          <p style={{ fontSize: "20px" }}>{`Page No. ` + (currentPage + 1) + ` of ` + totalPages}</p>
          <p style={{ fontSize: "20px" }}>{`Total ` + props.notes.length + ` Notes`}</p>
        </div>

        <div className='col-4'>
          <form className="d-flex py-4" role="search">
            <input className="form-control me-2" value={filterCat} onChange={(e) => { setFilterCat(e.target.value) }} type="search" placeholder="Filter by category" aria-label="Search" />
            <button className="btn btn-outline-dark" onClick={filter} type="submit">Filter</button>
          </form>
        </div>

      </div>
      <div className="row">
        {subset.length === 0 ? "No notes found" : subset.map((note) => {
          return <Note key={note._id} note={note} title={note.title} description={note.description} category={note.category} date={note.date} time={note.time} deleteNotes={props.deleteNotes} editNotes={props.editNotes} />
        })}
      </div>
      <div className='row' style={{ textAlign: 'center' }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >>"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<< previous"
          forcePage={currentPage}
          containerClassName={"pagination-container"}
          activeClassName={"active-page"}
        />
      </div>
    </div>
  )
}

export default Your_notes
