import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext'; // Sử dụng AuthProvider thay vì AuthProvide
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  // Sử dụng state để tạo hiệu ứng loading (giả sử Loading là một component hiển thị spinner hoặc tương tự)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
