import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import NoPage from "./Pages/Nopage/NoPage";
import Services from "./Pages/ServiceCrm/Services/Service/Service";
import NewService from "./Pages/ServiceCrm/Services/NewService/NewService";
import EQayime from "./Pages/ServiceCrm/EQayime/EQayime";
import Customer from "./Pages/ServiceCrm/Customer/Customer";
import RequiredAuth from "./Services/RequiredAuth";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ChangePassword from "./Pages/Login/ChangePassword";
import Inspectors from "./Pages/Tenzimlemeler/Inspectors/Inspectors";
import Clients from "./Pages/Tenzimlemeler/Clients/Clients";
import Permissions from "./Pages/Tenzimlemeler/Permission/Permissions";
import Enterprises from "./Pages/Tenzimlemeler/Enterprises/Enterprises";
import SubServicesCat from "./Pages/Tenzimlemeler/ServicesCat/SubServicesCat/subServicesCat";
import Reporties from "./Pages/Hesabatlar/Reporties/Reporties";
import ServicesCat from "./Pages/Tenzimlemeler/ServicesCat/servicesCat";
import Precincts from "./Pages/Tenzimlemeler/Precincts/Precincts";
import BankAccounts from "./Pages/Tenzimlemeler/BankAccounts/BankAccounts";
import CustomerReports from "./Pages/Xezinadarliq/CustomerReports/CustomerReports";
import CustomerBalance from "./Pages/Xezinadarliq/CustomerReports/CustomerBalance/CustomerBalance";
import Departments from "./Pages/Tenzimlemeler/Precincts/Departments/departments";
import Income from "./Pages/Xezinadarliq/Payments/BankIncome/Income";
import OutComings from "./Pages/Xezinadarliq/Payments/Expense/OutComings";
import Reporthome from "./Pages/Hesabatlar/ReportHome/Reporthome";
import Bonuses from "./Pages/Maliyye/Bonuses/Bonuses";
import Medaxil from "./Pages/Hesabatlar/Medaxil/Medaxil";
import Mexaric from "./Pages/Hesabatlar/Mexaric/Mexaric";
import BanksBalance from "./Pages/Hesabatlar/Dashboards/BanksBalance/BanksBalance";
import IncomeOutcome from "./Pages/Hesabatlar/Dashboards/MedaxilMexaric/IncomeOutcome";
import Expense from "./Pages/Hesabatlar/Expense/ReportsMap";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Expense />} />
          {/* <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/inspectors" element={<Inspectors />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/servicesCat" element={<ServicesCat />} />
            <Route path="/enterprises" element={<Enterprises />} />
            <Route path="/subServicesCat/:id?" element={<SubServicesCat />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/precincts/:id?" element={<Precincts />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/bankAccounts" element={<BankAccounts />} />
            <Route path="/NewService" element={<NewService />} />
            <Route path="/EQayime" element={<EQayime />} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/reporties/:id?" element={<Reporties />} />
            <Route path="/reports" element={<Reporthome />} />
            <Route path="/Bank/Medaxil" element={<Income />} />
            <Route path="/outcomings" element={<OutComings />} />
            <Route path="/bonuses" element={<Bonuses />} />
            <Route path="/income" element={<Medaxil />} />
            <Route path="/outcome" element={<Mexaric />} />
            <Route path="/Bank/Balans" element={<BanksBalance />} />
            <Route path="/Medaxil&&Mexaric" element={<IncomeOutcome />} />
            <Route path="/Customer/Report" element={<CustomerReports />} />
            <Route
              path="/Customer/balance/:id?"
              element={<CustomerBalance />}
            />
            <Route path="/Permission/:id?" element={<Permissions />} />
          </Route> */}
          <Route path="/*" element={<NoPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ChangePassword/:token?" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
