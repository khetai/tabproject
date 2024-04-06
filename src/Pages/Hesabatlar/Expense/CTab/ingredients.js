import Inspectors from "../../../Tenzimlemeler/Inspectors/Inspectors";
import Services from "../../../ServiceCrm/Services/Service/Service";
import Clients from "./../../../Tenzimlemeler/Clients/Clients";
import EQayime from "../../../ServiceCrm/EQayime/EQayime";
import Home from "../../../Home/Home";
import Income from "../../../Xezinadarliq/Payments/BankIncome/Income";
import OutComings from "../../../Xezinadarliq/Payments/Expense/OutComings";
import CustomerReports from "../../../Xezinadarliq/CustomerReports/CustomerReports";
import Bonuses from "../../../Maliyye/Bonuses/Bonuses";
import ServicesCat from "../../../Tenzimlemeler/ServicesCat/servicesCat";
import Enterprises from "../../../Tenzimlemeler/Enterprises/Enterprises";
export const Ingredient = {
  id: "",
  title: "",
  label: "",
  item: "",
};
export const allIngredients = [
  {
    id: 1,
    title: `ANA SƏHİFƏ`,
    label: "ANASƏHİFƏ",
    item: <Home />,
  },

  {
    id: 2,
    title: `Xidmət reyestri`,
    label: `Xidmətreyestri`,
    item: <Services />,
  },
  {
    id: 3,
    title: `Elektron qaimələr`,
    label: `Elektronqaimələr`,
    item: <EQayime />,
  },
  {
    id: 4,
    title: `Müştərilər`,
    label: `Müştərilər`,
    item: <Clients />,
  },
  {
    id: 5,
    title: `İstifadəçilər`,
    label: `İstifadəçilər`,
    item: <Inspectors />,
  },
  {
    id: 6,
    title: `Bank hesabına mədaxil`,
    label: `Bankhesabınamədaxil`,
    item: <Income />,
  },
  {
    id: 7,
    title: `Bank hesabından məxaric`,
    label: `Bankhesabındanməxaric`,
    item: <OutComings />,
  },
  {
    id: 8,
    title: `Müştəri balansı`,
    label: `Müştəribalansı`,
    item: <CustomerReports />,
  },
  {
    id: 9,
    title: `Bonusların hesablanması`,
    label: `Bonuslarınhesablanması`,
    item: <Bonuses />,
  },
  {
    id: 10,
    title: `Xidmət kataloqu`,
    label: `Xidmətkataloqu`,
    item: <ServicesCat />,
  },
  {
    id: 11,
    title: `Müəsisə kataloqu`,
    label: `Müəsisəkataloqu`,
    item: <Enterprises />,
  },
];

const [ANASƏHİFƏ] = allIngredients;
export const initialTabs = [ANASƏHİFƏ];

export function getNextIngredient(ingredients) {
  const existing = new Set(ingredients.map(ingredient => ingredient.label));
  return allIngredients.find(ingredient => !existing.has(ingredient.label));
}
