import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import * as React from "react";
import { Link, Outlet } from "react-router-dom";

import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import { useNavigationOptions } from "../hooks/useNavigationOptions";
import { UserAvatar } from "./UserAvatar";

export function SidebarLayout() {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);

	return (
		<div>
			<DynamicSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<StaticSidebar />

			<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<main className="flex min-h-[calc(100vh-64px)] py-5 sm:min-h-screen sm:py-10 lg:pl-52">
				<div className="flex flex-grow flex-col px-4 sm:px-6 lg:px-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DynamicSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
	const navigationOptions = useNavigationOptions();

	return (
		<Transition.Root show={sidebarOpen} as={React.Fragment}>
			<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
				<Transition.Child
					as={React.Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-900/80" />
				</Transition.Child>

				<div className="fixed inset-0 flex">
					<Transition.Child
						as={React.Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full">
						<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
							<Transition.Child
								as={React.Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
									<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
										<span className="sr-only">Close sidebar</span>
										<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
								<div className="flex h-16 shrink-0 items-center">
									<FontAwesomeIcon
										className={classNames("h-8 w-8", navigationOptions.find((option) => option.current)?.colorWay.logo)}
										icon={faPeopleRoof}
									/>
								</div>
								<nav className="flex flex-1 flex-col">
									<ul role="list" className="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" className="-mx-2 space-y-1">
												{navigationOptions.map((navigationOption) => (
													<li key={navigationOption.href}>
														<Link
															to={navigationOption.href}
															className={classNames(
																navigationOption.colorWay.nav,
																navigationOption.current
																	? navigationOption.colorWay.activeNav
																	: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
																"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
															)}>
															<FontAwesomeIcon
																icon={navigationOption.icon}
																className={classNames(
																	navigationOption.colorWay.nav,
																	navigationOption.current ? navigationOption.colorWay.activeNav : "text-gray-400",
																	"h-6 w-6 shrink-0",
																)}
																aria-hidden="true"
															/>
															{navigationOption.name}
														</Link>
													</li>
												))}
											</ul>
										</li>
									</ul>
								</nav>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

function StaticSidebar() {
	const { data: me } = useMe();
	const navigationOptions = useNavigationOptions();

	return (
		<div className="xl:72 hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
			<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
				<div className="flex h-16 shrink-0 items-center">
					<FontAwesomeIcon className={classNames("h-8 w-8", navigationOptions.find((option) => option.current)?.colorWay.logo)} icon={faPeopleRoof} />
				</div>
				<nav className="flex flex-1 flex-col">
					<ul role="list" className="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" className="-mx-2 space-y-1">
								{navigationOptions.map((navigationOption) => (
									<li key={navigationOption.name}>
										<Link
											to={navigationOption.href}
											className={classNames(
												navigationOption.colorWay.nav,
												navigationOption.current ? navigationOption.colorWay.activeNav : "text-gray-700 hover:bg-gray-50",
												"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
											)}>
											<FontAwesomeIcon
												icon={navigationOption.icon}
												className={classNames(
													navigationOption.colorWay.nav,
													navigationOption.current ? navigationOption.colorWay.activeNav : "text-gray-400",
													"h-6 w-6 shrink-0",
												)}
												aria-hidden="true"
											/>
											{navigationOption.name}
										</Link>
									</li>
								))}
							</ul>
						</li>
						<li className="-mx-6 mt-auto">
							<div className="flex items-center gap-x-4 border-t px-6 py-3">
								<UserAvatar />
								<span>{me?.displayName}</span>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

function Header({ setSidebarOpen }: SidebarProps) {
	return (
		<div className="sticky top-0 z-40 flex h-16 items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
			<button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
				<span className="sr-only">Open sidebar</span>
				<Bars3Icon className="h-6 w-6" aria-hidden="true" />
			</button>
			<div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
			<div>
				<UserAvatar />
			</div>
		</div>
	);
}
