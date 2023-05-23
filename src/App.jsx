import RequestSection from "./components/RequestSection"
import ResponseSection from "./components/ResponseSection";

function App() {
  return (
    <div className="container mx-auto shadow-xl">
      <header className="pt-2 flex justify-between items-center">
        <h1 className="text-5xl font-extrabold tracking-widest text-orange-500">KOSTKAN</h1>
        <a href="" ><img className="block w-16" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" /></a>
      </header>
      <RequestSection />
      <ResponseSection />
    </div>
  )
}

export default App
