import { authOptions } from "@/app/api/auth/[...nextauth]/authoption";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Fragment } from "react";
const DashboardNav = async () => {
    const session = await getServerSession(authOptions);
    let paths;
    const role = session?.user?.role;
    if (role === "TEACHER") {
        paths = [
            { url: "/dashboard/attendance", name: "Attendance" },
            { url: "/dashboard/evaluation", name: "Evaluation" },
        ];
    } else if (role === "ADMIN") {
        paths = [{ url: "/dashboard/attendance", name: "Attendance" }];
    } else {
        paths = [{ url: "/dashboard/thesis", name: "Thesis" }];
    }
    return (
        <Fragment>
            <aside
                id="cta-button-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-cyan-700">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <hr />
                        {paths &&
                            paths.map((path, index) => {
                                return (
                                    <div key={index}>
                                        <li>
                                            <Link
                                                href={path.url}
                                                className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                                            >
                                                <span className="flex-1 ml-3 whitespace-nowrap">
                                                    {path.name}
                                                </span>
                                            </Link>
                                        </li>
                                        <hr />
                                    </div>
                                );
                            })}
                        <li>
                            <Link
                                href="/api/auth/signout"
                                className="flex items-center p-2 rounded-lg text-white  hover:bg-cyan-600 group"
                            >
                                <span className="ml-3">Logout</span>
                            </Link>
                        </li>
                        <hr />
                    </ul>
                </div>
            </aside>
            <div className="h-screen bg-gradient-to-r from-slate-300 to-slate-500 ">
                <header className="w-screen flex fixed justify-between items-center py-4 bg-neutral-400 	">
                    <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
                        <div className="text-4xl px-60 text-white">
                            Thesis Management System
                        </div>
                    </Link>
                </header>
            </div>
        </Fragment>
    );
};

export default DashboardNav;
