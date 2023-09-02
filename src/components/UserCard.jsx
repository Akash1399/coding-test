import React from "react";
import "./UserCard.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCardOne({ user }) {
  function getInitials(name) {
    const nameParts = name
      .replace(/(Mr\.|Mrs\.|Ms\.|Miss|Dr\.|Prof\.)\s*/i, "")
      .split(" ");

    return nameParts.map((part) => part[0].toUpperCase()).join("");
  }
  return (
    <div style={{ padding: "0.9rem", display: "flex", gap: "1rem" }}>
      <div>
        <img
          src={`https://placehold.co/30x30/0000FF/FFF?text=${getInitials(
            user.name
          )}&font=lato`} // Use Placehold with initials
          alt="Profile"
          width={100}
          height={100}
        />
      </div>
      <div className="info">
        <div>
          <span className="userName"> {user.name}</span> <span>(@Bret)</span>
          <p className="UserEmail">{user.email}</p>
        </div>
        <div>Company: Romaguera-Crona</div>
      </div>
    </div>
  );
}

function UserCardTwo({ user }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "0.9rem",
        display: "flex",
        gap: "1rem",
        justifyContent: "flex-start",
      }}
    >
      <div className="info">
        <div>
          <span>Phone:{user.phone}</span>
          <p>
            website:<span className="UserEmail">{user.website}</span>
          </p>
        </div>
        <div>
          <span>
            <Button
              style={{
                border: "2px solid grey",
                borderRadius: "2rem",
                width: "136px",
                height: "34px",
                // padding: "10px 0",
                fontSize: "1rem",
                padding: "0",
                fontWeight: "600",
                color: "grey",
                textTransform: "none",
              }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => {
                navigate(`/user-detail/${user.id}`);
              }}
            >
              Details
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export { UserCardOne, UserCardTwo };
