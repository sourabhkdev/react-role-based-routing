import { Navigate, Route, Routes, Link } from "react-router-dom";

const USER_TYPE = {
  PUBLIC: "Public user", // only home page ""/
  NORMAL_USER: "Normal user", // home and user page
  ADMIN_USER: "Admin user", // all pages
};

const CURRENT_USER = USER_TYPE.ADMIN_USER;
function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: 10,
          marginBottom: 8,
          backgroundColor: "#0a80a3",
          color: "white",
        }}
      >
        <Link style={{ color: "white" }} to={"/"}>
          Home
        </Link>
        {CURRENT_USER === USER_TYPE?.NORMAL_USER ||
        CURRENT_USER === USER_TYPE?.ADMIN_USER ? (
          <>
            <Link style={{ color: "white" }} to={"/user"}>
              User
            </Link>
            <Link style={{ color: "white" }} to={"/myProfile"}>
              User profile
            </Link>
          </>
        ) : null}
        {CURRENT_USER === USER_TYPE?.ADMIN_USER ? (
          <>
            {" "}
            <Link style={{ color: "white" }} to={"/admin"}>
              Admin
            </Link>
          </>
        ) : null}

        <div>You are logged in as {CURRENT_USER}</div>
      </div>
      <AppRoute />
    </>
  );
}

function AppRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicElement>
            <Home />
          </PublicElement>
        }
      ></Route>
      <Route
        path="/user"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      ></Route>
      <Route
        path="/myProfile"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <AdminElement>
            <Admin />
          </AdminElement>
        }
      ></Route>
      <Route path="*" element={<>Page not found</>}></Route>
    </Routes>
  );
}
function Home() {
  return <div>Home Page</div>;
}
function User() {
  return <div>User Page</div>;
}
function Admin() {
  return <div>Admin Page</div>;
}

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  if (
    CURRENT_USER === USER_TYPE?.NORMAL_USER ||
    CURRENT_USER === USER_TYPE?.ADMIN_USER
  ) {
    return <>{children}</>;
  } else {
    // return <div>You do not have access to this page</div>;
    return <Navigate to={"/"} />;
  }
}

function AdminElement({ children }) {
  if (CURRENT_USER === USER_TYPE?.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <div>You do not have access to this page</div>;
  }
}
export default App;
