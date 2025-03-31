import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Components
import Navbar from "./components/navbar/Navbar";

// Authentication Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Summary from "./pages/Summary";

// Cash Transactions
import Cashbook from "./components/form/Cashbook";
import CashIn from "./pages/CashIn";
import CashOut from "./pages/CashOut";
import CashInEdit from "./components/edit/CashInEdit";
import CashOutEdit from "./components/edit/CashOutEdit";
import CashReceived from "./pages/CashReceived";
import CashPaid from "./pages/CashPaid";

// Notebook Management
import Notebook from "./pages/Notebook";
import NotebookList from "./pages/NotebookList";
import NotebookForm from "./components/form/NotebookForm";
import NotebookEdit from "./components/edit/NotebookEdit";

// Expense Management
import ExpanseForm from "./components/form/ExpanseForm";
import ExpenseList from "./pages/ExpenseList";
import Expense from "./pages/Expense";
import ExpenseViewEdit from "./components/edit/ExpenseViewEdit";
import AddExpense from "./components/add/AddExpense";

// Spin Management
import SpinForm from "./components/form/SpinForm";
import SpinList from "./pages/SpinList";
import Spin from "./pages/Spin";
import SpinAddUser from "./components/add/SpinAddUser";
import SpinWinner from "./pages/SpinWinner";
import SpinEdit from "./components/edit/SpinEdit";

import ProtectedRoute from "./pages/auth/AuthCheck";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();  
  return (
    <div className={user ? "mt-16" : "mt-0"}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-cashbook"
          element={
            <ProtectedRoute>
              <Cashbook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-in"
          element={
            <ProtectedRoute>
              <CashIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-in/edit/:id"
          element={
            <ProtectedRoute>
              <CashInEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-out"
          element={
            <ProtectedRoute>
              <CashOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-out/edit/:id"
          element={
            <ProtectedRoute>
              <CashOutEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-received"
          element={
            <ProtectedRoute>
              <CashReceived />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-paid"
          element={
            <ProtectedRoute>
              <CashPaid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-notebook"
          element={
            <ProtectedRoute>
              <NotebookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notebook-list"
          element={
            <ProtectedRoute>
              <NotebookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notebook/view/:id"
          element={
            <ProtectedRoute>
              <Notebook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notebook/edit/:id"
          element={
            <ProtectedRoute>
              <NotebookEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-expense"
          element={
            <ProtectedRoute>
              <ExpanseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense-list"
          element={
            <ProtectedRoute>
              <ExpenseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense/view/:id"
          element={
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses/add/:id"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expense/view/edit/:id"
          element={
            <ProtectedRoute>
              <ExpenseViewEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/spin-group"
          element={
            <ProtectedRoute>
              <SpinForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spin-list"
          element={
            <ProtectedRoute>
              <SpinList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spin-view/:id"
          element={
            <ProtectedRoute>
              <Spin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spin-view/edit/:id"
          element={
            <ProtectedRoute>
              <SpinEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spin/add/user/:id"
          element={
            <ProtectedRoute>
              <SpinAddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spin/winner/:id"
          element={
            <ProtectedRoute>
              <SpinWinner />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route
          path="/*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
      <Toaster duration={5000} />
    </div>
  );
}

export default App;
