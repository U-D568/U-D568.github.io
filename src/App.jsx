import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Demo from './pages/Demo';
import Layout from './pages/Layout';
import MarkDownRenderer from './components/MarkDownRenderer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/post' element={<MarkDownRenderer path="./posts/helloworld.md" />} />
                    <Route path="/demo" element={<Demo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;