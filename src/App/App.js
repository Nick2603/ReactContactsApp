import styles from './App.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditTable from '../EditTable/EditTable';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <div className={styles.forFooterWrapper}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="edittable" element={<EditTable />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
