import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

const AdminCourses = () => {
  const [allCourses, setAllCourses] = useState([]);

  const getAllCourses = () => {
    fetch(`/api/courses_users`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setAllCourses(data.courses);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const accepted = (course_id, user_id) => {
    axios
      .put(`/api/courses_users/${course_id}/accepted`, { user_id: user_id })
      .then(response => {
        console.log("accepted");
        getAllCourses();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejected = (course_id, user_id) => {
    axios
      .put(`/api/courses_users/${course_id}/rejected`, { user_id: user_id })
      .then(response => {
        console.log("accepted");
        getAllCourses();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      <h2 className="text-center">I miei Corsi</h2>
      <ListGroup>
        {allCourses
          .filter(item => item.status === "pending")
          .map((course, idx) => {
            return (
              <ListGroup.Item key={idx}>
                <div className="d-flex justify-content-between">
                  <p className="fs-5">
                    {course.user_name} - {course.activity_name}
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => accepted(course.id, course.user_id)}
                    >
                      Accepted
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-1"
                      onClick={() => rejected(course.id, course.user_id)}
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default AdminCourses;
