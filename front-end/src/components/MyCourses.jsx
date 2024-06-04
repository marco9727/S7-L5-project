import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);

  const getMyCourses = () => {
    fetch(`/api/my_courses`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setMyCourses(data.courses);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <div>
      <h2 className="text-center">I miei Corsi</h2>
      <ListGroup>
        {myCourses.map(course => {
          return (
            <Link key={course.id} to={`/courses/${course.id}`} className="nav-link">
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <p className="fs-5">{course.activity_name}</p>
                  <span className="badge fs-5 text-bg-secondary">{course.status}</span>
                </div>
              </ListGroup.Item>
            </Link>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default MyCourses;
