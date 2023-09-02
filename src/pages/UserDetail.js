import React, { useEffect, useState } from "react";
import "./UserList.css";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserDetail() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchUser();
  }, [id]);

  async function fetchUser() {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setUser(response.data);
    formik.setValues({
      name: response.data?.name,
      email: response.data?.email,
      username: response.data?.username,
      address: response.data?.address.street, // You might need to adjust the structure based on your API response
      company: response.data?.company.name, // Similarly, adjust this based on your API response
      industry: "", // Set this to the appropriate value
      catchPhrase: "", // Set this to the appropriate value
    });
  }

  function getInitials(name) {
    const nameParts = name
      ?.replace(/(Mr\.|Mrs\.|Ms\.|Miss|Dr\.|Prof\.)\s*/i, "")
      ?.split(" ");

    return nameParts?.map((part) => part[0].toUpperCase()).join("");
  }

  async function updateUser(values) {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        values
      );
      console.log(res);
      toast.success("User Updates Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      address: "",
      company: "",
      industry: "",
      catchPhrase: "",
    },
    onSubmit: (values) => {
      console.log(values);
      updateUser(values);
    },
  });
  return (
    <div className="mainDiv">
      <form onSubmit={formik.handleSubmit}>
        <Header />
        <Box className="userListBox">
          <h2>User Details</h2>
          <Box className="details_Box">
            {/* Image Box */}
            <Box className="image_Box">
              <img
                src={`https://placehold.co/400x400/0000FF/FFF?text=${getInitials(
                  user?.name
                )}&font=lato`} // Use Placehold with initials
                alt="Profile"
                width={200}
                height={200}
              />
            </Box>

            {/* Detail Box 1 */}
            <Box className="detail_box_one">
              <Box className="inputBox">
                <span className="inputLabel">Name</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.name}
                />
              </Box>
              <Box className="inputBox">
                <span className="inputLabel">Email Address</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.email}
                />
              </Box>
              <Box className="inputBox">
                <span className="inputLabel">Username</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.username}
                />
              </Box>
              <Box className="inputBox">
                <span className="inputLabel">Address</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.address}
                  multiline
                  rows={2}
                />
              </Box>
            </Box>
            {/* Details Box 2 */}
            <Box className="detail_box_one">
              <Box className="inputBox">
                <span className="inputLabel">Company</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.company}
                />
              </Box>
              <Box className="inputBox">
                <span className="inputLabel">Industry</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.industry}
                />
              </Box>
              <Box className="inputBox">
                <span className="inputLabel">Catch Phrase</span>
                <TextField
                  name="name"
                  className="inputField"
                  value={formik.values.catchPhrase}
                  multiline
                  rows={3}
                />
              </Box>
              <Box className="inputBox">
                <Button
                  style={{
                    borderRadius: "2rem",
                    width: "100%",
                    height: "52px",
                    fontSize: "1rem",
                    padding: "0px",
                    fontWeight: "600",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  type="submit"
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default UserDetail;
