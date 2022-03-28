import { FC } from "react";
import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { MainFunctional } from "../Main/MainFunctional";
import { Footer } from "../Footer/Footer";
import { EditTableFunctional } from "../EditTable/EditTableFunctional";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <div className={styles.forFooterWrapper}>
          <Header />
          <Routes>
            <Route path="/" element={<MainFunctional />} />
            <Route path="edittable" element={<EditTableFunctional />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
