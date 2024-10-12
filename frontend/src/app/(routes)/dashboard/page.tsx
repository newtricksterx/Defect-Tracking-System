import IssueListComponent from "@/app/components/IssuesList";
import ProjectListComponent from "@/app/components/ProjectList";

function DashboardPage(){

    return (
        <main className="h-full grid gap-2 grid-cols-2 grid-rows-2 p-2 text-sm">
            <div className="border-black border-2 rounded shadow-md">
                Graphs
            </div>
            <div className="border-black border-2 rounded shadow-md">
                Sprint Progress
            </div >
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Projects
                </h2>
                <ProjectListComponent />
            </div>
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Assigned To Me
                </h2>
                <IssueListComponent />
            </div>
        </main>
    );

}

export default DashboardPage;