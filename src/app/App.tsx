import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReviewProvider } from './contexts/ReviewContext';

function App() {
  return (
    <ThemeProvider>
      <ReviewProvider>
        <RouterProvider router={router} />
      </ReviewProvider>
    </ThemeProvider>
  );
}

export default App;