import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import user from "./assets/demo-user.webp";

function App() {
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then(({ data }) => setUserList(data));
  }, []);

  useEffect(() => {
    axios
      .get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
      .then(({ data }) => setUserDetails(data));
  }, [id]);

  return (
    <div className="mx-auto p-lg-5">
      <div className="row">
        <div className="col-11 col-lg-6 mx-auto mx-lg-0 px-0">
          <div
            className="bg-info rounded-top fw-medium fs-3 py-3"
            style={{ "--bs-bg-opacity": "0.5" }}
          >
            USERS LIST
          </div>

          <ul className="mt-3 list-style-none ps-0">
            {userList.length > 0 ? (
              userList.map((item, key) => (
                <a href="#details" className="text-black" key={key}>
                  <li
                    className="rounded-1 text-start row align-items-center mx-0"
                    style={{ padding: "8px 10px", marginTop: "10px" }}
                    onClick={() => {
                      setId(item.id);
                    }}
                  >
                    <img
                      src={item.avatar}
                      alt=""
                      className="rounded-circle img-fluid col-1"
                    />
                    <span className="col-11">
                      {item.profile.firstName} {item.profile.lastName}
                    </span>
                  </li>
                </a>
              ))
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </ul>
        </div>

        <div
          className="col-11 mx-auto mx-lg-0 col-lg-6 position-relative px-0"
          id="details"
        >
          <div
            className="col-lg-11 ms-auto px-0 px-lg-3 px-lg-5 end-0 mt-5 mt-lg-0"
            // style={{ marginTop: "7rem", paddingRight: "7rem" }}
          >
            <div
              className="bg-info rounded-top fw-medium fs-3 py-3"
              style={{ "--bs-bg-opacity": "0.5" }}
            >
              USERS DETAILS
            </div>
            {/* <div className="ms-auto px-5"> */}
            {userDetails.profile ? (
              <div className="col-xl-6 mb-5 mx-auto">
                <img
                  src={userDetails.avatar}
                  className="rounded-circle mt-3"
                  alt=""
                />
                <h2>{userDetails.profile.username}</h2>
                <div className="dark-item">{userDetails.Bio}</div>
                <h4>Full Name</h4>
                <div className="dark-item">
                  {userDetails.profile.firstName} {userDetails.profile.lastName}
                </div>

                <h4>Job Title</h4>
                <div className="dark-item">{userDetails.jobTitle}</div>

                <h4>Email</h4>
                <div className="dark-item">{userDetails.profile.email}</div>
              </div>
            ) : (
              "No User has been selected yet"
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
