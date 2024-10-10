import { ChevronFirst, MoreVertical } from "lucide-react";

export default function SideBar({ children } : {children: any}){
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img 
                        src="" 
                        alt="LOGO HERE"
                        className="w-32" 
                    />
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        <ChevronFirst/>
                    </button>
                </div>

                <ul className="flex-1 px-3">{children}</ul>

                <div className="border-t flex p-3">
                    <img 
                        src="" 
                        alt="" 
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={
                        `flex justify-between items-center w-52 ml-3`
                    }>
                        <div>
                            <h4 className=""></h4>
                            <span className="font-bold text-xs text-gray-600">
                                <a href="/login">Login</a>
                            </span>
                        </div>
                        
                        <MoreVertical size={20}/>

                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SideBarItem( {icon, text, active, alert} : {
    icon: any
    text: any
    active: any
    alert: any
}){
    return( 
        <li className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
              active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }
        `}>
            {icon}
            <span>{text}</span>
        </li>
    );
}

// add function that determines if footer of sidebar is a login link, user, or registration page