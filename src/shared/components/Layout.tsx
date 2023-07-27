import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { classNames } from "../../shared/utils";

import { Dialog, Disclosure, Transition } from "@headlessui/react";

import { faBars, faChevronRight, faPeopleRoof, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UserAvatar, useMe } from "../../auth";
import { DarkModeContext } from "../DarkModeContext";
import { hasChildren, useColorWay, useNavigation } from "../hooks";

export function Layout() {
	const { isDarkMode } = React.useContext(DarkModeContext);

	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const location = useLocation();

	React.useLayoutEffect(() => {
		setSidebarOpen(false);
	}, [location.pathname]);

	return (
		<div className={classNames({ dark: isDarkMode })}>
			<div className="text-gray-900 dark:text-gray-50">
				<DynamicSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div className="xl:72 hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
					<SidebarNavigation showUserInfo />
				</div>

				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<main className="flex min-h-[calc(100vh-64px)] w-screen overflow-hidden py-5 dark:bg-zinc-800 sm:min-h-screen sm:py-10 lg:pl-52">
					<div className="flex flex-grow flex-col px-4 sm:px-6 lg:px-8">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DynamicSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
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
										<FontAwesomeIcon icon={faXmark} className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							<SidebarNavigation />
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

/*
<Link
										to={navigationOption.href}
										className={classNames(
											colorWay.nav,
											{
												[colorWay.activeNav]: navigationOption.current,
												"text-gray-700 dark:text-gray-50": !navigationOption.current,
											},
											"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
										)}>
										{navigationOption.name}
									</Link>
*/

function SidebarNavigation({ showUserInfo = false }: { showUserInfo?: boolean }) {
	const colorWay = useColorWay();
	const { data: me } = useMe();
	const navigation = useNavigation();
	// const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);

	return (
		<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-r-2 dark:border-gray-950 dark:bg-zinc-900">
			<div className="flex h-16 shrink-0 items-center">
				<FontAwesomeIcon className={classNames("h-8 w-8", colorWay.logo)} icon={faPeopleRoof} />
			</div>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" className="-mx-2 space-y-2">
							{navigation.map((item) => (
								<li key={`${item.name}-${item.current}`}>
									{hasChildren(item) ? (
										<Disclosure as="div" defaultOpen={item.current}>
											{({ open }) => (
												<>
													<Disclosure.Button
														className={classNames(colorWay.navigation.item, {
															[colorWay.navigation.openItem]: open || item.current,
														})}>
														<FontAwesomeIcon
															icon={faChevronRight}
															className={classNames(
																open || item.current ? "rotate-90 text-gray-500" : "text-gray-400",
																"h-3 w-3 shrink-0",
															)}
															aria-hidden="true"
														/>
														{item.name}
													</Disclosure.Button>
													{(open || item.current) && (
														<Disclosure.Panel static as="ul" className={classNames(colorWay.navigation.openItemBody)}>
															{item.children.map((subItem) => (
																<li key={subItem.name}>
																	<Disclosure.Button
																		as={Link}
																		to={subItem.href}
																		onClick={() => null}
																		className={classNames(colorWay.navigation.item, colorWay.navigation.childItem, {
																			[colorWay.navigation.activeChildItem]: subItem.current,
																		})}>
																		{subItem.name}
																	</Disclosure.Button>
																</li>
															))}
														</Disclosure.Panel>
													)}
												</>
											)}
										</Disclosure>
									) : (
										<Link
											to={item.href}
											className={classNames(colorWay.navigation.item, { [colorWay.navigation.activeRootItem]: item.current })}>
											{item.name}
										</Link>
									)}
								</li>
							))}
						</ul>
					</li>
					{showUserInfo && (
						<li className="-mx-6 mt-auto">
							<div className="flex items-center justify-between gap-x-4 border-t px-4 py-3 dark:border-t-2 dark:border-zinc-950">
								<div className="flex items-center gap-x-4 text-inherit">
									<UserAvatar />
									<span>{me?.givenName}</span>
								</div>
								{/* <Button shape="Circle" color={isDarkMode ? "yellow" : "slate"} variant="secondary" size="xs" onClick={toggleDarkMode}>
									<FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="h-5 w-5 text-inherit" />
								</Button> */}
							</div>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

function Header({ setSidebarOpen }: SidebarProps) {
	// const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);
	return (
		<div className="sticky top-0 z-40 flex h-16 items-center gap-x-6 bg-white px-4 py-4 text-gray-900 shadow-sm dark:bg-zinc-900 dark:text-gray-50 sm:px-6 lg:hidden">
			<button type="button" className="-m-2.5 p-2.5 lg:hidden" onClick={() => setSidebarOpen(true)}>
				<span className="sr-only">Open sidebar</span>
				<FontAwesomeIcon icon={faBars} className="h-5 w-5" aria-hidden="true" />
			</button>
			<div className="flex-1 text-sm font-semibold leading-6 ">Dashboard</div>
			<div className="flex items-center gap-x-4">
				<UserAvatar />
				{/* <Button shape="Circle" color={isDarkMode ? "yellow" : "slate"} variant="secondary" size="xs" onClick={toggleDarkMode}>
					<FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="h-5 w-5 text-inherit" />
				</Button> */}
			</div>
		</div>
	);
}
