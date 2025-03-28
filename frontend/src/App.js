import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Cashbook from "./components/form/Cashbook";
import Summary from "./pages/Summary";
import CashIn from "./pages/CashIn";
import CashOut from "./pages/CashOut";
import Notebook from "./pages/Notebook";
import NotebookList from "./pages/NotebookList";
import NotebookForm from "./components/form/NotebookForm";
import ExpanseForm from "./components/form/ExpanseForm";
import ExpenseList from "./pages/ExpenseList";
import Expense from "./pages/Expense";
import NotebookEdit from "./components/edit/NotebookEdit";
import ExpenseViewEdit from "./components/edit/ExpenseViewEdit";
import AddExpense from "./components/add/AddExpense";
import SpinForm from "./components/form/SpinForm";
import SpinList from "./pages/SpinList";
import Spin from "./pages/Spin";
import SpinAddUser from "./components/add/SpinAddUser";
import SpinWinner from "./pages/SpinWinner";
import Profile from "./pages/Profile";
import CashInEdit from "./components/edit/CashInEdit";
import CashOutEdit from "./components/edit/CashOutEdit";
import CashReceived from "./pages/CashReceived";
import CashPaid from "./pages/CashPaid";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "./constant/Url";
import axios from "axios";
import SpinEdit from "./components/edit/SpinEdit";
import { ClipLoader } from "react-spinners";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/auth/profile`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  // Show loading state
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader
          color="blue"
          size={70}
          cssOverride={{ borderWidth: "6px" }}
          className=""
        />
      </div>
    );

  return (
    <div className={data ? "mt-16" : "mt-0"}>
      <Navbar user={data} />
      <Routes>
        {/* Authentication Check: Redirect to dashboard if logged in, else to login */}
        <Route
          path="/"
          element={
            data ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/signup"
          element={data ? <Navigate to="/dashboard" replace /> : <Signup />}
        />
        <Route
          path="/login"
          element={data ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Private Routes (Require Authentication) */}
        <Route
          path="/profile"
          element={data ? <Profile user={data} /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={data ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-cashbook"
          element={data ? <Cashbook /> : <Navigate to="/login" />}
        />
        <Route
          path="/summary"
          element={data ? <Summary /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-in"
          element={data ? <CashIn /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-in/edit/:id"
          element={data ? <CashInEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-out"
          element={data ? <CashOut /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-out/edit/:id"
          element={data ? <CashOutEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-received"
          element={data ? <CashReceived /> : <Navigate to="/login" />}
        />
        <Route
          path="/cash-paid"
          element={data ? <CashPaid /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-notebook"
          element={data ? <NotebookForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/notebook-list"
          element={data ? <NotebookList /> : <Navigate to="/login" />}
        />
        <Route
          path="/notebook/view/:id"
          element={data ? <Notebook /> : <Navigate to="/login" />}
        />
        <Route
          path="/notebook/edit/:id"
          element={data ? <NotebookEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-expense"
          element={data ? <ExpanseForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense-list"
          element={data ? <ExpenseList /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense/view/:id"
          element={data ? <Expense /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses/add/:id"
          element={data ? <AddExpense /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense/view/edit/:id"
          element={data ? <ExpenseViewEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/create/spin-group"
          element={data ? <SpinForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/spin-list"
          element={data ? <SpinList /> : <Navigate to="/login" />}
        />
        <Route
          path="/spin-view/:id"
          element={data ? <Spin /> : <Navigate to="/login" />}
        />
        <Route
          path="/spin-view/edit/:id"
          element={data ? <SpinEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/spin/add/user/:id"
          element={data ? <SpinAddUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/spin/winner/:id"
          element={data ? <SpinWinner /> : <Navigate to="/login" />}
        />

        {/* Catch-All Route */}
        <Route
          path="/*"
          element={<Navigate to={data ? "/dashboard" : "/login"} />}
        />
      </Routes>
      <Toaster duration={5000} />
    </div>
  );
}

export default App;
