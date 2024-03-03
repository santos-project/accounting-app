import React, { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";

function App() {
  // FireStoreエラーかどうかを判定する型ガード関数
  function isFireStoreError(
    error: unknown
  ): error is { code: string; message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error
    );
  }

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  useEffect(() => {
    const fecheTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const TransactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        console.log(TransactionsData);
        setTransactions(TransactionsData as Transaction[]);
      } catch (error) {
        if (isFireStoreError(error)) {
          console.error(`Firestoreエラー: [${error.code}] ${error.message}`);
        } else {
          console.error("エラー", error);
        }
      }
    };
    fecheTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Home monthlyTransactions={monthlyTransactions} />}
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
