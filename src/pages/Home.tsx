import CardUserItem from "../components/Card/CardUserItem";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useName from "../hooks/useName";

function Home() {
  const { nameFiltered } = useName();
  return (
    <div className="box-border relative w-full">
      <Navbar />
      <main className="w-full h-full">
        <div className="flex max-w-[90%] mx-auto min-h-screen box-border">
          <div className="w-[30%] border-r sticky top-0">
            <Sidebar />
          </div>
          <div className="w-[70%] p-7">
            <div className="flex flex-wrap justify-center gap-4">
              {nameFiltered.map((nameData) => (
                <CardUserItem
                  key={nameData.name}
                  gender={nameData.gender}
                  name={nameData.name}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
