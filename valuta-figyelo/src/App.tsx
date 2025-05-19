import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import BankExchangeRate from "./components/BankExchangeRate/BankExchangeRate";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate/CurrencyExchangeRate";
import History from "./components/PeriodSummary/PeriodSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bank-exchange" element={<BankExchangeRate />} />
          <Route path="currency-exchange" element={<CurrencyExchangeRate />} />
          <Route path="history" element={<History />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
