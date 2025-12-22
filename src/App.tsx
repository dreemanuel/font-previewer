import { AppLayout } from './components/layout'
import { useFontPreloader } from './hooks/useFontLoader'

function App() {
  // Preload fonts used in all variations
  useFontPreloader()

  return <AppLayout />
}

export default App
