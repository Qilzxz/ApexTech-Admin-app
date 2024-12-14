import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContentPage from './components/Content';
import ContentOutputPage from './components/ContentOutput';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/product' element={<ProductPage />}></Route>
        <Route path='/content' element={<ContentPage />}></Route>
        <Route path='/contentOutput' element={<ContentOutputPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
