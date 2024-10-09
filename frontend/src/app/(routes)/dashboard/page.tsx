function DashboardPage(){

    return (
        <main className="h-full w-full grid gap-2 grid-cols-2 grid-rows-2 m-2 p-2">
            <div className="border-black border-2">
                Graphs
            </div>
            <div className="border-black border-2">
                Activities
            </div >
            <div className="border-black border-2">
                Sprint Progress
            </div>
            <div className="border-black border-2">
                Assigned to me
                <table className="w-full border-black border-2">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                    </tr>
                    <tr>
                        <td>
                            Issue
                        </td>
                        <td>
                            This is a test issue. The purpose of this section is to explain what the issue is in detail
                        </td>
                        <td>
                            Urgent
                        </td>
                    </tr>
                </table>
            </div>
        </main>
    );

}

export default DashboardPage