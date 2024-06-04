import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => {
    return state.user;
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleOnClickOffline = () => {
    setShowAlert(true);
    setTimeout(() => {
      navigate("login");
    }, 2000);
  };

  useEffect(() => {
    fetch("/api/courses")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setCourses(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="text-center">I nostri Corsi</h1>
      {showAlert && (
        <div class="alert alert-warning" role="alert">
          per maggiori dettagli effettua l'accesso
        </div>
      )}
      <div className="row">
        {courses.map(course => (
          <div className="col-4 my-2" style={{ minHeight: "150px" }} key={course.id}>
            <div className="card h-100 d-flex flex-column">
              <div className="card-body flex-grow-1">
                <h5 className="card-title">{course.activity.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{course.slot.day}</h6>
              </div>
              <div className="card-footer mt-auto">
                {user && (
                  <Link to={`/courses/${course.id}`} className="btn btn-primary w-100">
                    Dettagli
                  </Link>
                )}
                {!user && (
                  <button type="button" className="btn btn-primary w-100" onClick={handleOnClickOffline}>
                    Dettagli
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
