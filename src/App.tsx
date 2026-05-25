import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './features/not-found/NotFound';

export default function App() {
  return (
    <div className="w-full h-screen bg-[#07070d] text-slate-100 overflow-hidden font-sans select-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}