import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [courseAssocied, setCourseAssocied] = useState(null);
  const { id } = useParams();

  const getDetailsCourse = () => {
    fetch(`/api/courses/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data.data);
        setCourse(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const existCourse = () => {
    fetch(`/api/courses_for_user`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        if (data.exist) {
          let found = false;
          for (let i = 0; i < data.data.courses.length; i++) {
            let course = data.data.courses[i];
            if (course.id === parseInt(id)) {
              setCourseAssocied(course);
              found = true;
              break;
            }
          }
          if (!found) {
            setCourseAssocied(false);
          }
        } else {
          setCourseAssocied(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const prenota = () => {
    axios
      .post("/api/add_course_user", { course_id: parseInt(id) })
      .then(response => {
        existCourse();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const annulla = () => {
    axios
      .delete(`/api/delete_course_user/${parseInt(id)}`)
      .then(response => {
        existCourse();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailsCourse();
    existCourse();
  }, [id]);

  return (
    <>
      <h1 className="text-center">Dettagli Corso</h1>
      {course && courseAssocied !== null && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{course.activity.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{course.slot.day}</h6>
            <p>
              <span className="fw-bold">Inizio: </span>
              {course.slot.start_time}
            </p>
            <p>
              <span className="fw-bold">Fine: </span>
              {course.slot.end_time}
            </p>
            <p>
              <span className="fw-bold">Location: </span>
              {course.location}
            </p>
            <p className="card-text">{course.activity.description}</p>
            {courseAssocied && (
              <button type="button" className="btn btn-success" onClick={annulla}>
                Annulla
              </button>
            )}
            {courseAssocied === false && (
              <button type="button" className="btn btn-success" onClick={prenota}>
                Prenota
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
