import './Layout.css';

const App = ({ children }) => {
  return (
    <div className="container">
      <header className="header">
        <h1>Phân Tích Dữ Liệu</h1>
        <nav className="nav">
          <ul>
            <li>Trang Chủ</li>
            <li>Giới Thiệu</li>
            <li>Liên Hệ</li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {children}
        {/* <section className="analysis">
          <h2>Phân Tích Chi Tiết</h2>
        </section> */}
      </main>
      <footer className="footer">
        <p>© 2024 Phân Tích Dữ Liệu</p>
      </footer>
    </div>
  );
};

export default App;